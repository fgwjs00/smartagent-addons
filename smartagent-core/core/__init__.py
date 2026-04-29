"""
SmartAgent AI Core 包。

迁移状态（数据积累期结束后逐步迁移）：

模块                     来源                              状态
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
inference.py          custom_components/smart_agent/    ✅ 已迁移
decision/fast_brain.py custom_components/smart_agent/  ✅ 快脑纯决策已迁移
decision_pipeline.py  custom_components/smart_agent/    🔲 待迁移
decision/intent_verifier.py custom_components/smart_agent/ ✅ 纯逻辑已迁移
decision/protection.py      custom_components/smart_agent/ ✅ 优先级仲裁已迁移
execution/*.py              新 command envelope contract   ✅ 已建立
memory/memory_store.py custom_components/smart_agent/  ✅ 纯读模型已迁移
decision/feature_encoder.py custom_components/smart_agent/ ✅ 快照编码已迁移
storage/database.py   custom_components/smart_agent/    ✅ SQLite 边界已迁移
context/context_builder.py custom_components/smart_agent/ ✅ 纯 bundle 工具已迁移
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

迁移完成后，api_server.py 的 /infer 端点将直接调用这些模块，
代替现在的占位符 stub。

安全说明：
  迁移后核心 .py 文件将通过 Cython 编译为 .so 二进制，
  不在 Docker 镜像中保留明文 Python 源码。
  参考：../Dockerfile 的 builder 阶段注释。
"""
