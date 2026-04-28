"""
inference_engine.py — SmartAgent Add-on 核心推理引擎。

保护范围（受 Cython 编译为 .so 二进制，防止源码泄漏）：
  - build_system_prompt(): P0-P4 优先级体系、JSON Schema、区域隔离规则
  - build_user_prompt():   User Prompt 组装逻辑（各模块拼装顺序与格式）
  - _do_call():            LLM API 调用（Ollama / Anthropic / OpenAI 兼容）
  - _extract_json():       JSON 响应提取与容错
  - validate_decision():   决策结构验证

输入格式：InferenceBundle（version 1.0）
  - 由 custom_components/smart_agent/context_builder.py 生成
  - 包含所有 HA/DB 依赖数据（device_table、rules、habits、history 等）
  - 不依赖 Home Assistant API，可在独立 Docker 容器中运行

输出格式：决策字典
  {
    "scene": str,
    "confidence": int,
    "actions": [{"domain", "service", "entity_id", "params", "reason", "delay_seconds"}, ...],
    "reply": str,
    "speak": str,
  }
"""
from __future__ import annotations

import copy
import json
import logging
import re
from typing import Any

import aiohttp

_LOGGER = logging.getLogger("smartagent.inference_engine")

BUNDLE_VERSION = "1.0"

# Self-Rationalization Guard（W2）：与 HA 直推路径 inference.py 保持一致
# 当 AI 返回 confidence >= 60 但 actions=[] 时，触发对抗性重试。
# 例外：scene 字段明确说明"无需操作"的情况。
_NO_ACTION_OK_KWS: tuple[str, ...] = (
    "无需", "已是", "状态正常", "保持现状", "不需要", "正常", "维持",
    "灯已关", "设备已关", "所有设备已关",
)
_SELF_RATIO_GUARD_MIN_CONF: int = 60   # 触发防护的最低置信度

# ── Token Budget Guard 常量（ClaudeCode L1/L2/L3 内存分层）────────────────────
# 本地引擎（N305 CPU-only）Prompt 超长会导致推理变慢或上下文截断。
# System Prompt 实测：含 30 个设备的 device_table 约 6404 字符 ÷ 2 ≈ 3200 token。
# 使用 3500 作为保守上界（含更多设备时会更大），剩余窗口分配给 User Prompt。
# 触发条件：bundle["engine"] == "local"（Ollama 本地路径）。
_CHARS_PER_TOKEN: int = 2      # 中英混合保守估计（中文~1char/token，英文~3-4chars/token，平均取2）
_SYS_PROMPT_TOKENS: int = 3500  # System Prompt 开销（实测 ~3200，取 3500 为保守上界）
_OUTPUT_RESERVE_TOKENS: int = 1500  # 输出 JSON 预留（num_predict=1500）

# 模型名关键字 → 上下文窗口大小（token）映射表
# Ollama 模型名格式如 "qwen2.5:1.5b-instruct-q4_K_M" 或 "qwen2.5:7b"
_MODEL_CONTEXT_MAP: dict[str, int] = {
    "0.5b": 4096,
    "1.5b": 4096,
    "3b":   8192,
    "4b":   32768,
    "7b":   32768,
    "8b":   32768,
    "9b":   32768,   # Qwen3.5-9B 上下文窗口 32K
    "14b":  32768,
    "32b":  32768,
    "72b":  131072,
}
_DEFAULT_CONTEXT_WINDOW: int = 32768  # 未匹配时默认 32K（现代模型普遍支持）

# domain 白名单（与 _DECISION_JSON_SCHEMA 的 enum 保持同源，避免维护两份）
_VALID_DOMAINS: frozenset[str] = frozenset({
    "light", "switch", "climate", "cover", "fan",
    "script", "scene", "media_player", "vacuum",
    "input_boolean", "input_number",
})


def _estimate_budget_chars(bundle: dict[str, Any]) -> int:
    """根据 Ollama 模型名推断 User Prompt 可用字符预算。

    公式：(模型上下文窗口 - System Prompt 开销 - 输出预留) × chars_per_token
    保底不低于 2000 字符。

    注：1.5B/0.5B 模型上下文窗口仅 4096 token，System Prompt 已接近或超过窗口上限，
    计算结果为负数时由 max(2000) 兜底 —— 这类模型基本不可用于本项目，
    建议升级到 3B+ 或改用云端 API（engine="online"）。
    """
    model_name: str = bundle.get("ollama_model", "").lower()
    ctx_window = _DEFAULT_CONTEXT_WINDOW
    for key, window in _MODEL_CONTEXT_MAP.items():
        if key in model_name:
            ctx_window = window
            break

    user_budget_tokens = ctx_window - _SYS_PROMPT_TOKENS - _OUTPUT_RESERVE_TOKENS
    budget_chars = max(user_budget_tokens * _CHARS_PER_TOKEN, 2000)
    return budget_chars


# Ollama Structured Output JSON Schema（与 custom_components/smart_agent/schemas.py 保持一致）
_DECISION_JSON_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "scene": {"type": "string"},
        "confidence": {"type": "integer", "minimum": 0, "maximum": 100},
        "actions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "domain": {
                        "type": "string",
                        "enum": [
                            "light", "switch", "climate", "cover", "fan",
                            "script", "scene", "media_player", "vacuum",
                            "input_boolean", "input_number",
                        ],
                    },
                    "service": {"type": "string"},
                    "entity_id": {"type": "string"},
                    "params": {"type": "object", "additionalProperties": True},
                    "reason": {"type": "string"},
                    "delay_seconds": {"type": "number", "minimum": 0},
                },
                "required": ["domain", "service", "entity_id"],
            },
        },
        "reply": {"type": "string"},
        "speak": {"type": "string"},
    },
    "required": ["scene", "confidence", "actions"],
    "additionalProperties": False,
}


