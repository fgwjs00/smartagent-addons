#!/bin/sh
set -eu

read_addon_option() {
    key="$1"
    options_path="${SA_OPTIONS_FILE:-/data/options.json}"
    python3 - "$key" "$options_path" <<'PY'
import json
import os
import sys
from pathlib import Path

key = sys.argv[1]
options_path = sys.argv[2]
try:
    options_path = Path(os.environ.get("SA_ADDON_OPTIONS_PATH") or options_path)
    data = json.loads(options_path.read_text(encoding="utf-8"))
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
LOG_LEVEL="$(read_addon_option 'log_level')"
CORE_STORAGE_MODE="$(read_addon_option 'core_storage_mode')"
DATA_SYNC_ENABLED="$(read_addon_option 'data_sync_enabled')"
DATA_SYNC_CONSENT_VERSION="$(read_addon_option 'data_sync_consent_version')"
LICENSE_KEY="$(read_addon_option 'license_key')"
DEPLOY_NAME="$(read_addon_option 'deploy_name')"
DEV_SOURCE_ROOT="$(read_addon_option 'dev_source_root')"
REMOTE_ACCESS_ENABLED="$(read_addon_option 'remote_access_enabled')"
REMOTE_CLOUD_URL="$(read_addon_option 'remote_cloud_url')"
REMOTE_GATEWAY_LABEL="$(read_addon_option 'remote_gateway_label')"
LLM_DEBUG_LOG_REQUESTS="$(read_addon_option 'llm_debug_log_requests')"
LLM_DEBUG_LOG_FULL_PROMPT="$(read_addon_option 'llm_debug_log_full_prompt')"
LLM_DEBUG_LOG_MAX_CHARS="$(read_addon_option 'llm_debug_log_max_chars')"
FRIGATE_ADMIN_API_URL="$(read_addon_option 'frigate_admin_api_url')"
FRIGATE_ADMIN_AUTH_MODE="$(read_addon_option 'frigate_admin_auth_mode')"
FRIGATE_ADMIN_TLS_VERIFY="$(read_addon_option 'frigate_admin_tls_verify')"
FIRMWARE_PROVIDER_BASE_URL="$(read_addon_option 'firmware_provider_base_url')"
FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS="$(read_addon_option 'firmware_trusted_ed25519_public_keys')"
PRESENCE_PROBABILISTIC_MODE="$(read_addon_option 'presence_probabilistic_mode')"
PRESENCE_PROBABILISTIC_HARD_OFF="$(read_addon_option 'presence_probabilistic_hard_off')"
FIRMWARE_MAINTENANCE_WIFI_SSID="$(read_addon_option 'firmware_maintenance_wifi_ssid')"
FIRMWARE_MAINTENANCE_WIFI_PASSWORD="$(read_addon_option 'firmware_maintenance_wifi_password')"
MATTER_PROTOCOL_ENABLED="$(read_addon_option 'matter_protocol_enabled')"

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
if [ -z "${LOG_LEVEL}" ] || [ "${LOG_LEVEL}" = "null" ]; then
    LOG_LEVEL="${SA_LOG_LEVEL:-INFO}"
fi
LOG_LEVEL_NORMALIZED="$(printf '%s' "${LOG_LEVEL}" | tr '[:lower:]' '[:upper:]')"
case "${LOG_LEVEL_NORMALIZED}" in
    DEBUG|INFO|WARNING|ERROR|CRITICAL)
        LOG_LEVEL="${LOG_LEVEL_NORMALIZED}"
        ;;
    *)
        LOG_LEVEL="INFO"
        ;;
esac
if [ -z "${CORE_STORAGE_MODE}" ] || [ "${CORE_STORAGE_MODE}" = "null" ]; then
    CORE_STORAGE_MODE="${SA_CORE_STORAGE_MODE:-local_first}"
fi
if [ -z "${DATA_SYNC_ENABLED}" ] || [ "${DATA_SYNC_ENABLED}" = "null" ]; then
    DATA_SYNC_ENABLED="${SA_DATA_SYNC_ENABLED:-false}"
fi
if [ -z "${DATA_SYNC_CONSENT_VERSION}" ] || [ "${DATA_SYNC_CONSENT_VERSION}" = "null" ]; then
    DATA_SYNC_CONSENT_VERSION="${SA_DATA_SYNC_CONSENT_VERSION:-2026-07-v1}"
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
if [ -z "${REMOTE_ACCESS_ENABLED}" ] || [ "${REMOTE_ACCESS_ENABLED}" = "null" ]; then
    REMOTE_ACCESS_ENABLED="${SA_REMOTE_ACCESS_ENABLED:-false}"
