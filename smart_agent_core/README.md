Current release: `Beta 0.0.5`

# SmartAgent AI Core Add-on

SmartAgent 推理引擎与迁移期 Gateway 代理的 HA Add-on 版本。

当前定位：

- 已承接本地 `/infer` 推理服务
- 已提供大量 Gateway 风格代理路由
- 仍主要把业务请求转发到 HA 集成内的 `/api/v1/*`
- 尚未完成真正本地 Core 业务迁移

## 架构

```
HA 集成层（迁移期仍偏厚）             Add-on（Docker）
custom_components/smart_agent/  ←→   smartagent-addon/
├── __init__.py (/api/v1 业务接口)     ├── api_server.py (推理 + 代理)
├── coordinator.py / actions.py        ├── core/inference_engine.py
├── database.py / patrol.py            └── ...
└── frontend/ (旧 HA 面板，待降级)

说明：
- 当前 add-on 的 Gateway 路由多数仍是代理 HA 集成。
- 这不等于 Core 业务已经迁入 add-on。
- 后续目标是逐步把稳定业务能力从 HA 集成沉淀到 Local Core。
```

## 开发状态

| 组件 | 状态 |
|------|------|
| Add-on 目录结构 | ✅ 完成 |
| 本地 `/infer` 推理服务 | ✅ 可运行 |
| Gateway 风格代理路由 | 🔶 Phase 1 已接入，当前多数转发 HA |
| 事件流 / 语音会话代理 | 🔶 已有代理入口，仍依赖 HA 上游 |
| AI 核心迁移 | 🔶 推理引擎已在 `core/`，决策/记忆/学习仍主要在 HA 集成 |
| Cython 编译保护 | 🔶 基础配置已存在，发布策略仍需收紧 |
| 多平台构建流水线 | 🔲 待搭建 |

## 本地开发

```bash
# 开发构建（允许 Python source fallback）
docker build -t smartagent-addon .

# 交付构建（无 .so 不发版）
docker build --build-arg SA_DELIVERY_BUILD=1 -t smartagent-addon-release .

# 本地测试（代理 HA /api/v1 需提供 SA_HA_URL + SA_HA_TOKEN）
# 默认端口 18099（高位私有端口，避免与常用 8099 服务冲突）
docker run -p 18099:18099 \
  -e SA_HA_URL="http://host.docker.internal:8123" \
  -e SA_HA_TOKEN="<HA_TOKEN>" \
  -e SA_AUTH_TOKEN="<INTERNAL_TOKEN>" \
  smartagent-addon

# 若宿主机 18099 有冲突，可通过 SA_INTERNAL_PORT 环境变量指定其他端口
# docker run -p 19099:19099 -e SA_INTERNAL_PORT=19099 ... smartagent-addon

# 验证 API
curl http://localhost:18099/health
```

## 核心 API 契约（迁移期口径）

Add-on 对外入口分两类：

1. 本地能力：
   - `POST /infer`
   - `GET /health`
   - `GET /status`
   - `GET /diagnostics`
   - `GET /system/diagnostics`

2. 迁移期代理能力：
   - Gateway 风格路径由 add-on 接收
   - 内部统一转发到 HA `/api/v1/*`（Batch5 起已下线 root-base `/api/smart_agent/*` 日志/导出兼容入口）
   - 代理路由用于统一前端入口，不代表业务 Core 已迁入 add-on

当前最小闭环入口：

- 读取：
  - `GET /system/status`
  - `GET /dashboard/summary`
  - `GET /devices`
  - `GET /rooms`
  - `GET /ai-scenes`
  - `GET /transactions`
  - `GET /memory/profiles`
  - `GET /memory/habits`
  - `GET /corrections`
  - `GET /energy`
  - `GET /license/status`
  - `GET /backups`
  - `GET /vision/cameras`
  - `GET /mcp/status`
- 写入：
  - `POST /ai-scenes/approve`
  - `POST /ai-scenes/reject`
  - `POST /ai-scenes/{id}/trigger`（canonical）
  - `POST /transactions/{id}/rollback`（兼容 `/transactions/rollback`）
  - `POST /devices/discover`
  - `POST /devices/batch-add`
  - `PATCH /devices/{entity_id}`
  - `DELETE /devices/{entity_id}`
  - `POST /rooms/sync`
  - `POST /license/verify`
  - `POST /backups/create`
  - `POST /backups/restore`
  - `POST /backups/delete`
  - `POST /patrol/trigger`