# ── System Prompt 构建（IP 核心）────────────────────────────────────────────────

def build_system_prompt(bundle: dict[str, Any]) -> str:
    """构建 System Prompt（Prefix Caching 优化版）。

    包含全部静态规则和 JSON Schema，目标 > 1024 token 使 KV Cache 生效。
    设备名称对照表（device_table）来自 bundle，为唯一动态成分。

    :param bundle: InferenceBundle 字典
    :return: 完整 System Prompt 字符串
    """
    is_showroom: bool = bundle.get("is_showroom", False)
    device_table: str = bundle.get("device_table", "")

    role = "展厅智能助手" if is_showroom else "智能家居私人管家"
    identity = (
        f"你是专业的{role}，基于 Home Assistant 平台运行。"
        f"你的任务是：根据传感器事件、实时设备状态和用户习惯，做出精准、安全的智能家居控制决策。\n"
        f"你的名字叫 SmartAgent，由开源社区开发。\n"
    )

    # ── 完整 JSON 输出格式 Schema ─────────────────────────────────────────────
    output_schema = """
【📋 输出格式（严格遵守，输出 ONLY 一个合法 JSON）】
{
  "scene":      "当前场景的简短中文描述（10-30字）",
  "confidence": 0~100（整数，不确定时填50以下，确定时填80以上）,
  "actions": [
    {
      "domain":         "light|switch|climate|cover|fan|script|scene|media_player|vacuum",
      "service":        "turn_on|turn_off|set_temperature|set_hvac_mode|open_cover|...",
      "entity_id":      "完整 HA entity_id，如 light.living_room_main",
      "params":         {"brightness_pct": 80, "temperature": 26},
      "reason":         "执行原因（中文，用于日志和用户通知）",
      "delay_seconds":  0
    }
  ],
  "reply":  "语音指令时的口语化回复，非语音场景填空字符串",
  "speak":  "TTS播报内容，不需要播报时填空字符串"
}

⚠️ 格式铁律：
1. 降低亮度必须用 light.turn_on + params:{brightness_pct:X}，严禁用 turn_off 来"调暗"灯光
2. domain 和 entity_id 必须精确匹配，不得捏造不存在的 entity_id
3. 无需任何操作时 actions 填 []，confidence 填实际判断的置信度
4. 不得在 JSON 外输出任何其他文字、注释、markdown 代码块
5. 调节灯光色温必须用 color_temp_kelvin（单位：K，如 6000），禁止使用 color_temp（mireds 单位已废弃）
   - 暖白光: color_temp_kelvin=2700, 中性白: color_temp_kelvin=4000, 冷白光: color_temp_kelvin=6000
   - 可同时指定亮度: {"brightness_pct": 80, "color_temp_kelvin": 4000}
"""

    # ── P0-P4 优先级体系 ──────────────────────────────────────────────────────
    priority_framework = """
【🎯 决策优先级体系（必须遵守，高优先级约束不可被低优先级覆盖）】

P0【安全红线 - 代码级强制执行，AI不可违反】
  - 有人在场时，严禁关闭：烟雾报警、燃气探测器、门锁、摄像头、安防设备
  - 严禁执行任何可能危及生命安全的操作
  - 严禁操作不在 device_info 中的设备（防止幻觉）

P1【铁律 - AI 必须遵守，即使用户规则或场景提示与此矛盾】
  - 有人传感器检测到"有人"时，严禁关闭该区域灯光
  - 深夜(0-6时)有人活动，灯光调至 20% 以下（防止刺眼），不可主动开强光
  - 用户刚手动操作某设备，5分钟内禁止 AI 反向操作（尊重用户意志）；5-15分钟内建议保持；超过15分钟可根据场景判断
  - 【区域隔离 AI-03】触发传感器所在区域 ≠ 设备所在区域时，禁止跨区操作
    - 例外：全局命令（"关所有灯"）、温度类设备（空调可全局联动）

P2【学习画像 - 用户历史习惯数据，优先参考】
  - 行为模式数据库中有 ≥55% 置信度的历史数据时，遵循用户习惯
  - 用户修正记录（Override）：AI 被用户推翻过的决策，下次必须避免重犯
  - 近期手动操作的设备，20分钟内不要反向操作

P3【普通规则与画像 - 用户自定义偏好，AI 参考执行】
  - 用户在配置界面设置的规则（非锁定）和行为画像
  - 时段适用性：规则带有时间条件时，只在对应时段生效

P4【AI 推理 - 上述都没有约束时，AI 用智能判断】
  - 根据场景、时间、季节、历史模式做合理推断
  - 不确定时宁可不动（confidence < 60），提示用户而非贸然操作
"""

    # ── 区域隔离规则 ──────────────────────────────────────────────────────────
    isolation_rules = """
【🚫 区域隔离规则（AI-03）】
- 传感器触发事件中会包含触发区域，例如：[客厅] 存在传感器: off→on
- 原则：只操作触发区域内的设备。不得因为"顺便"而操作其他区域
- 例外情况（允许跨区操作）：
  ① 用户明确的语音/文字全局指令（"关所有灯"/"睡眠模式"）
  ② 空调/新风：温度联动可跨区（厨房温度高 → 客厅空调辅助）
  ③ 安防设备：门锁/摄像头是全局设备，不受区域限制
  ④ 场景脚本：HA 场景本身会定义多区域操作，执行时视为全局
  ⑤ 用户规则中明确描述跨区联动（如"展厅有人时开启客厅灯带"）
- 违反此规则的后果：造成用户惊吓（在别的房间莫名其妙开了灯）

【🔗 跨区联动动作标记（is_global 字段）】
- 当用户规则明确描述 A 区域状态触发 B 区域设备时，属于合法跨区联动
- 此类 action 必须在 JSON 中添加 "is_global": true 字段，系统才会放行
- 示例规则："展厅有人时开启客厅灯带，无人时关闭"
  正确 action 格式：
  {
    "domain": "light", "service": "turn_on",
    "entity_id": "light.ke_ting_bei_jing_1",
    "is_global": true,
    "reason": "展厅有人，根据联动规则开启客厅背景灯带"
  }
- 未添加 is_global 的跨区动作将被系统安全层拦截
"""

    # ── 展厅模式附加规则（仅展厅模式注入）──────────────────────────────────
    showroom_extra = ""
    if is_showroom:
        showroom_extra = """
【🏪 展厅模式附加规则（仅在展厅模式下生效）】
- 展厅的核心目的是向访客展示智能家居的能力，优先保持视觉效果
- 灯光分三层（User Prompt 中会说明哪些灯属于哪层）：
  ① 核心层(Core)：绝对不能关，即使无人也要亮着；有人时亮度不得低于 30%
  ② 展示层(Display)：无人时调暗至 10%（节能待机）；有人时恢复 90%；禁止彻底关闭
  ③ 辅助层(Auxiliary)：无人时可完全关闭；有人时按需开启
- 营业时间内有人：积极展示，turn_on 默认 90% 亮度
- 营业时间内无人：Core 维持最低 30%，Display 降至 10%，Auxiliary 可关
- 非营业时间有人（员工加班/顺路取物等）：
  ⚠️ 仅开启必要照明（走廊灯、主要功能灯）。
  禁止主动开启展示灯、装饰灯、Logo灯等非功能性灯光。
  严格参考【只读设备】区域中被标记的设备，禁止主动开灯。
  若用户通过语音/操作员指令要求开灯，才可执行。
- 非营业时间无人：完全释放，AI 可节能关闭所有灯光

【🏢 区域独立决策原则（重要！）】
- 以上展厅分层/营业时间规则 **仅适用于展厅区域内的设备**
- 办公室、客厅、卧室等非展厅区域的决策 **完全独立于展厅营业时间**
- 非展厅区域的核心原则：传感器确认有人在场 → 按正常有人策略执行（开灯）
- 禁止因为"展厅非营业时间"而降低其他区域有人时的开灯置信度
- 每个房间的 AI 决策应仅基于该房间自身的占用状态和用户偏好
"""

    # ── 行为准则 ──────────────────────────────────────────────────────────────
    behavior_rules = """
【⚖️ 行为准则】
1. 推理透明：reason 字段必须清晰说明为什么执行此动作
2. 安全第一：有疑问时选择不动作（confidence < 55 则 actions 填 []）
3. 节能意识：无人区域默认倾向关闭不必要设备
4. 尊重用户：用户刚操作过的设备视为"用户意图"，短期内不要反向
5. 防止幻觉：entity_id 必须来自 System Prompt 中的【合法设备清单】，不得自行捏造或拼接
6. 不重复执行：若设备已经处于目标状态（灯已开且亮度匹配），跳过该动作
7. 置信度诚实：使用场景清晰则填 80-95，有歧义则填 50-70，完全不确定填 <50

【🔒 设备管辖模式（重要，请严格遵守）】
User Prompt 的设备列表中，部分设备标注了管辖模式标签：
- [HA优先⚠️]：该设备由 Home Assistant 自动化管控，**AI 不得输出控制该设备的动作**
  * 即使用户指令涉及该设备，也应使用其他可控设备实现等效效果，或在 reason 中说明
  * 可以在场景（scene/script）层面间接影响它（场景自带的 entity 由 HA 统一执行）
- [AI全权]：该设备由 AI 完全管控，可以直接控制
- 无标签（默认）：共享模式，AI 可直接控制，系统会自动尝试路由到关联场景/脚本

【🎬 HA 场景/脚本优先调用原则（重要）】
当 User Prompt 中【可用脚本】或【可用场景】列表里存在与当前情境匹配的场景时：
1. 优先调用该场景/脚本（domain=scene 或 script, service=turn_on）而非逐个控制设备
2. 一个场景动作等于多设备协同（灯光+窗帘+空调），比逐个控制更精准、更符合用户预期
3. 场景匹配优先级（从高到低）：
   ① 名称含触发房间名的场景（如 scene.cha_shi_hui_ke → 适用"茶室"触发）
   ② 名称含当前时段关键词的场景（如 scene.ye_jian_xiu_xi → 适用深夜触发）
   ③ 名称含动作意图关键词的场景（如 script.kai_hui_mo_shi → 适用"会议"指令）
4. 若无适合场景/脚本 → 再逐个控制设备
⚠️ 调用场景时仍须遵守 P0/P1 安全规则；置信度按场景匹配程度填写（高匹配 85+，模糊匹配 70+）
"""

    # ── 家庭模式设备联动指南（仅家庭模式注入）──────────────────────────────
    home_device_guide = ""
    if not is_showroom:
        home_device_guide = """
【🏠 家庭模式设备联动指南（家庭专用，展厅模式不适用）】

▶ 窗帘（cover 实体）
  服务：open_cover（全开）/ close_cover（全关）/ set_cover_position（设位置，position=0-100）
  联动时机：
  - 早晨（6-9时）有人：先 set_cover_position=30（缓和唤醒），3分钟后可全开
  - 强光下午（12-16时，西向房间）：set_cover_position=50 遮阳
  - 傍晚日落后：close_cover，保护隐私
  - 影院模式（media_player 进入 playing 状态）：close_cover + 灯光调至20%暖光
  - 离家/长时间无人：close_cover（隐私+节能）
  ⚠️ 不得在用户睡眠中打开窗帘（卧室有人且深夜0-6时）

▶ 空调（climate 实体）
  服务：climate.set_hvac_mode + climate.set_temperature（通常需两个动作）
  常用参数：{"hvac_mode": "cool", "temperature": 26} 或 {"hvac_mode": "heat", "temperature": 22}
  hvac_mode 取值：cool（制冷）/ heat（制热）/ fan_only（送风）/ dry（除湿）/ off（关机）
  建议温度：夏季制冷 26°C；冬季制热 22°C；睡眠模式夏季 27°C/冬季 20°C
  - 有人且温度不舒适时开启（夏>28°C 或 冬<18°C 为触发阈值，User Prompt 中有当前温度）
  - 无人超过 30 分钟：调至节能模式（28°C/25°C）或 fan_only
  - 厨房温度高时可联动客厅/餐厅空调辅助（此为跨区联动，需加 is_global=true）

▶ 地暖（floor_heat，通常为 switch 或 climate 实体）
  - 冬季早晨（6-8时）或傍晚（17-20时）有人：turn_on
  - 地暖升温慢（约30分钟），建议在有人前 15 分钟提前开启
  - 深夜0-5时 / 离家状态：turn_off 节能

▶ 电视/媒体播放器（media_player 实体）
  - 电视/媒体进入 playing 状态 → 灯光调至影院模式（20%亮度+2700K）+ 关窗帘
  - 电视暂停/停止 → 灯光恢复（60-80%亮度+4000K）
  - 不得在用户观影时主动增亮或开强光

▶ 人数情境感知（Frigate / HA person 实体）
  - 1人（仅主人）→ 个人偏好模式：安静、低亮度、暖色调，参考用户习惯基线
  - 2人以上（有访客）→ 社交/会客模式：亮度+10-20%，色温中性（4000K）
  - 家庭成员全部不在家（person 全部 not_home）→ 视为离家，执行节能/安防联动
"""

    # ── 房间场景照明情景参考 ──────────────────────────────────────────────────
    lighting_context_hint = """
【💡 房间场景照明参考（建议，AI 可结合实际情况调整）】
| 场景       | 建议亮度 | 建议色温  | 说明                     |
|------------|----------|-----------|--------------------------|
| 茶室/茶区  | 60%      | 3000K 暖白 | 温馨放松，促进交流        |
| 餐厅       | 70%      | 3000K 暖白 | 促进食欲，温馨就餐        |
| 卧室       | 40%      | 2700K 极暖 | 助眠，避免刺激            |
| 书房/学习  | 100%     | 6000K 冷白 | 提升专注力                |
| 办公       | 100%     | 5500K 中冷 | 高效工作                  |
| 客厅（日常）| 80%     | 4000K 中性 | 日常活动舒适              |
| 客厅（影院）| 20%     | 2700K 极暖 | 营造观影氛围              |
| 厨房       | 100%     | 5000K 中冷 | 操作安全明亮              |
| 卫浴       | 80%      | 4500K 中性 | 梳妆/清洁适用             |
| 玄关       | 80%      | 4000K 中性 | 欢迎归家                  |
| 走廊       | 70%      | 4000K 中性 | 通道导引                  |

⚙️ 调光格式：{"brightness_pct": 60, "color_temp_kelvin": 3000}
⚙️ 色温范围：2700K(极暖橙)~3000K(暖白)~4000K(中性白)~5000K(冷白)~6500K(冷光)
"""

    return (
        identity
        + output_schema
        + priority_framework
        + isolation_rules
        + showroom_extra
        + home_device_guide
        + behavior_rules
        + lighting_context_hint
        + device_table
    )


