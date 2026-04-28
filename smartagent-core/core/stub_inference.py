"""
stub_inference.py — AI 推理占位符（Add-on 骨架 / Cython 编译降级）。

使用场景：
  1. inference_engine.so 尚未编译成功时，api_server.py 回退到此 stub
  2. 返回明确的空结果，使 HA 集成判断为"Add-on 返回空"并自动降级到本地推理

符合 InferenceBundle v4.8.79 接口约定：接受完整 bundle 字典。
"""
from __future__ import annotations
from typing import Any


async def infer_stub(trigger: str, bundle: dict[str, Any]) -> dict[str, Any]:
    """AI 推理占位符，返回空决策（触发 HA 集成降级到本地推理）。

    :param trigger: 触发文本
    :param bundle: InferenceBundle 字典（当前不使用）
    :return: 空动作决策字典
    """
    return {
        "scene": "stub 模式",
        "confidence": 0,
        "actions": [],
        "reply": "",
        "speak": "",
        "_source": "stub",
        "_note": "inference_engine.so 未就绪，HA 集成将自动降级到本地推理",
    }
