"""
SmartAgent AI Core 包。

迁移状态（数据积累期结束后逐步迁移）：

模块                     来源                              状态
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
inference.py          custom_components/smart_agent/    🔲 待迁移
fast_brain.py         custom_components/smart_agent/    🔲 待迁移
decision_pipeline.py  custom_components/smart_agent/    🔲 待迁移
memory_store.py       custom_components/smart_agent/    🔲 待迁移
feature_encoder.py    custom_components/smart_agent/    🔲 待迁移
db_service.py         custom_components/smart_agent/    🔲 待迁移（共享 SQLite）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

迁移完成后，api_server.py 的 /infer 端点将直接调用这些模块，
代替现在的占位符 stub。

安全说明：
  迁移后核心 .py 文件将通过 Cython 编译为 .so 二进制，
  不在 Docker 镜像中保留明文 Python 源码。
  参考：../Dockerfile 的 builder 阶段注释。
"""