# ── User Prompt 组装（IP 核心）──────────────────────────────────────────────────

def build_user_prompt(bundle: dict[str, Any], *, force_no_budget: bool = False) -> str:
    """从 InferenceBundle 组装 User Prompt（动态实时上下文）。

    :param bundle: InferenceBundle 字典
    :param force_no_budget: 为 True 时跳过 Token Budget Guard（用于云端降级场景）
    :return: 完整 User Prompt 字符串
    """
    trigger: str = bundle.get("trigger", "")
    trigger_room: str = bundle.get("trigger_room", "")
    # one_off_prompt 已由 ContextBuilder 编入 scene_desc，此处不再单独使用
    is_voice: bool = bundle.get("is_voice", False)
    is_showroom: bool = bundle.get("is_showroom", False)
    time_str: str = bundle.get("time_str", "")
    day_str: str = bundle.get("day_str", "")
    scene_desc: str = bundle.get("scene_desc", "")

    # 区域隔离提示
    region_hint = (
        f"⚠️ 本次触发区域：「{trigger_room}」，请优先操作该区域设备。\n"
        if trigger_room else ""
    )

    # ── P1 铁律（锁定规则 + 习惯 + 优先级保护）───────────────────────────────
    p1_parts: list[str] = []
    if bundle.get("locked_rules"):
        p1_parts.append(f"锁定规则：\n{bundle['locked_rules']}")
    if bundle.get("locked_habits"):
        p1_parts.append(f"锁定画像：\n{bundle['locked_habits']}")
    if bundle.get("priority_section"):
        p1_parts.append(bundle["priority_section"])
    p1_section = (
        "\n【⚠️ 用户锁定铁律（P1 配置）】\n" + "\n".join(p1_parts)
        if p1_parts else ""
    )

    # ── P2 行为学习 ────────────────────────────────────────────────────────────
    # Phase 2 v2 注入策略：
    #   - memory_narrative（MemoryStore.get_room_context）优先：含叙事 + 基线 + presence修正三合一
    #   - baseline_hint 由 context_builder 在 memory_narrative 非空时已置空（不重复注入）
    #   - corrections_text 已由 context_builder 通过 _get_room_corrections() 单独获取，
    #     但 memory_narrative 已含 presence 修正，故 corrections_text 仅作旧版 Add-on 兼容保留
    p2_parts: list[str] = []
    if bundle.get("manual_actions_text"):
        p2_parts.append(bundle["manual_actions_text"])
    if bundle.get("realtime_habits"):
        p2_parts.append(f"实时习惯：\n{bundle['realtime_habits']}")
    if bundle.get("recent_overrides"):
        p2_parts.append(bundle["recent_overrides"])
    # Phase 2 v2: memory_narrative 优先注入（内含基线 + presence 修正）
    # baseline_hint 已在 context_builder 中被置空（当 memory_narrative 非空时），无重复风险
    if bundle.get("memory_narrative"):
        p2_parts.append(bundle["memory_narrative"])
    elif bundle.get("baseline_hint"):
        # MemoryStore 不可用时的回退：单独注入 baseline_hint
        p2_parts.append(bundle["baseline_hint"])
    # corrections_text 回退：仅当 memory_narrative 和 corrections_text 都有内容时跳过（避免重叠）
    # 当 memory_narrative 为空时（MemoryStore 失败），注入 corrections_text
    if not bundle.get("memory_narrative") and bundle.get("corrections_text"):
        p2_parts.append(bundle["corrections_text"])
    if bundle.get("reflexion_antipatterns"):
        p2_parts.append(bundle["reflexion_antipatterns"])
    if bundle.get("ai_scenes_hint"):
        p2_parts.append(bundle["ai_scenes_hint"])

    if is_showroom:
        tiered = bundle.get("showroom_tiered_prompt", "")
        p2_section = tiered + (
            "\n【P2 行为学习】\n" + "\n".join(p2_parts) if p2_parts else ""
        )
    else:
        p2_section = (
            "\n【P2 行为学习】\n" + "\n".join(p2_parts) if p2_parts else ""
        )

    # ── P3 普通规则与画像 ──────────────────────────────────────────────────────
    p3_parts: list[str] = []
    if bundle.get("normal_rules"):
        p3_parts.append(f"普通规则：\n{bundle['normal_rules']}")
    if bundle.get("normal_habits"):
        p3_parts.append(f"普通画像：\n{bundle['normal_habits']}")
    p3_section = (
        "\n【P3 画像与规则】\n" + "\n".join(p3_parts) if p3_parts else ""
    )

    # ── 展厅/家庭模式提示 ──────────────────────────────────────────────────────
    if is_showroom:
        if "[展厅] 自定义场景:" in trigger:
            _cmd_text = trigger.split("[展厅] 自定义场景:")[-1].strip()
            _is_global_off = (
                any(kw in _cmd_text for kw in ("所有灯", "全部灯", "所有的灯", "全部的灯"))
                and any(kw in _cmd_text for kw in ("关", "关闭", "熄"))
            )
            _global_off_hint = (
                "\n🔴【全局关灯指令】必须枚举并关闭所有灯光设备（light domain），包括：\n"
                "  - 最近几分钟内刚被打开的灯（不受30分钟不反向规则限制）\n"
                "  - 展厅/办公室/餐厅/客厅等所有区域的灯\n"
                "  - P1《不反向操作》规则对本指令无效，必须覆盖所有 light 实体\n"
            ) if _is_global_off else ""
            mode_hint = (
                f"【⚡ 操作员直接指令 — 最高优先级】\n"
                f"指令内容：「{_cmd_text}」\n"
                "⚠️ 此指令优先级高于 P1-P4 所有规则，包括用户设置的锁定规则（如《无人关灯》《营业时间规则》等）。\n"
                "请立即执行该指令，confidence 填 90 以上。\n"
                "不得以《无人在场》《规则冲突》为由返回空 actions 或低置信度。\n"
                f"唯一不可违反的是 P0 安全红线（烟雾报警、燃气探测器、门锁等）。{_global_off_hint}"
            )
        else:
            biz_start = bundle.get("showroom_biz_start", 540)
            biz_end = bundle.get("showroom_biz_end", 1200)
            biz_start_str = f"{biz_start // 60:02d}:{biz_start % 60:02d}"
            biz_end_str = f"{biz_end // 60:02d}:{biz_end % 60:02d}"
            mode_hint = (
                f"【展厅演示】营业时间({biz_start_str}-{biz_end_str})积极展示。"
                "无人且非营业时节能。"
            )
    else:
        mode_hint = region_hint

    # ── 语音指令提示 ──────────────────────────────────────────────────────────
    voice_hint = (
        "\n⚡【语音指令 — 用户直接命令】请立即执行，reply 字段作为语音回答。"
        "此指令优先级高于 P1-P4 所有规则（包括锁定规则），不得以规则冲突或无人在场为由拒绝执行。\n"
    ) if is_voice else ""

    history_raw: str = bundle.get("history", "")
    user_prompt = (
        f"当前时间：{time_str} ({day_str})。场景：{scene_desc}\n"
        f"触发事件：{trigger}\n"
        f"{voice_hint}"
        f"{mode_hint}\n"
        f"{bundle.get('tool_results', '')}"
        f"{bundle.get('occupancy_section', '')}"
        f"{bundle.get('vision_context', '')}"
        f"【环境状态】\n{bundle.get('context_text', '')}\n"
        f"【历史记录】\n{history_raw}"
        f"{p1_section}{p2_section}{p3_section}\n"
    )

    # ── Token Budget Guard（ClaudeCode L1/L2/L3 内存分层）──────────────────────
    # 本地引擎超预算时按 L3→L2→L1 优先级裁剪；云端引擎不限制。
    if bundle.get("engine") == "local" and not force_no_budget:
        _budget = _estimate_budget_chars(bundle)
        user_prompt = _apply_token_budget(
            user_prompt,
            p3_section=p3_section,
            p2_section=p2_section,
            history=history_raw,
            budget_chars=_budget,
        )

    _LOGGER.debug(
        "[InferenceEngine] user_prompt 组装完成 | %d 字符 ≈ %d token | engine=%s",
        len(user_prompt), len(user_prompt) // _CHARS_PER_TOKEN, bundle.get("engine", "online"),
    )
    return user_prompt