fi
REMOTE_ACCESS_ENABLED_NORMALIZED="$(printf '%s' "${REMOTE_ACCESS_ENABLED}" | tr '[:upper:]' '[:lower:]')"
case "${REMOTE_ACCESS_ENABLED_NORMALIZED}" in
    1|true|yes|on)
        REMOTE_ACCESS_ENABLED="true"
        ;;
    0|false|no|off)
        REMOTE_ACCESS_ENABLED="false"
        ;;
    *)
        REMOTE_ACCESS_ENABLED="false"
        ;;
esac
if [ -z "${REMOTE_CLOUD_URL}" ] || [ "${REMOTE_CLOUD_URL}" = "null" ]; then
    REMOTE_CLOUD_URL="${SA_REMOTE_CLOUD_URL:-https://api.smartagent.ai}"
fi
REMOTE_CLOUD_URL_VALIDATION="$(python3 - "${REMOTE_CLOUD_URL}" <<'PY'
import ipaddress
import sys
from urllib.parse import urlsplit

value = sys.argv[1]
valid = False
try:
    parsed = urlsplit(value)
    host = (parsed.hostname or "").rstrip(".").lower()
    port = parsed.port
    valid = (
        parsed.scheme.lower() == "https"
        and bool(host)
        and parsed.username is None
        and parsed.password is None
        and parsed.path in ("", "/")
        and not parsed.query
        and not parsed.fragment
        and host != "localhost"
        and not host.endswith(".localhost")
        and not host.endswith(".local")
    )
    if valid:
        try:
            address = ipaddress.ip_address(host)
        except ValueError:
            pass
        else:
            valid = address.is_global
except (TypeError, ValueError):
    valid = False
print("valid" if valid else "invalid")
PY
)"
if [ "${REMOTE_CLOUD_URL_VALIDATION}" != "valid" ]; then
    REMOTE_CLOUD_URL="https://api.smartagent.ai"
    REMOTE_ACCESS_ENABLED="false"
fi
if [ "${REMOTE_GATEWAY_LABEL}" = "null" ]; then
    REMOTE_GATEWAY_LABEL="${SA_REMOTE_GATEWAY_LABEL:-}"
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
if [ "${FRIGATE_ADMIN_API_URL}" = "null" ]; then
    FRIGATE_ADMIN_API_URL="${SA_FRIGATE_ADMIN_API_URL:-}"
fi
if [ -z "${FRIGATE_ADMIN_AUTH_MODE}" ] || [ "${FRIGATE_ADMIN_AUTH_MODE}" = "null" ]; then
    FRIGATE_ADMIN_AUTH_MODE="${SA_FRIGATE_ADMIN_AUTH_MODE:-interactive_login}"
fi
if [ "${FRIGATE_ADMIN_AUTH_MODE}" != "interactive_login" ]; then
    FRIGATE_ADMIN_AUTH_MODE="interactive_login"
fi
if [ -z "${FRIGATE_ADMIN_TLS_VERIFY}" ] || [ "${FRIGATE_ADMIN_TLS_VERIFY}" = "null" ]; then
    FRIGATE_ADMIN_TLS_VERIFY="${SA_FRIGATE_ADMIN_TLS_VERIFY:-true}"
fi
case "$(printf '%s' "${FRIGATE_ADMIN_TLS_VERIFY}" | tr '[:upper:]' '[:lower:]')" in
    false|0|no|off)
        FRIGATE_ADMIN_TLS_VERIFY="false"
        ;;
    *)
        FRIGATE_ADMIN_TLS_VERIFY="true"
        ;;
esac
if [ "${FIRMWARE_PROVIDER_BASE_URL}" = "null" ]; then
    FIRMWARE_PROVIDER_BASE_URL="${SA_FIRMWARE_PROVIDER_BASE_URL:-}"
fi
if [ "${FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS}" = "null" ]; then
    FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS="${SA_FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS:-}"
fi
if [ -z "${PRESENCE_PROBABILISTIC_MODE}" ] || [ "${PRESENCE_PROBABILISTIC_MODE}" = "null" ]; then
    PRESENCE_PROBABILISTIC_MODE="${SA_PRESENCE_PROBABILISTIC_MODE:-off}"
fi
case "$(printf '%s' "${PRESENCE_PROBABILISTIC_MODE}" | tr '[:upper:]' '[:lower:]')" in
    off|shadow|on)
        PRESENCE_PROBABILISTIC_MODE="$(printf '%s' "${PRESENCE_PROBABILISTIC_MODE}" | tr '[:upper:]' '[:lower:]')"
        ;;
    *)
        PRESENCE_PROBABILISTIC_MODE="off"
        ;;
esac
if [ -z "${PRESENCE_PROBABILISTIC_HARD_OFF}" ] || [ "${PRESENCE_PROBABILISTIC_HARD_OFF}" = "null" ]; then
    PRESENCE_PROBABILISTIC_HARD_OFF="${SA_PRESENCE_PROBABILISTIC_HARD_OFF:-true}"
