"""
setup.py — SmartAgent Add-on Cython 编译配置。

使用方式（在 Docker builder 阶段执行）：
    python setup.py build_ext --inplace

编译目标：
    core/inference_engine.pyx → core/inference_engine.*.so
    （其余 .py 文件保持明文；只有核心 IP 需要编译保护）

注意：
  - 文件名 .pyx 需提前将 .py 重命名（或在 Dockerfile 中创建 .pyx 软链接）
  - 编译结果 .so 复制到 runtime 镜像，原 .pyx 不随镜像分发
"""
from Cython.Build import cythonize
from setuptools import setup, Extension

ext_modules = [
    Extension(
        "core.inference_engine",
        sources=["core/inference_engine.py"],
        extra_compile_args=["-O2"],
    ),
]

setup(
    name="smartagent-core",
    version="1.0.0",
    ext_modules=cythonize(
        ext_modules,
        compiler_directives={
            "language_level": "3",
            "boundscheck": False,
            "wraparound": False,
        },
    ),
)