def _apply_token_budget(
    prompt: str,
    *,
    p3_section: str,
    p2_section: str,
    history: str,
    budget_chars: int,
) -> str:
    """本地模型 Token 预算守卫（L3→L2→L1 优先级裁剪）。

    裁剪顺序（参考 ClaudeCode L1/L2/L3 内存分层）：
      L3 首裁：P3（普通规则+画像）—— 最低优先级，无关键安全信息
      L2 次裁：历史记录（压缩至 12 行）—— 历史事件对即时决策帮助有限
      L2 末裁：P2（行为学习）—— 丢失后退化为 P4 AI 推理，仍可用
      L1 不裁：context_text（设备状态）+ p1_section（铁律）—— 核心安全层

    :param prompt: 已组装的完整 user_prompt
    :param p3_section: P3 节原始字符串（用于精确替换）
    :param p2_section: P2 节原始字符串（用于精确替换）
    :param history: 历史记录原始字符串（用于精确替换）
    :param budget_chars: 字符数预算（= token 预算 × chars_per_token）
    :return: 裁剪后的 prompt（若无需裁剪则原样返回）
    """
    if len(prompt) <= budget_chars:
        return prompt

    omitted: list[str] = []

    # Step 1: L3 裁剪 — P3（普通规则+画像）
    if p3_section:
        prompt = prompt.replace(p3_section, "", 1)
        omitted.append("P3(普通规则+画像)")

    if len(prompt) <= budget_chars:
        _LOGGER.info(
            "[TokenBudget] 裁剪 %s 后在预算内 | %d chars ≈ %d token",
            "+".join(omitted), len(prompt), len(prompt) // _CHARS_PER_TOKEN,
        )
        return prompt

    # Step 2: L2 裁剪 — 历史记录压缩至 12 行
    if history:
        _lines = history.split("\n")
        if len(_lines) > 12:
            _short = "\n".join(_lines[:12]) + "\n…（较早历史已省略，节省 Token）"
            prompt = prompt.replace(history, _short, 1)
            omitted.append("历史(截断至12行)")

    if len(prompt) <= budget_chars:
        _LOGGER.info(
            "[TokenBudget] 裁剪 %s 后在预算内 | %d chars ≈ %d token",
            "+".join(omitted), len(prompt), len(prompt) // _CHARS_PER_TOKEN,
        )
        return prompt

    # Step 3: L2 裁剪 — P2（行为学习，含 memory_narrative + 实时习惯）
    if p2_section:
        prompt = prompt.replace(p2_section, "", 1)
        omitted.append("P2(行为学习)")

    if len(prompt) <= budget_chars:
        _LOGGER.warning(
            "[TokenBudget] 裁剪 %s 后在预算内 | %d chars ≈ %d token（已丢失行为学习数据，决策质量可能下降）",
            "+".join(omitted), len(prompt), len(prompt) // _CHARS_PER_TOKEN,
        )
    else:
        _LOGGER.error(
            "[TokenBudget] L1 核心内容自身超预算！| 已裁剪: %s | 最终 %d chars ≈ %d token | 预算 %d token"
            " | 建议：减少设备数量或升级本地模型",
            "+".join(omitted),
            len(prompt),
            len(prompt) // _CHARS_PER_TOKEN,
            budget_chars // _CHARS_PER_TOKEN,
        )
    return prompt


