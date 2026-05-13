FROM scratch AS runtime
ARG BUILD_ARCH=amd64

ADD runtime/${BUILD_ARCH}/rootfs.tar.gz /
WORKDIR /app

COPY prebuilt/${BUILD_ARCH}/core/ /app/core/
COPY prebuilt/${BUILD_ARCH}/ha_bridge/ /app/ha_bridge/
COPY prebuilt/${BUILD_ARCH}/api_server* /app/
COPY prebuilt/${BUILD_ARCH}/api_server.sha256 /app/api_server.sha256

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
    pycache_file="$(find /app/core -type f \( -name '*.pyc*' -o -name '*.pyo*' \) -print -quit)"; \
    if [ -n "${pycache_file}" ]; then \
        echo "[SmartAgent] ERROR: Python bytecode cache leaked into prebuilt core: ${pycache_file}" >&2; \
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
    bridge_pycache="$(find /app/ha_bridge -type f \( -name '*.pyc*' -o -name '*.pyo*' \) -print -quit)"; \
    if [ -n "${bridge_pycache}" ]; then \
        echo "[SmartAgent] ERROR: Python bytecode cache leaked into prebuilt ha_bridge: ${bridge_pycache}" >&2; \
        exit 1; \
    fi; \
    api_native="$(find /app -maxdepth 1 -type f -name 'api_server*.so' -print -quit)"; \
    if [ -n "${api_native}" ]; then \
        echo "[SmartAgent] ERROR: native api ingress modules are disabled; ship api_server*.pyc only: ${api_native}" >&2; \
        exit 1; \
    fi; \
    api_module="$(find /app -maxdepth 1 -type f -name 'api_server.pyc' -print -quit)"; \
    if [ -z "${api_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server.pyc file" >&2; \
        exit 1; \
    fi; \
    api_py="$(find /app -maxdepth 1 -type f -name 'api_server*.py' -print -quit)"; \
    if [ -n "${api_py}" ]; then \
        echo "[SmartAgent] ERROR: Python source file leaked into prebuilt api ingress: ${api_py}" >&2; \
        exit 1; \
    fi; \
    api_logs_module="$(find /app -maxdepth 1 -type f -name 'api_server_logs.pyc' -print -quit)"; \
    if [ -z "${api_logs_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_logs.pyc file" >&2; \
        exit 1; \
    fi; \
    api_backups_module="$(find /app -maxdepth 1 -type f -name 'api_server_backups.pyc' -print -quit)"; \
    if [ -z "${api_backups_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_backups.pyc file" >&2; \
        exit 1; \
    fi; \
    api_patrol_module="$(find /app -maxdepth 1 -type f -name 'api_server_patrol.pyc' -print -quit)"; \
    if [ -z "${api_patrol_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_patrol.pyc file" >&2; \
        exit 1; \
    fi; \
    api_settings_module="$(find /app -maxdepth 1 -type f -name 'api_server_settings.pyc' -print -quit)"; \
    if [ -z "${api_settings_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_settings.pyc file" >&2; \
        exit 1; \
    fi; \
    api_scenes_module="$(find /app -maxdepth 1 -type f -name 'api_server_scenes.pyc' -print -quit)"; \
    if [ -z "${api_scenes_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_scenes.pyc file" >&2; \
        exit 1; \
    fi; \
    api_rooms_module="$(find /app -maxdepth 1 -type f -name 'api_server_rooms.pyc' -print -quit)"; \
    if [ -z "${api_rooms_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_rooms.pyc file" >&2; \
        exit 1; \
    fi; \
    api_mcp_module="$(find /app -maxdepth 1 -type f -name 'api_server_mcp.pyc' -print -quit)"; \
    if [ -z "${api_mcp_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_mcp.pyc file" >&2; \
        exit 1; \
    fi; \
    api_presence_module="$(find /app -maxdepth 1 -type f -name 'api_server_presence.pyc' -print -quit)"; \
    if [ -z "${api_presence_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_presence.pyc file" >&2; \
        exit 1; \
    fi; \
    api_transactions_module="$(find /app -maxdepth 1 -type f -name 'api_server_transactions.pyc' -print -quit)"; \
    if [ -z "${api_transactions_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_transactions.pyc file" >&2; \
        exit 1; \
    fi; \
    api_learning_module="$(find /app -maxdepth 1 -type f -name 'api_server_learning.pyc' -print -quit)"; \
    if [ -z "${api_learning_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_learning.pyc file" >&2; \
        exit 1; \
    fi; \
    api_devices_module="$(find /app -maxdepth 1 -type f -name 'api_server_devices.pyc' -print -quit)"; \
    if [ -z "${api_devices_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_devices.pyc file" >&2; \
        exit 1; \
    fi; \
    api_operations_module="$(find /app -maxdepth 1 -type f -name 'api_server_operations.pyc' -print -quit)"; \
    if [ -z "${api_operations_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_operations.pyc file" >&2; \
        exit 1; \
    fi; \
    api_planning_module="$(find /app -maxdepth 1 -type f -name 'api_server_planning.pyc' -print -quit)"; \
    if [ -z "${api_planning_module}" ]; then \
        echo "[SmartAgent] ERROR: missing prebuilt amd64 api_server_planning.pyc file" >&2; \
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
