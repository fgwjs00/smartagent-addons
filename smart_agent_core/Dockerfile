FROM scratch AS runtime
ARG BUILD_ARCH=amd64

ADD runtime/${BUILD_ARCH}/rootfs.tar.gz /
WORKDIR /app

COPY prebuilt/${BUILD_ARCH}/core/ /app/core/
COPY prebuilt/${BUILD_ARCH}/ha_bridge/ /app/ha_bridge/
COPY prebuilt/${BUILD_ARCH}/api_server*.so /app/

RUN set -e; \
    if [ "${BUILD_ARCH}" != "amd64" ]; then \
        echo "[SmartAgent] ERROR: this beta add-on package only supports amd64/x86_64" >&2; \
        exit 1; \
    fi; \
    so_file="$(find /app/core -type f -name '*.so' -print -quit)"; \
    if [ -z "${so_file}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 core .so files" >&2; \
        exit 1; \
    fi; \
    py_file="$(find /app/core -type f -name '*.py' -print -quit)"; \
    if [ -n "${py_file}" ]; then \
        echo "[SmartAgent] ERROR: Python source file leaked into prebuilt core: ${py_file}" >&2; \
        exit 1; \
    fi; \
    bridge_so="$(find /app/ha_bridge -type f -name '*.so' -print -quit)"; \
    if [ -z "${bridge_so}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 ha_bridge .so files" >&2; \
        exit 1; \
    fi; \
    bridge_py="$(find /app/ha_bridge -type f -name '*.py' -print -quit)"; \
    if [ -n "${bridge_py}" ]; then \
        echo "[SmartAgent] ERROR: Python source file leaked into prebuilt ha_bridge: ${bridge_py}" >&2; \
        exit 1; \
    fi; \
    api_so="$(find /app -maxdepth 1 -type f -name 'api_server*.so' -print -quit)"; \
    if [ -z "${api_so}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server .so file" >&2; \
        exit 1; \
    fi; \
    echo "[SmartAgent] using prebuilt amd64 core extensions"

COPY api_server_runner.py /app/
COPY run.sh /app/run.sh
COPY ui/ /app/ui/
COPY screen/ /app/screen/
RUN chmod +x /app/run.sh

EXPOSE 18099 8234

ENV SA_INTERNAL_PORT=18099
ENV SA_GATEWAY_UI_PORT=8234
ENV SA_UI_ROOT=/app/ui
ENV SA_SCREEN_ROOT=/app/screen
ENV SA_LOG_LEVEL=INFO

CMD ["/app/run.sh"]