# ── LLM 调用（IP 核心）──────────────────────────────────────────────────────────

async def infer(bundle: dict[str, Any]) -> dict[str, Any] | None:
    """执行完整 AI 推理流程：Prompt 构建 → LLM 调用 → 响应解析。

    :param bundle: InferenceBundle 字典（来自 ContextBuilder.build()）
    :return: 解析后的决策字典，失败时返回 None
    """
    # 版本兼容性检查
    bundle_ver = bundle.get("_bundle_version", "")
    if bundle_ver and bundle_ver != BUNDLE_VERSION:
        _LOGGER.warning(
            "[InferenceEngine] Bundle 版本不匹配: 期望 %s 实际 %s，尝试继续",
            BUNDLE_VERSION, bundle_ver,
        )

    sys_prompt = build_system_prompt(bundle)
    user_prompt = build_user_prompt(bundle)
    engine = bundle.get("engine", "online")

    _LOGGER.info(
        "[InferenceEngine] 推理开始 | engine=%s | trigger=%s",
        engine, bundle.get("trigger", "")[:60],
    )

    result = await _do_call(bundle, sys_prompt, user_prompt, engine)

    # 云端降级：本地引擎失败且已配置在线 API 时自动降级
    # 云端模型上下文窗口远大于本地，需要使用未裁剪的完整 Prompt
    _cloud_fallback_used = False
    full_user_prompt: str | None = None
    if (
        result is None
        and engine == "local"
        and bundle.get("cloud_fallback")
        and bundle.get("online_api_key")
    ):
        _LOGGER.warning("[InferenceEngine] 本地引擎无响应，尝试云端降级...")
        full_user_prompt = build_user_prompt(bundle, force_no_budget=True)
        result = await _do_call(bundle, sys_prompt, full_user_prompt, "online")
        if result:
            _LOGGER.info("[InferenceEngine] 云端降级成功（完整 Prompt）")
            _cloud_fallback_used = True

    if result:
        _conf = result.get("confidence", 0)
        _acts = len(result.get("actions", []))
        _LOGGER.info("[InferenceEngine] 推理完成 | confidence=%d | actions=%d", _conf, _acts)

        # W2: Self-Rationalization Guard（自我合理化防护）
        # 与 HA 直推路径 inference.py Phase 11.6 保持功能对齐。
        # 检测 AI 以"高置信度"掩盖"空动作"的自我合理化行为。
        # 触发条件：confidence >= 60 且 actions=[] 且 scene 未明确说明无需操作。
        # is_voice=True 时跳过：语音命令（查天气/播音乐等）本可无动作，不应被挑战。
        # 与 inference.py 本地路径的 `not is_voice` 判断保持行为一致。
        _is_voice = bundle.get("is_voice", False)
        if _conf >= _SELF_RATIO_GUARD_MIN_CONF and _acts == 0 and not _is_voice:
            _scene_str = (result.get("scene") or "").lower()
            if not any(kw in _scene_str for kw in _NO_ACTION_OK_KWS):
                _LOGGER.warning(
                    "[自我合理化防护] confidence=%d 但 actions=[]，场景='%s'，触发对抗性重试...",
                    _conf, result.get("scene") or "",
                )
                _challenge = (
                    f"\n\n[⚠️ 系统审查 — 对抗性验证]\n"
                    f"你上一次的输出：confidence={_conf}, actions=[], scene=\"{result.get('scene') or ''}\"\n"
                    f"但系统检测到当前环境可能需要操作（如：无人区域灯光仍开启、设备状态与场景不匹配等）。\n"
                    f"请重新审视你的判断：\n"
                    f"1. 如果确实无需操作，请在 scene 字段写明具体原因（如'客厅无人且灯已关闭'）\n"
                    f"2. 如果存在应该关灯/调暗/关闭的设备，请在 actions 中列出具体动作\n"
                    f"3. 不要因为修正历史中有'不要关灯'的记录就放弃关灯——请核查该修正是否在当前场景下适用"
                )
                # 对抗重试：云端降级时用完整 Prompt，否则用原始 Prompt
                _retry_engine = "online" if _cloud_fallback_used else engine
                _retry_prompt = (full_user_prompt or user_prompt) + _challenge
                _retry = await _do_call(bundle, sys_prompt, _retry_prompt, _retry_engine)
                if _retry and _retry.get("actions"):
                    _LOGGER.info(
                        "[自我合理化防护] 对抗重试后给出 %d 个动作，采用重试结果",
                        len(_retry["actions"]),
                    )
                    result = _retry
                else:
                    _LOGGER.info(
                        "[自我合理化防护] 对抗重试仍无动作，保留原结果（AI 确认无需操作）"
                    )

    return result