fi
case "$(printf '%s' "${PRESENCE_PROBABILISTIC_HARD_OFF}" | tr '[:upper:]' '[:lower:]')" in
    false|0|no|off)
        PRESENCE_PROBABILISTIC_HARD_OFF="false"
        ;;
    *)
        PRESENCE_PROBABILISTIC_HARD_OFF="true"
        ;;
esac
if [ "${FIRMWARE_MAINTENANCE_WIFI_SSID}" = "null" ]; then
    FIRMWARE_MAINTENANCE_WIFI_SSID="${SA_FIRMWARE_MAINTENANCE_WIFI_SSID:-}"
fi
if [ "${FIRMWARE_MAINTENANCE_WIFI_PASSWORD}" = "null" ]; then
    FIRMWARE_MAINTENANCE_WIFI_PASSWORD="${SA_FIRMWARE_MAINTENANCE_WIFI_PASSWORD:-}"
fi
if [ -z "${MATTER_PROTOCOL_ENABLED}" ] || [ "${MATTER_PROTOCOL_ENABLED}" = "null" ]; then
    MATTER_PROTOCOL_ENABLED="${SA_MATTER_PROTOCOL_ENABLED:-false}"
fi

export SA_HA_URL="${HA_URL}"
export SA_HA_TOKEN="${HA_TOKEN}"
export SA_AUTH_TOKEN="${AUTH_TOKEN}"
export SA_INTERNAL_PORT="${ADDON_PORT}"
export SA_GATEWAY_UI_PORT="${GATEWAY_UI_PORT}"
export SA_HA_TIME_ZONE="${HA_TIME_ZONE}"
export TZ="${HA_TIME_ZONE}"
export SA_LOG_LEVEL="${LOG_LEVEL}"
export SA_UI_ROOT="${SA_UI_ROOT:-/app/ui-v3}"
export SA_UI_V3_ROOT="${SA_UI_V3_ROOT:-/app/ui-v3}"
export SA_SCREEN_ROOT="${SA_SCREEN_ROOT:-/app/screen}"
export SA_CORE_STORAGE_MODE="${CORE_STORAGE_MODE}"
export SA_DATA_SYNC_ENABLED="${DATA_SYNC_ENABLED}"
export SA_DATA_SYNC_CONSENT_VERSION="${DATA_SYNC_CONSENT_VERSION}"
export SA_LICENSE_KEY="${LICENSE_KEY}"
export SA_DEPLOY_NAME="${DEPLOY_NAME}"
export SA_DEV_SOURCE_ROOT="${DEV_SOURCE_ROOT}"
export SA_REMOTE_ACCESS_ENABLED="${REMOTE_ACCESS_ENABLED}"
export SA_REMOTE_CLOUD_URL="${REMOTE_CLOUD_URL}"
export SA_REMOTE_GATEWAY_LABEL="${REMOTE_GATEWAY_LABEL}"
export SA_LLM_DEBUG_LOG_REQUESTS="${LLM_DEBUG_LOG_REQUESTS}"
export SA_LLM_DEBUG_LOG_FULL_PROMPT="${LLM_DEBUG_LOG_FULL_PROMPT}"
export SA_LLM_DEBUG_LOG_MAX_CHARS="${LLM_DEBUG_LOG_MAX_CHARS}"
export SA_FRIGATE_ADMIN_API_URL="${FRIGATE_ADMIN_API_URL}"
export SA_FRIGATE_ADMIN_AUTH_MODE="${FRIGATE_ADMIN_AUTH_MODE}"
export SA_FRIGATE_ADMIN_TLS_VERIFY="${FRIGATE_ADMIN_TLS_VERIFY}"
export SA_FIRMWARE_PROVIDER_BASE_URL="${FIRMWARE_PROVIDER_BASE_URL}"
export SA_FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS="${FIRMWARE_TRUSTED_ED25519_PUBLIC_KEYS}"
export SA_PRESENCE_PROBABILISTIC_MODE="${PRESENCE_PROBABILISTIC_MODE}"
export SA_PRESENCE_PROBABILISTIC_HARD_OFF="${PRESENCE_PROBABILISTIC_HARD_OFF}"
export SA_FIRMWARE_MAINTENANCE_WIFI_SSID="${FIRMWARE_MAINTENANCE_WIFI_SSID}"
export SA_FIRMWARE_MAINTENANCE_WIFI_PASSWORD="${FIRMWARE_MAINTENANCE_WIFI_PASSWORD}"
export SA_MATTER_PROTOCOL_ENABLED="${MATTER_PROTOCOL_ENABLED}"

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
