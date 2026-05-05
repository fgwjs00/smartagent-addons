#!/usr/bin/with-contenv bashio
set -eu

export SA_LOG_LEVEL="${SA_LOG_LEVEL:-INFO}"

read_addon_option() {
    bashio::config "$1" 2>/dev/null || true
}

HA_URL="$(read_addon_option 'ha_url')"
HA_TOKEN="$(read_addon_option 'ha_token')"
AUTH_TOKEN="$(read_addon_option 'auth_token')"
ADDON_PORT="$(read_addon_option 'addon_port')"
GATEWAY_UI_PORT="$(read_addon_option 'gateway_ui_port')"

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

export SA_HA_URL="${HA_URL}"
export SA_HA_TOKEN="${HA_TOKEN}"
export SA_AUTH_TOKEN="${AUTH_TOKEN}"
export SA_INTERNAL_PORT="${ADDON_PORT}"
export SA_GATEWAY_UI_PORT="${GATEWAY_UI_PORT}"
export SA_UI_ROOT="${SA_UI_ROOT:-/app/ui}"
export SA_SCREEN_ROOT="${SA_SCREEN_ROOT:-/app/screen}"

echo "[SmartAgent] starting Gateway/API internal=${SA_INTERNAL_PORT} ui=${SA_GATEWAY_UI_PORT} ha=${SA_HA_URL} ha_token=$( [ -n "${SA_HA_TOKEN}" ] && echo set || echo empty ) auth=$( [ -n "${SA_AUTH_TOKEN}" ] && echo set || echo local-only )"

exec python3 /app/api_server_runner.py