async def _do_call(
    bundle: dict[str, Any],
    sys_prompt: str,
    user_prompt: str,
    engine: str,
) -> dict[str, Any] | None:
    """调用 LLM API 并解析响应。

    :param bundle: InferenceBundle（含 LLM 配置）
    :param sys_prompt: System Prompt 文本
    :param user_prompt: User Prompt 文本
    :param engine: 'local'（Ollama）或 'online'（OpenAI/Anthropic 兼容）
    :return: 解析后的决策字典，失败时返回 None
    """
    try:
        async with aiohttp.ClientSession() as session:
            if engine == "local":
                payload = {
                    "model": bundle.get("ollama_model", ""),
                    "think": False,
                    "stream": False,
                    "format": _DECISION_JSON_SCHEMA,
                    "options": {"num_predict": 1500, "temperature": 0.1},
                    "messages": [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_prompt},
                    ],
                }
                ollama_url = bundle.get("ollama_url", "http://localhost:11434")
                async with session.post(
                    f"{ollama_url}/api/chat",
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=60),
                ) as resp:
                    res = await resp.json()
                    raw = res.get("message", {}).get("content", "")

            else:
                api_key = bundle.get("online_api_key", "")
                if not api_key:
                    _LOGGER.error("[InferenceEngine] 云端引擎未配置 API Key")
                    return None

                headers = {"Authorization": f"Bearer {api_key}"}
                base_url = bundle.get("online_base_url", "")
                _is_anthropic = "api.anthropic.com" in base_url

                if _is_anthropic:
                    headers["anthropic-beta"] = "prompt-caching-2024-07-31"
                    headers["anthropic-version"] = "2023-06-01"
                    payload = {
                        "model": bundle.get("online_model", ""),
                        "max_tokens": 1500,
                        "system": [
                            {
                                "type": "text",
                                "text": sys_prompt,
                                "cache_control": {"type": "ephemeral"},
                            }
                        ],
                        "messages": [{"role": "user", "content": user_prompt}],
                    }
                    api_url = f"{base_url}/messages"
                else:
                    # OpenAI 兼容（DeepSeek / 通义千问 / MiniMax 等）
                    payload = {
                        "model": bundle.get("online_model", ""),
                        "messages": [
                            {"role": "system", "content": sys_prompt},
                            {"role": "user", "content": user_prompt},
                        ],
                        "response_format": {"type": "json_object"},
                    }
                    api_url = f"{base_url}/chat/completions"

                async with session.post(
                    api_url,
                    json=payload,
                    headers=headers,
                    timeout=aiohttp.ClientTimeout(total=60),
                ) as resp:
                    if resp.status >= 400:
                        err_body = ""
                        try:
                            err_body = await resp.text()
                        except Exception:
                            pass
                        _LOGGER.error(
                            "[InferenceEngine] API HTTP %d | %s",
                            resp.status, err_body[:200],
                        )
                        return None

                    res = await resp.json()
                    if res.get("error"):
                        err = res["error"]
                        _LOGGER.error(
                            "[InferenceEngine] API 错误: [%s] %s",
                            err.get("type", "unknown"),
                            err.get("message", str(err)),
                        )
                        return None

                    if _is_anthropic:
                        raw = (res.get("content") or [{}])[0].get("text", "")
                    else:
                        raw = (
                            res.get("choices", [{}])[0]
                            .get("message", {})
                            .get("content", "")
                        )

        # 解析响应
        raw_clean = re.sub(r"<think>.*?</think>", "", raw, flags=re.DOTALL).strip()
        try:
            parsed = json.loads(raw_clean)
        except (json.JSONDecodeError, ValueError):
            parsed = _extract_json(raw_clean) or _extract_json(raw)

        return validate_decision(parsed)

    except Exception as exc:
        _LOGGER.error("[InferenceEngine] %s 调用失败: %s", engine, exc)
        return None


