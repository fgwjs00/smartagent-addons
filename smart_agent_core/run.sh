#!/bin/sh
set -eu

export SA_LOG_LEVEL="${SA_LOG_LEVEL:-INFO}"

read_addon_option() {
    key="$1"
    python3 - "$key" <<'PY'
import json
import sys
from pathlib import Path

key = sys.argv[1]
try:
    data = json.loads(Path("/data/options.json").read_text(encoding="utf-8"))
except Exception:
    data = {}
value = data.get(key, "")
if value is None:
    value = ""
print(value)
PY
}

HA_URL="$(read_addon_option 'ha_url')"
HA_TOKEN="$(read_addon_option 'ha_token')"
AUTH_TOKEN="$(read_addon_option 'auth_token')"
ADDON_PORT="$(read_addon_option 'addon_port')"
GATEWAY_UI_PORT="$(read_addon_option 'gateway_ui_port')"
HA_TIME_ZONE="$(read_addon_option 'ha_time_zone')"
CORE_STORAGE_MODE="$(read_addon_option 'core_storage_mode')"
DATA_SYNC_ENABLED="$(read_addon_option 'data_sync_enabled')"
LICENSE_KEY="$(read_addon_option 'license_key')"
DEPLOY_NAME="$(read_addon_option 'deploy_name')"
DEV_SOURCE_ROOT="$(read_addon_option 'dev_source_root')"
LLM_DEBUG_LOG_REQUESTS="$(read_addon_option 'llm_debug_log_requests')"
LLM_DEBUG_LOG_FULL_PROMPT="$(read_addon_option 'llm_debug_log_full_prompt')"
LLM_DEBUG_LOG_MAX_CHARS="$(read_addon_option 'llm_debug_log_max_chars')"

if [ -z "${HA_URL}" ] || [ "${HA_URL}" = "null" ]; then
    HA_URL="http://supervisor/core"
fi
if [ -z "${HA_TOKEN}" ] || [ "${HA_TOKEN}" = "null" ]; then
    HA_TOKEN="${SUPERVISOR_TOKEN:-}"
fi
if [ "${AUTH_TOKEN}" = "null" ]; then
    AUTH_TOKEN=""
fi
if [ -z "${ADDON_PORT}" ] || [ "${ADDON_PORT}" = "null" ]; then
    ADDON_PORT="${SA_INTERNAL_PORT:-18099}"
fi
if [ -z "${GATEWAY_UI_PORT}" ] || [ "${GATEWAY_UI_PORT}" = "null" ]; then
    GATEWAY_UI_PORT="${SA_GATEWAY_UI_PORT:-8234}"
fi
if [ -z "${HA_TIME_ZONE}" ] || [ "${HA_TIME_ZONE}" = "null" ]; then
    HA_TIME_ZONE="${SA_HA_TIME_ZONE:-Asia/Shanghai}"
fi
if [ -z "${CORE_STORAGE_MODE}" ] || [ "${CORE_STORAGE_MODE}" = "null" ]; then
    CORE_STORAGE_MODE="${SA_CORE_STORAGE_MODE:-local_first}"
fi
if [ -z "${DATA_SYNC_ENABLED}" ] || [ "${DATA_SYNC_ENABLED}" = "null" ]; then
    DATA_SYNC_ENABLED="${SA_DATA_SYNC_ENABLED:-true}"
fi
if [ "${LICENSE_KEY}" = "null" ]; then
    LICENSE_KEY="${SA_LICENSE_KEY:-}"
fi
if [ "${DEPLOY_NAME}" = "null" ]; then
    DEPLOY_NAME="${SA_DEPLOY_NAME:-}"
fi
if [ "${DEV_SOURCE_ROOT}" = "null" ]; then
    DEV_SOURCE_ROOT="${SA_DEV_SOURCE_ROOT:-}"
fi
if [ -z "${LLM_DEBUG_LOG_REQUESTS}" ] || [ "${LLM_DEBUG_LOG_REQUESTS}" = "null" ]; then
    LLM_DEBUG_LOG_REQUESTS="${SA_LLM_DEBUG_LOG_REQUESTS:-false}"