流式入口：

- `GET /events`
- `GET /api/v1/events`
- `GET /voice/session`
- `GET /api/v1/voice/session`

统一错误模型：

```json
{
  "ok": false,
  "error": "...",
  "error_type": "...",
  "retryable": true
}
```

Batch 0 收口约束：

- add-on 对外 canonical 读接口必须与 `smartagent-ui-v2/src/api/gateway.ts` 的真实消费契约保持一致。
- `/system/status` 在成功态必须提供前端可直接消费的标量字段（`gateway` / `core` / `ha` / `mode` / `uptime_sec` / `devices_managed` / `active_scenes` / `voice_provider` / `cpu` / `memory`）。
- `/devices`、`/rooms`、`/rooms/topology` 这类列表读接口成功态必须返回原始数组；上游若返回非 list / 非 `data: list` 形态，必须返回结构化错误而不是 `200` 对象。
- add-on 优先链路中仅 `404/405` 允许 fallback；`401/403/422/5xx` 必须保留原状态码与 `error/error_type/retryable` 语义。
- AI 场景 trigger 的 canonical 路径为 `POST /ai-scenes/{id}/trigger`；`POST /ai-scenes/trigger` 仅作迁移期兼容入口。

鉴权：

- Add-on 内部入口：`X-SA-Token` 或 `Authorization: Bearer`
- Add-on → HA：使用 `SA_HA_TOKEN`（或 `SUPERVISOR_TOKEN`）转发到 HA API

环路切断标记：

- Add-on 反向代理 HA `/api/v1/*` 时会自动附加 `X-SA-Proxy-From: addon`
- HA 侧在“add-on 优先 + 本地回退”链路检测到该标记后，会跳过 add-on 回调直接走本地回退，防止递归代理

## 联调用例（curl）

```bash
TOKEN="<INTERNAL_TOKEN>"
BASE="http://localhost:18099"  # 默认 18099；如已自定义端口请修改此处

# 1) 读：系统状态
curl -H "X-SA-Token: $TOKEN" "$BASE/system/status"

# 2) 读：仪表盘摘要
curl -H "X-SA-Token: $TOKEN" "$BASE/dashboard/summary"

# 3) 读：设备与房间
curl -H "X-SA-Token: $TOKEN" "$BASE/devices"
curl -H "X-SA-Token: $TOKEN" "$BASE/rooms"

# 4) 读：场景与事务
curl -H "X-SA-Token: $TOKEN" "$BASE/ai-scenes"
curl -H "X-SA-Token: $TOKEN" "$BASE/transactions"

# 5) 写：场景审批/拒绝/触发
curl -X POST -H "X-SA-Token: $TOKEN" -H "Content-Type: application/json" \
  -d '{"id": 12}' "$BASE/ai-scenes/approve"
curl -X POST -H "X-SA-Token: $TOKEN" -H "Content-Type: application/json" \
  -d '{"id": 12}' "$BASE/ai-scenes/reject"
curl -X POST -H "X-SA-Token: $TOKEN" -H "Content-Type: application/json" \
  -d '{"id": 12}' "$BASE/ai-scenes/12/trigger"

# 6) 写：事务回滚
curl -X POST -H "X-SA-Token: $TOKEN" -H "Content-Type: application/json" \
  -d '{"id": 77}' "$BASE/transactions/77/rollback"

# 7) 诊断（主路径 + 兼容路径）
curl -H "X-SA-Token: $TOKEN" "$BASE/diagnostics"
curl -H "X-SA-Token: $TOKEN" "$BASE/system/diagnostics"
```

## 迁移计划

1. **当前（迁移期）**：HA 集成仍承载主要业务能力；Add-on 提供本地推理和 Gateway 代理层。
2. **下一步**：把代理路由背后的稳定业务逐步沉淀为 add-on 本地 Core 服务，减少对 HA 厚业务层的依赖。
3. **Core 迁移**：优先迁移边界清晰的推理、校验、评分、策略编排能力；设备执行和 HA service 映射仍留在 adapter 侧。
4. **保护**：继续使用 Cython 编译关键模块，并收紧商业构建的源码回退策略。
5. **发布**：完成多平台构建流水线后，推送到容器仓库并通过 HA Add-on 仓库交付。