# ── 响应解析与验证 ────────────────────────────────────────────────────────────

def _extract_json(text: str) -> dict[str, Any] | None:
    """从文本中提取第一个完整的 JSON 对象。

    处理两种常见格式：
      1. Markdown 代码围栏（```json\\n{...}\\n```）——部分云端模型默认带围栏
      2. 裸 JSON（直接 {…}）—— Ollama structured output 和标准 OpenAI

    :param text: 可能包含 JSON 的文本
    :return: 解析后的字典，提取失败时返回 None
    """
    if not text:
        return None
    # 先尝试剥离 Markdown 围栏（```json ... ``` 或 ``` ... ```）
    _fence = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if _fence:
        try:
            return json.loads(_fence.group(1))
        except json.JSONDecodeError:
            pass
    # 按括号范围兜底：找第一个 { 和最后一个 }
    start, end = text.find("{"), text.rfind("}")
    if start != -1 and end != -1 and end > start:
        try:
            return json.loads(text[start: end + 1])
        except json.JSONDecodeError:
            pass
    return None


def validate_decision(raw: dict[str, Any] | None) -> dict[str, Any] | None:
    """验证并修正 LLM 返回的决策 JSON。

    执行：必填字段存在性、confidence 范围、actions 格式、domain 白名单检查。

    :param raw: LLM 返回的原始解析字典
    :return: 验证通过的字典，严重格式错误时返回 None
    """
    if not isinstance(raw, dict):
        return None

    raw = copy.deepcopy(raw)
    raw.setdefault("scene", "AI推理")

    try:
        conf = int(raw.get("confidence", 0))
        raw["confidence"] = max(0, min(100, conf))
    except (TypeError, ValueError):
        raw["confidence"] = 0

    if not isinstance(raw.get("actions"), list):
        raw["actions"] = []

    cleaned: list[dict] = []
    for action in raw["actions"]:
        if not isinstance(action, dict):
            continue
        if not action.get("domain") or not action.get("service") or not action.get("entity_id"):
            continue
        if action["domain"] not in _VALID_DOMAINS:
            _LOGGER.warning("[InferenceEngine] 未知 domain '%s'，跳过", action.get("domain"))
            continue
        if not isinstance(action.get("params"), dict):
            action["params"] = {}
        try:
            action["delay_seconds"] = float(action.get("delay_seconds", 0))
        except (TypeError, ValueError):
            action["delay_seconds"] = 0.0
        cleaned.append(action)

    raw["actions"] = cleaned
    raw.setdefault("reply", "")
    raw.setdefault("speak", "")
    if not isinstance(raw["reply"], str):
        raw["reply"] = str(raw["reply"])
    if not isinstance(raw["speak"], str):
        raw["speak"] = str(raw["speak"])

    return raw