fi
if [ -z "${LLM_DEBUG_LOG_FULL_PROMPT}" ] || [ "${LLM_DEBUG_LOG_FULL_PROMPT}" = "null" ]; then
    LLM_DEBUG_LOG_FULL_PROMPT="${SA_LLM_DEBUG_LOG_FULL_PROMPT:-false}"
fi
if [ -z "${LLM_DEBUG_LOG_MAX_CHARS}" ] || [ "${LLM_DEBUG_LOG_MAX_CHARS}" = "null" ]; then
    LLM_DEBUG_LOG_MAX_CHARS="${SA_LLM_DEBUG_LOG_MAX_CHARS:-1000}"
fi

export SA_HA_URL="${HA_URL}"
export SA_HA_TOKEN="${HA_TOKEN}"
export SA_AUTH_TOKEN="${AUTH_TOKEN}"
export SA_INTERNAL_PORT="${ADDON_PORT}"
export SA_GATEWAY_UI_PORT="${GATEWAY_UI_PORT}"
export SA_HA_TIME_ZONE="${HA_TIME_ZONE}"
export SA_UI_ROOT="${SA_UI_ROOT:-/app/ui-v3}"
export SA_UI_V3_ROOT="${SA_UI_V3_ROOT:-/app/ui-v3}"
export SA_SCREEN_ROOT="${SA_SCREEN_ROOT:-/app/screen}"
export SA_CORE_STORAGE_MODE="${CORE_STORAGE_MODE}"
export SA_DATA_SYNC_ENABLED="${DATA_SYNC_ENABLED}"
export SA_LICENSE_KEY="${LICENSE_KEY}"
export SA_DEPLOY_NAME="${DEPLOY_NAME}"
export SA_DEV_SOURCE_ROOT="${DEV_SOURCE_ROOT}"
export SA_LLM_DEBUG_LOG_REQUESTS="${LLM_DEBUG_LOG_REQUESTS}"
export SA_LLM_DEBUG_LOG_FULL_PROMPT="${LLM_DEBUG_LOG_FULL_PROMPT}"
export SA_LLM_DEBUG_LOG_MAX_CHARS="${LLM_DEBUG_LOG_MAX_CHARS}"

APP_BOOTSTRAP="/app/api_server_bootstrap.py"
if [ -n "${DEV_SOURCE_ROOT}" ]; then
    if [ ! -f "${DEV_SOURCE_ROOT}/api_server_bootstrap.py" ] || [ ! -f "${DEV_SOURCE_ROOT}/api_server.py" ]; then
        echo "[SmartAgent] dev_source_root is set but invalid: ${DEV_SOURCE_ROOT}" >&2
        exit 78
    fi
    APP_BOOTSTRAP="${DEV_SOURCE_ROOT}/api_server_bootstrap.py"
    export PYTHONPATH="${DEV_SOURCE_ROOT}:${PYTHONPATH:-}"
    if [ -d "${DEV_SOURCE_ROOT}/ui-v3" ]; then
        export SA_UI_ROOT="${DEV_SOURCE_ROOT}/ui-v3"
        export SA_UI_V3_ROOT="${DEV_SOURCE_ROOT}/ui-v3"
    elif [ -d "${DEV_SOURCE_ROOT}/ui" ]; then
        export SA_UI_ROOT="${DEV_SOURCE_ROOT}/ui"
    fi
    if [ -d "${DEV_SOURCE_ROOT}/screen" ]; then
        export SA_SCREEN_ROOT="${DEV_SOURCE_ROOT}/screen"
    fi
    echo "[SmartAgent] dev source enabled root=${DEV_SOURCE_ROOT}"
fi

echo "[SmartAgent] starting Gateway/API internal=${SA_INTERNAL_PORT} ui=${SA_GATEWAY_UI_PORT} ha=${SA_HA_URL} ha_token=$( [ -n "${SA_HA_TOKEN}" ] && echo set || echo empty ) auth=$( [ -n "${SA_AUTH_TOKEN}" ] && echo set || echo local-only ) bootstrap=${APP_BOOTSTRAP}"

exec python3 "${APP_BOOTSTRAP}"
