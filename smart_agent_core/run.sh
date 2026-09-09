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
PROACTIVE_CANARY_AUTHORIZATION_SECRET="$(read_addon_option 'proactive_canary_authorization_secret')"
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
ACTIVE_AI_MODE="$(read_addon_option 'active_ai_mode')"
ACTIVE_AI_CANARY_SPACE_IDS="$(read_addon_option 'active_ai_canary_space_ids')"
ACTIVE_AI_CANARY_DOMAINS="$(read_addon_option 'active_ai_canary_domains')"
ACTIVE_AI_CANARY_ENTITY_IDS="$(read_addon_option 'active_ai_canary_entity_ids')"
DOMAIN_REAL_EXECUTION_ENABLED="$(read_addon_option 'domain_real_execution_enabled')"
LIGHTING_CONTROLLED_EXECUTION_ENABLED="$(read_addon_option 'lighting_controlled_execution_enabled')"
OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED="$(read_addon_option 'operations_provider_readback_source_enabled')"
OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED="$(read_addon_option 'operations_provider_readback_runtime_enabled')"
OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET="$(read_addon_option 'operations_provider_readback_ledger_secret')"
PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET="$(read_addon_option 'proactive_verified_outcome_integrity_secret')"
OWNER_AUTONOMY_ENABLED="$(read_addon_option 'owner_autonomy_enabled')"
OWNER_AUTONOMY_PRINCIPAL_ID="$(read_addon_option 'owner_autonomy_principal_id')"
OWNER_AUTONOMY_ENVELOPE_ID="$(read_addon_option 'owner_autonomy_envelope_id')"
OWNER_AUTONOMY_PUBLIC_KEY="$(read_addon_option 'owner_autonomy_public_key')"
PRESENCE_PROBABILISTIC_MODE="$(read_addon_option 'presence_probabilistic_mode')"
PRESENCE_PROBABILISTIC_HARD_OFF="$(read_addon_option 'presence_probabilistic_hard_off')"
FIRMWARE_MAINTENANCE_WIFI_SSID="$(read_addon_option 'firmware_maintenance_wifi_ssid')"
FIRMWARE_MAINTENANCE_WIFI_PASSWORD="$(read_addon_option 'firmware_maintenance_wifi_password')"
STEWARD_CHANNEL_ENABLED="$(read_addon_option 'steward_channel_enabled')"
STEWARD_BASE_URL="$(read_addon_option 'steward_base_url')"
STEWARD_DEVICE_DELEGATION_ENABLED="$(read_addon_option 'steward_device_delegation_enabled')"
STEWARD_EVENTS_TOKEN="$(read_addon_option 'steward_events_token')"
STEWARD_HOUSEHOLD_ID="$(read_addon_option 'steward_household_id')"
STEWARD_CHANNEL_TIMEOUT_SECONDS="$(read_addon_option 'steward_channel_timeout_seconds')"
REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED="$(read_addon_option 'refresh_registry_source_ingress_enabled')"
REFRESH_REGISTRY_SOURCE_INGRESS_PORT="$(read_addon_option 'refresh_registry_source_ingress_port')"
REFRESH_REGISTRY_SITE_ID="$(read_addon_option 'refresh_registry_site_id')"
REFRESH_REGISTRY_HA_INSTALLATION_DIGEST="$(read_addon_option 'refresh_registry_ha_installation_digest')"
REFRESH_REGISTRY_BRIDGE_CONFIG_ENTRY_ID="$(read_addon_option 'refresh_registry_bridge_config_entry_id')"
REFRESH_REGISTRY_INGRESS_SECRET="$(read_addon_option 'refresh_registry_ingress_secret')"
REFRESH_REGISTRY_PREVIOUS_INGRESS_SECRET="$(read_addon_option 'refresh_registry_previous_ingress_secret')"
REFRESH_REGISTRY_ATTESTATION_SECRET="$(read_addon_option 'refresh_registry_attestation_secret')"
REFRESH_REGISTRY_PREVIOUS_ATTESTATION_SECRET="$(read_addon_option 'refresh_registry_previous_attestation_secret')"
REFRESH_REGISTRY_SOURCE_LEDGER_SECRET="$(read_addon_option 'refresh_registry_source_ledger_secret')"
REFRESH_REGISTRY_CATALOG_WRITER_SECRET="$(read_addon_option 'refresh_registry_catalog_writer_secret')"
REFRESH_REGISTRY_PREVIOUS_CATALOG_WRITER_SECRET="$(read_addon_option 'refresh_registry_previous_catalog_writer_secret')"
OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED="$(read_addon_option 'observation_refresh_evidence_ingress_enabled')"
OBSERVATION_REFRESH_EVIDENCE_INGRESS_SECRET="$(read_addon_option 'observation_refresh_evidence_ingress_secret')"
OBSERVATION_REFRESH_EVIDENCE_PREVIOUS_INGRESS_SECRET="$(read_addon_option 'observation_refresh_evidence_previous_ingress_secret')"
OBSERVATION_REFRESH_EVIDENCE_WORLD_INTEGRITY_SECRET="$(read_addon_option 'observation_refresh_evidence_world_integrity_secret')"
OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED="$(read_addon_option 'observation_refresh_provider_runtime_enabled')"
OBSERVATION_REFRESH_PROVIDER_REQUEST_SECRET="$(read_addon_option 'observation_refresh_provider_request_secret')"
OBSERVATION_REFRESH_PROVIDER_PREVIOUS_REQUEST_SECRET="$(read_addon_option 'observation_refresh_provider_previous_request_secret')"
GOAL_SCHEDULE_CONTROLLER_ENABLED="$(read_addon_option 'goal_schedule_controller_enabled')"
GOAL_SCHEDULE_SITE_ID="$(read_addon_option 'goal_schedule_site_id')"
GOAL_SCHEDULE_INTERVAL_SECONDS="$(read_addon_option 'goal_schedule_interval_seconds')"
GOAL_SCHEDULE_RECOVERY_WINDOW_SECONDS="$(read_addon_option 'goal_schedule_recovery_window_seconds')"
GOAL_SCHEDULE_LOOKAHEAD_SECONDS="$(read_addon_option 'goal_schedule_lookahead_seconds')"
GOAL_SCHEDULE_MAX_WINDOW_DAYS="$(read_addon_option 'goal_schedule_max_window_days')"
OUTPUT_LEDGER_INGRESS_ENABLED="$(read_addon_option 'output_ledger_ingress_enabled')"
OUTPUT_LEDGER_INGRESS_PORT="$(read_addon_option 'output_ledger_ingress_port')"
OUTPUT_LEDGER_HA_INSTALLATION_DIGEST="$(read_addon_option 'output_ledger_ha_installation_digest')"
OUTPUT_LEDGER_BRIDGE_CONFIG_ENTRY_ID="$(read_addon_option 'output_ledger_bridge_config_entry_id')"
OUTPUT_LEDGER_INGRESS_SECRET="$(read_addon_option 'output_ledger_ingress_secret')"
OUTPUT_LEDGER_PREVIOUS_INGRESS_SECRET="$(read_addon_option 'output_ledger_previous_ingress_secret')"
OUTPUT_LEDGER_ATTESTATION_SECRET="$(read_addon_option 'output_ledger_attestation_secret')"
OUTPUT_LEDGER_PREVIOUS_ATTESTATION_SECRET="$(read_addon_option 'output_ledger_previous_attestation_secret')"
OUTPUT_LEDGER_INTEGRITY_SECRET="$(read_addon_option 'output_ledger_integrity_secret')"
MAINTENANCE_CHANGE_INGRESS_ENABLED="$(read_addon_option 'maintenance_change_ingress_enabled')"
MAINTENANCE_CHANGE_INGRESS_PORT="$(read_addon_option 'maintenance_change_ingress_port')"
MAINTENANCE_CHANGE_HA_INSTALLATION_DIGEST="$(read_addon_option 'maintenance_change_ha_installation_digest')"
MAINTENANCE_CHANGE_BRIDGE_CONFIG_ENTRY_ID="$(read_addon_option 'maintenance_change_bridge_config_entry_id')"
MAINTENANCE_CHANGE_INGRESS_SECRET="$(read_addon_option 'maintenance_change_ingress_secret')"
MAINTENANCE_CHANGE_PREVIOUS_INGRESS_SECRET="$(read_addon_option 'maintenance_change_previous_ingress_secret')"
MAINTENANCE_DELEGATION_ATTESTATION_SECRET="$(read_addon_option 'maintenance_delegation_attestation_secret')"
MAINTENANCE_DELEGATION_PREVIOUS_ATTESTATION_SECRET="$(read_addon_option 'maintenance_delegation_previous_attestation_secret')"
MAINTENANCE_CHANGE_LEDGER_INTEGRITY_SECRET="$(read_addon_option 'maintenance_change_ledger_integrity_secret')"
FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED="$(read_addon_option 'field_canary_operator_identity_ingress_enabled')"
FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT="$(read_addon_option 'field_canary_operator_identity_ingress_port')"
FIELD_CANARY_OPERATOR_HA_INSTALLATION_DIGEST="$(read_addon_option 'field_canary_operator_ha_installation_digest')"
FIELD_CANARY_OPERATOR_BRIDGE_CONFIG_ENTRY_ID="$(read_addon_option 'field_canary_operator_bridge_config_entry_id')"
FIELD_CANARY_OPERATOR_INGRESS_SECRET="$(read_addon_option 'field_canary_operator_ingress_secret')"
FIELD_CANARY_OPERATOR_PREVIOUS_INGRESS_SECRET="$(read_addon_option 'field_canary_operator_previous_ingress_secret')"
FIELD_CANARY_OPERATOR_ATTESTATION_SECRET="$(read_addon_option 'field_canary_operator_attestation_secret')"
FIELD_CANARY_OPERATOR_PREVIOUS_ATTESTATION_SECRET="$(read_addon_option 'field_canary_operator_previous_attestation_secret')"
FIELD_CANARY_OPERATOR_CHALLENGE_LEDGER_SECRET="$(read_addon_option 'field_canary_operator_challenge_ledger_secret')"
FIELD_CANARY_OPERATOR_IDENTITY_LEDGER_SECRET="$(read_addon_option 'field_canary_operator_identity_ledger_secret')"
FIELD_CANARY_OPERATOR_APPROVAL_LEDGER_SECRET="$(read_addon_option 'field_canary_operator_approval_ledger_secret')"
FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED="$(read_addon_option 'field_canary_governance_runtime_enabled')"
FIELD_CANARY_AUTHORITY_ISSUER_SECRET="$(read_addon_option 'field_canary_authority_issuer_secret')"
FIELD_CANARY_ISSUER_POLICY_SECRET="$(read_addon_option 'field_canary_issuer_policy_secret')"
FIELD_CANARY_AUTHORITY_LEDGER_SECRET="$(read_addon_option 'field_canary_authority_ledger_secret')"
FIELD_CANARY_AUTHORITY_SNAPSHOT_SECRET="$(read_addon_option 'field_canary_authority_snapshot_secret')"
FIELD_CANARY_MATERIALIZER_SECRET="$(read_addon_option 'field_canary_materializer_secret')"
FIELD_CANARY_GRANT_PROPOSAL_SECRET="$(read_addon_option 'field_canary_grant_proposal_secret')"
FIELD_CANARY_GRANT_SECRET="$(read_addon_option 'field_canary_grant_secret')"
FIELD_CANARY_GRANT_REVOCATION_PROPOSAL_SECRET="$(read_addon_option 'field_canary_grant_revocation_proposal_secret')"
FIELD_CANARY_GRANT_REVOCATION_RECEIPT_SECRET="$(read_addon_option 'field_canary_grant_revocation_receipt_secret')"
FIELD_CANARY_GRANT_USE_SECRET="$(read_addon_option 'field_canary_grant_use_secret')"
FIELD_CANARY_DISPATCH_PRECONDITION_SECRET="$(read_addon_option 'field_canary_dispatch_precondition_secret')"
FIELD_CANARY_DISPATCH_PERMIT_SECRET="$(read_addon_option 'field_canary_dispatch_permit_secret')"
FIELD_CANARY_PROOF_ISSUANCE_SECRET="$(read_addon_option 'field_canary_proof_issuance_secret')"
FIELD_CANARY_HOST_DISPATCH_PROOF_SECRET="$(read_addon_option 'field_canary_host_dispatch_proof_secret')"

if [ -z "${HA_URL}" ] || [ "${HA_URL}" = "null" ]; then
    HA_URL="http://supervisor/core"
fi
HA_URL="$(printf '%s' "${HA_URL}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
HA_URL="${HA_URL%/}"
if [ "${HA_URL}" = "http://supervisor/core" ]; then
    HA_TOKEN="${SUPERVISOR_TOKEN:-}"
elif [ -z "${HA_TOKEN}" ] || [ "${HA_TOKEN}" = "null" ]; then
    HA_TOKEN=""
fi
if [ "${AUTH_TOKEN}" = "null" ]; then
    AUTH_TOKEN=""
fi
if [ -z "${PROACTIVE_CANARY_AUTHORIZATION_SECRET}" ] || [ "${PROACTIVE_CANARY_AUTHORIZATION_SECRET}" = "null" ]; then
    PROACTIVE_CANARY_AUTHORIZATION_SECRET="${SA_PROACTIVE_CANARY_AUTHORIZATION_SECRET:-}"
fi
if [ -n "${PROACTIVE_CANARY_AUTHORIZATION_SECRET}" ]; then
    if [ "${#PROACTIVE_CANARY_AUTHORIZATION_SECRET}" -lt 32 ]; then
        echo "proactive_canary_authorization_secret must contain at least 32 characters" >&2
        exit 1
    fi
    if [ "${PROACTIVE_CANARY_AUTHORIZATION_SECRET}" = "${AUTH_TOKEN}" ] || \
       [ "${PROACTIVE_CANARY_AUTHORIZATION_SECRET}" = "${HA_TOKEN}" ]; then
        echo "proactive_canary_authorization_secret must be independent from auth_token and ha_token" >&2
        exit 1
    fi
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
    REMOTE_CLOUD_URL="${SA_REMOTE_CLOUD_URL:-https://cloud.tuojiayi.com}"
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
    REMOTE_CLOUD_URL="https://cloud.tuojiayi.com"
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
if [ -z "${ACTIVE_AI_MODE}" ] || [ "${ACTIVE_AI_MODE}" = "null" ]; then
    ACTIVE_AI_MODE="${SA_ACTIVE_AI_MODE:-shadow}"
fi
case "$(printf '%s' "${ACTIVE_AI_MODE}" | tr '[:upper:]' '[:lower:]')" in
    off|shadow|active|canary)
        ACTIVE_AI_MODE="$(printf '%s' "${ACTIVE_AI_MODE}" | tr '[:upper:]' '[:lower:]')"
        ;;
    *)
        ACTIVE_AI_MODE="shadow"
        ;;
esac
if [ -z "${ACTIVE_AI_CANARY_SPACE_IDS}" ] || [ "${ACTIVE_AI_CANARY_SPACE_IDS}" = "null" ]; then
    ACTIVE_AI_CANARY_SPACE_IDS="${SA_ACTIVE_AI_CANARY_SPACE_IDS:-}"
fi
if [ -z "${ACTIVE_AI_CANARY_DOMAINS}" ] || [ "${ACTIVE_AI_CANARY_DOMAINS}" = "null" ]; then
    ACTIVE_AI_CANARY_DOMAINS="${SA_ACTIVE_AI_CANARY_DOMAINS:-}"
fi
if [ -z "${ACTIVE_AI_CANARY_ENTITY_IDS}" ] || [ "${ACTIVE_AI_CANARY_ENTITY_IDS}" = "null" ]; then
    ACTIVE_AI_CANARY_ENTITY_IDS="${SA_ACTIVE_AI_CANARY_ENTITY_IDS:-}"
fi
if [ -z "${DOMAIN_REAL_EXECUTION_ENABLED}" ] || [ "${DOMAIN_REAL_EXECUTION_ENABLED}" = "null" ]; then
    DOMAIN_REAL_EXECUTION_ENABLED="${SA_DOMAIN_REAL_EXECUTION_ENABLED:-false}"
fi
case "$(printf '%s' "${DOMAIN_REAL_EXECUTION_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true|1|yes|on)
        DOMAIN_REAL_EXECUTION_ENABLED="true"
        ;;
    *)
        DOMAIN_REAL_EXECUTION_ENABLED="false"
        ;;
esac
if [ -z "${LIGHTING_CONTROLLED_EXECUTION_ENABLED}" ] || [ "${LIGHTING_CONTROLLED_EXECUTION_ENABLED}" = "null" ]; then
    LIGHTING_CONTROLLED_EXECUTION_ENABLED="${SA_LIGHTING_CONTROLLED_EXECUTION_ENABLED:-false}"
fi
case "$(printf '%s' "${LIGHTING_CONTROLLED_EXECUTION_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true|1|yes|on)
        LIGHTING_CONTROLLED_EXECUTION_ENABLED="true"
        ;;
    *)
        LIGHTING_CONTROLLED_EXECUTION_ENABLED="false"
        ;;
esac
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
if [ -z "${STEWARD_CHANNEL_ENABLED}" ] || [ "${STEWARD_CHANNEL_ENABLED}" = "null" ]; then
    STEWARD_CHANNEL_ENABLED="${SA_STEWARD_CHANNEL_ENABLED:-false}"
fi
case "$(printf '%s' "${STEWARD_CHANNEL_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true)
        STEWARD_CHANNEL_ENABLED="true"
        ;;
    false)
        STEWARD_CHANNEL_ENABLED="false"
        ;;
    *)
        echo "steward_channel_enabled must be true or false" >&2
        exit 1
        ;;
esac
if [ -z "${STEWARD_BASE_URL}" ] || [ "${STEWARD_BASE_URL}" = "null" ]; then
    STEWARD_BASE_URL="${SA_STEWARD_BASE_URL:-}"
fi
if [ -z "${STEWARD_DEVICE_DELEGATION_ENABLED}" ]; then
    STEWARD_DEVICE_DELEGATION_ENABLED="${SA_STEWARD_DEVICE_DELEGATION_ENABLED:-false}"
fi
if [ -z "${STEWARD_EVENTS_TOKEN}" ] || [ "${STEWARD_EVENTS_TOKEN}" = "null" ]; then
    STEWARD_EVENTS_TOKEN="${SA_STEWARD_EVENTS_TOKEN:-}"
fi
if [ -z "${STEWARD_HOUSEHOLD_ID}" ] || [ "${STEWARD_HOUSEHOLD_ID}" = "null" ]; then
    STEWARD_HOUSEHOLD_ID="${SA_STEWARD_HOUSEHOLD_ID:-}"
fi
if [ -z "${STEWARD_CHANNEL_TIMEOUT_SECONDS}" ] || [ "${STEWARD_CHANNEL_TIMEOUT_SECONDS}" = "null" ]; then
    STEWARD_CHANNEL_TIMEOUT_SECONDS="${SA_STEWARD_CHANNEL_TIMEOUT_SECONDS:-5}"
fi
case "${STEWARD_CHANNEL_TIMEOUT_SECONDS}" in
    *[!0-9]*|'')
        echo "steward_channel_timeout_seconds must be an integer between 1 and 30" >&2
        exit 1
        ;;
esac
if [ "${STEWARD_CHANNEL_TIMEOUT_SECONDS}" -lt 1 ] || [ "${STEWARD_CHANNEL_TIMEOUT_SECONDS}" -gt 30 ]; then
    echo "steward_channel_timeout_seconds must be an integer between 1 and 30" >&2
    exit 1
fi
if [ "${STEWARD_CHANNEL_ENABLED}" = "true" ]; then
    if [ -z "${STEWARD_BASE_URL}" ] || [ -z "${STEWARD_EVENTS_TOKEN}" ] || [ -z "${STEWARD_HOUSEHOLD_ID}" ]; then
        echo "enabled steward channel requires base_url, events_token, and household_id" >&2
        exit 1
    fi
    if [ "${#STEWARD_EVENTS_TOKEN}" -lt 16 ]; then
        echo "steward_events_token must contain at least 16 characters" >&2
        exit 1
    fi
    if [ "${STEWARD_EVENTS_TOKEN}" = "${AUTH_TOKEN}" ] || \
       [ "${STEWARD_EVENTS_TOKEN}" = "${HA_TOKEN}" ]; then
        echo "steward_events_token must be purpose-specific" >&2
        exit 1
    fi
fi
case "$(printf '%s' "${REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED="true"
        ;;
    *)
        REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED="false"
        ;;
esac
if [ -z "${OWNER_AUTONOMY_ENABLED}" ] || [ "${OWNER_AUTONOMY_ENABLED}" = "null" ]; then
    OWNER_AUTONOMY_ENABLED="${SA_OWNER_AUTONOMY_ENABLED:-false}"
fi
case "$(printf '%s' "${OWNER_AUTONOMY_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true)
        OWNER_AUTONOMY_ENABLED="true"
        ;;
    false)
        OWNER_AUTONOMY_ENABLED="false"
        ;;
    *)
        echo "owner_autonomy_enabled must be true or false" >&2
        exit 1
        ;;
esac
if [ -z "${OWNER_AUTONOMY_PRINCIPAL_ID}" ] || [ "${OWNER_AUTONOMY_PRINCIPAL_ID}" = "null" ]; then
    OWNER_AUTONOMY_PRINCIPAL_ID="${SA_OWNER_AUTONOMY_PRINCIPAL_ID:-}"
fi
if [ -z "${OWNER_AUTONOMY_ENVELOPE_ID}" ] || [ "${OWNER_AUTONOMY_ENVELOPE_ID}" = "null" ]; then
    OWNER_AUTONOMY_ENVELOPE_ID="${SA_OWNER_AUTONOMY_ENVELOPE_ID:-}"
fi
if [ -z "${OWNER_AUTONOMY_PUBLIC_KEY}" ] || [ "${OWNER_AUTONOMY_PUBLIC_KEY}" = "null" ]; then
    OWNER_AUTONOMY_PUBLIC_KEY="${SA_OWNER_AUTONOMY_PUBLIC_KEY:-}"
fi
if [ "${OWNER_AUTONOMY_ENABLED}" = "true" ]; then
    if [ -z "${OWNER_AUTONOMY_PRINCIPAL_ID}" ] || \
       [ -z "${OWNER_AUTONOMY_ENVELOPE_ID}" ] || \
       [ -z "${OWNER_AUTONOMY_PUBLIC_KEY}" ]; then
        echo "enabled owner autonomy requires principal_id, envelope_id, and Ed25519 public_key" >&2
        exit 1
    fi
fi
if [ -z "${OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED}" ] || [ "${OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED}" = "null" ]; then
    OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED="${SA_OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED:-false}"
fi
case "$(printf '%s' "${OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true|1|yes|on)
        OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED="true"
        ;;
    *)
        OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED="false"
        ;;
esac
if [ -z "${OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED}" ] || [ "${OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED}" = "null" ]; then
    OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED="${SA_OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED:-false}"
fi
case "$(printf '%s' "${OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    true|1|yes|on)
        OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED="true"
        ;;
    *)
        OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED="false"
        ;;
esac
if [ -z "${OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET}" ] || [ "${OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET}" = "null" ]; then
    OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET="${SA_OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET:-}"
fi
if [ -z "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" ] || [ "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" = "null" ]; then
    PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET="${SA_PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET:-}"
fi
if [ -n "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" ]; then
    if [ "${#PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" -lt 32 ]; then
        echo "proactive_verified_outcome_integrity_secret must contain at least 32 characters" >&2
        exit 1
    fi
    if [ "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" = "${AUTH_TOKEN}" ] || \
       [ "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" = "${HA_TOKEN}" ] || \
       [ "${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}" = "${OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET}" ]; then
        echo "proactive_verified_outcome_integrity_secret must be purpose-specific" >&2
        exit 1
    fi
fi
if [ -z "${REFRESH_REGISTRY_SOURCE_INGRESS_PORT}" ] || [ "${REFRESH_REGISTRY_SOURCE_INGRESS_PORT}" = "null" ]; then
    REFRESH_REGISTRY_SOURCE_INGRESS_PORT="${SA_REFRESH_REGISTRY_SOURCE_INGRESS_PORT:-18101}"
fi
for refresh_registry_value in \
    REFRESH_REGISTRY_SITE_ID REFRESH_REGISTRY_HA_INSTALLATION_DIGEST \
    REFRESH_REGISTRY_BRIDGE_CONFIG_ENTRY_ID REFRESH_REGISTRY_INGRESS_SECRET \
    REFRESH_REGISTRY_PREVIOUS_INGRESS_SECRET REFRESH_REGISTRY_ATTESTATION_SECRET \
    REFRESH_REGISTRY_PREVIOUS_ATTESTATION_SECRET REFRESH_REGISTRY_SOURCE_LEDGER_SECRET \
    REFRESH_REGISTRY_CATALOG_WRITER_SECRET REFRESH_REGISTRY_PREVIOUS_CATALOG_WRITER_SECRET
do
    eval "refresh_registry_current=\${${refresh_registry_value}}"
    if [ "${refresh_registry_current}" = "null" ]; then
        eval "${refresh_registry_value}=''"
    fi
done
case "$(printf '%s' "${OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] observation_refresh_evidence_ingress_enabled is invalid" >&2
        exit 1
        ;;
esac
for refresh_evidence_value in \
    OBSERVATION_REFRESH_EVIDENCE_INGRESS_SECRET \
    OBSERVATION_REFRESH_EVIDENCE_PREVIOUS_INGRESS_SECRET \
    OBSERVATION_REFRESH_EVIDENCE_WORLD_INTEGRITY_SECRET
do
    eval "refresh_evidence_current=\${${refresh_evidence_value}}"
    if [ "${refresh_evidence_current}" = "null" ]; then
        eval "${refresh_evidence_value}=''"
    fi
done
case "$(printf '%s' "${OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] observation_refresh_provider_runtime_enabled is invalid" >&2
        exit 1
        ;;
esac
for observation_refresh_provider_value in \
    OBSERVATION_REFRESH_PROVIDER_REQUEST_SECRET \
    OBSERVATION_REFRESH_PROVIDER_PREVIOUS_REQUEST_SECRET
do
    eval "observation_refresh_provider_current=\${${observation_refresh_provider_value}}"
    if [ "${observation_refresh_provider_current}" = "null" ]; then
        eval "${observation_refresh_provider_value}=''"
    fi
done
case "$(printf '%s' "${GOAL_SCHEDULE_CONTROLLER_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        GOAL_SCHEDULE_CONTROLLER_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        GOAL_SCHEDULE_CONTROLLER_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] goal_schedule_controller_enabled is invalid" >&2
        exit 1
        ;;
esac
if [ "${GOAL_SCHEDULE_SITE_ID}" = "null" ]; then
    GOAL_SCHEDULE_SITE_ID=""
fi
case "$(printf '%s' "${OUTPUT_LEDGER_INGRESS_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        OUTPUT_LEDGER_INGRESS_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        OUTPUT_LEDGER_INGRESS_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] output_ledger_ingress_enabled is invalid" >&2
        exit 78
        ;;
esac
if [ -z "${OUTPUT_LEDGER_INGRESS_PORT}" ] || [ "${OUTPUT_LEDGER_INGRESS_PORT}" = "null" ]; then
    OUTPUT_LEDGER_INGRESS_PORT="${SA_OUTPUT_LEDGER_INGRESS_PORT:-18103}"
fi
for output_ledger_value in \
    OUTPUT_LEDGER_HA_INSTALLATION_DIGEST \
    OUTPUT_LEDGER_BRIDGE_CONFIG_ENTRY_ID \
    OUTPUT_LEDGER_INGRESS_SECRET \
    OUTPUT_LEDGER_PREVIOUS_INGRESS_SECRET \
    OUTPUT_LEDGER_ATTESTATION_SECRET \
    OUTPUT_LEDGER_PREVIOUS_ATTESTATION_SECRET \
    OUTPUT_LEDGER_INTEGRITY_SECRET
do
    eval "output_ledger_current=\${${output_ledger_value}}"
    if [ "${output_ledger_current}" = "null" ]; then
        eval "${output_ledger_value}=''"
    fi
done
case "$(printf '%s' "${MAINTENANCE_CHANGE_INGRESS_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        MAINTENANCE_CHANGE_INGRESS_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        MAINTENANCE_CHANGE_INGRESS_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] maintenance_change_ingress_enabled is invalid" >&2
        exit 78
        ;;
esac
if [ -z "${MAINTENANCE_CHANGE_INGRESS_PORT}" ] || [ "${MAINTENANCE_CHANGE_INGRESS_PORT}" = "null" ]; then
    MAINTENANCE_CHANGE_INGRESS_PORT="${SA_MAINTENANCE_CHANGE_INGRESS_PORT:-18104}"
fi
for maintenance_change_value in \
    MAINTENANCE_CHANGE_HA_INSTALLATION_DIGEST \
    MAINTENANCE_CHANGE_BRIDGE_CONFIG_ENTRY_ID \
    MAINTENANCE_CHANGE_INGRESS_SECRET \
    MAINTENANCE_CHANGE_PREVIOUS_INGRESS_SECRET \
    MAINTENANCE_DELEGATION_ATTESTATION_SECRET \
    MAINTENANCE_DELEGATION_PREVIOUS_ATTESTATION_SECRET \
    MAINTENANCE_CHANGE_LEDGER_INTEGRITY_SECRET
do
    eval "maintenance_change_current=\${${maintenance_change_value}}"
    if [ "${maintenance_change_current}" = "null" ]; then
        eval "${maintenance_change_value}=''"
    fi
done
case "$(printf '%s' "${FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED="true"
        ;;
    *)
        FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED="false"
        ;;
esac
if [ -z "${FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT}" ] || [ "${FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT}" = "null" ]; then
    FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT="${SA_FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT:-18102}"
fi
for field_canary_operator_value in \
    FIELD_CANARY_OPERATOR_HA_INSTALLATION_DIGEST \
    FIELD_CANARY_OPERATOR_BRIDGE_CONFIG_ENTRY_ID \
    FIELD_CANARY_OPERATOR_INGRESS_SECRET \
    FIELD_CANARY_OPERATOR_PREVIOUS_INGRESS_SECRET \
    FIELD_CANARY_OPERATOR_ATTESTATION_SECRET \
    FIELD_CANARY_OPERATOR_PREVIOUS_ATTESTATION_SECRET \
    FIELD_CANARY_OPERATOR_CHALLENGE_LEDGER_SECRET \
    FIELD_CANARY_OPERATOR_IDENTITY_LEDGER_SECRET \
    FIELD_CANARY_OPERATOR_APPROVAL_LEDGER_SECRET
do
    eval "field_canary_operator_current=\${${field_canary_operator_value}}"
    if [ "${field_canary_operator_current}" = "null" ]; then
        eval "${field_canary_operator_value}=''"
    fi
done
case "$(printf '%s' "${FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on)
        FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED="true"
        ;;
    ""|0|false|no|off|null)
        FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED="false"
        ;;
    *)
        echo "[SmartAgent] field_canary_governance_runtime_enabled is invalid" >&2
        exit 78
        ;;
esac
for field_canary_governance_value in \
    FIELD_CANARY_AUTHORITY_ISSUER_SECRET \
    FIELD_CANARY_ISSUER_POLICY_SECRET \
    FIELD_CANARY_AUTHORITY_LEDGER_SECRET \
    FIELD_CANARY_AUTHORITY_SNAPSHOT_SECRET \
    FIELD_CANARY_MATERIALIZER_SECRET \
    FIELD_CANARY_GRANT_PROPOSAL_SECRET \
    FIELD_CANARY_GRANT_SECRET \
    FIELD_CANARY_GRANT_REVOCATION_PROPOSAL_SECRET \
    FIELD_CANARY_GRANT_REVOCATION_RECEIPT_SECRET \
    FIELD_CANARY_GRANT_USE_SECRET \
    FIELD_CANARY_DISPATCH_PRECONDITION_SECRET \
    FIELD_CANARY_DISPATCH_PERMIT_SECRET \
    FIELD_CANARY_PROOF_ISSUANCE_SECRET \
    FIELD_CANARY_HOST_DISPATCH_PROOF_SECRET
do
    eval "field_canary_governance_current=\${${field_canary_governance_value}}"
    if [ "${field_canary_governance_current}" = "null" ]; then
        eval "${field_canary_governance_value}=''"
    fi
done
export SA_HA_URL="${HA_URL}"
export SA_HA_TOKEN="${HA_TOKEN}"
export SA_AUTH_TOKEN="${AUTH_TOKEN}"
export SA_PROACTIVE_CANARY_AUTHORIZATION_SECRET="${PROACTIVE_CANARY_AUTHORIZATION_SECRET}"
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
export SA_ACTIVE_AI_MODE="${ACTIVE_AI_MODE}"
export SA_ACTIVE_AI_CANARY_SPACE_IDS="${ACTIVE_AI_CANARY_SPACE_IDS}"
export SA_ACTIVE_AI_CANARY_DOMAINS="${ACTIVE_AI_CANARY_DOMAINS}"
export SA_ACTIVE_AI_CANARY_ENTITY_IDS="${ACTIVE_AI_CANARY_ENTITY_IDS}"
export SA_DOMAIN_REAL_EXECUTION_ENABLED="${DOMAIN_REAL_EXECUTION_ENABLED}"
export SA_LIGHTING_CONTROLLED_EXECUTION_ENABLED="${LIGHTING_CONTROLLED_EXECUTION_ENABLED}"
export SA_OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED="${OPERATIONS_PROVIDER_READBACK_SOURCE_ENABLED}"
export SA_OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED="${OPERATIONS_PROVIDER_READBACK_RUNTIME_ENABLED}"
export SA_OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET="${OPERATIONS_PROVIDER_READBACK_LEDGER_SECRET}"
export SA_PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET="${PROACTIVE_VERIFIED_OUTCOME_INTEGRITY_SECRET}"
export SA_OWNER_AUTONOMY_ENABLED="${OWNER_AUTONOMY_ENABLED}"
export SA_OWNER_AUTONOMY_PRINCIPAL_ID="${OWNER_AUTONOMY_PRINCIPAL_ID}"
export SA_OWNER_AUTONOMY_ENVELOPE_ID="${OWNER_AUTONOMY_ENVELOPE_ID}"
export SA_OWNER_AUTONOMY_PUBLIC_KEY="${OWNER_AUTONOMY_PUBLIC_KEY}"
export SA_PRESENCE_PROBABILISTIC_MODE="${PRESENCE_PROBABILISTIC_MODE}"
export SA_PRESENCE_PROBABILISTIC_HARD_OFF="${PRESENCE_PROBABILISTIC_HARD_OFF}"
export SA_FIRMWARE_MAINTENANCE_WIFI_SSID="${FIRMWARE_MAINTENANCE_WIFI_SSID}"
export SA_FIRMWARE_MAINTENANCE_WIFI_PASSWORD="${FIRMWARE_MAINTENANCE_WIFI_PASSWORD}"
export SA_STEWARD_CHANNEL_ENABLED="${STEWARD_CHANNEL_ENABLED}"
export SA_STEWARD_BASE_URL="${STEWARD_BASE_URL}"
export SA_STEWARD_DEVICE_DELEGATION_ENABLED="${STEWARD_DEVICE_DELEGATION_ENABLED}"
export SA_STEWARD_EVENTS_TOKEN="${STEWARD_EVENTS_TOKEN}"
export SA_STEWARD_HOUSEHOLD_ID="${STEWARD_HOUSEHOLD_ID}"
export SA_STEWARD_CHANNEL_TIMEOUT_SECONDS="${STEWARD_CHANNEL_TIMEOUT_SECONDS}"
export SA_REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED="${REFRESH_REGISTRY_SOURCE_INGRESS_ENABLED}"
export SA_REFRESH_REGISTRY_SOURCE_INGRESS_PORT="${REFRESH_REGISTRY_SOURCE_INGRESS_PORT}"
export SA_OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED="${OBSERVATION_REFRESH_PROVIDER_RUNTIME_ENABLED}"
export SA_OBSERVATION_REFRESH_PROVIDER_REQUEST_SECRET="${OBSERVATION_REFRESH_PROVIDER_REQUEST_SECRET}"
export SA_OBSERVATION_REFRESH_PROVIDER_PREVIOUS_REQUEST_SECRET="${OBSERVATION_REFRESH_PROVIDER_PREVIOUS_REQUEST_SECRET}"
export SA_GOAL_SCHEDULE_CONTROLLER_ENABLED="${GOAL_SCHEDULE_CONTROLLER_ENABLED}"
export SA_GOAL_SCHEDULE_SITE_ID="${GOAL_SCHEDULE_SITE_ID}"
export SA_GOAL_SCHEDULE_INTERVAL_SECONDS="${GOAL_SCHEDULE_INTERVAL_SECONDS}"
export SA_GOAL_SCHEDULE_RECOVERY_WINDOW_SECONDS="${GOAL_SCHEDULE_RECOVERY_WINDOW_SECONDS}"
export SA_GOAL_SCHEDULE_LOOKAHEAD_SECONDS="${GOAL_SCHEDULE_LOOKAHEAD_SECONDS}"
export SA_GOAL_SCHEDULE_MAX_WINDOW_DAYS="${GOAL_SCHEDULE_MAX_WINDOW_DAYS}"
export SA_REFRESH_REGISTRY_SITE_ID="${REFRESH_REGISTRY_SITE_ID}"
export SA_REFRESH_REGISTRY_HA_INSTALLATION_DIGEST="${REFRESH_REGISTRY_HA_INSTALLATION_DIGEST}"
export SA_REFRESH_REGISTRY_BRIDGE_CONFIG_ENTRY_ID="${REFRESH_REGISTRY_BRIDGE_CONFIG_ENTRY_ID}"
export SA_REFRESH_REGISTRY_INGRESS_SECRET="${REFRESH_REGISTRY_INGRESS_SECRET}"
export SA_REFRESH_REGISTRY_PREVIOUS_INGRESS_SECRET="${REFRESH_REGISTRY_PREVIOUS_INGRESS_SECRET}"
export SA_REFRESH_REGISTRY_ATTESTATION_SECRET="${REFRESH_REGISTRY_ATTESTATION_SECRET}"
export SA_REFRESH_REGISTRY_PREVIOUS_ATTESTATION_SECRET="${REFRESH_REGISTRY_PREVIOUS_ATTESTATION_SECRET}"
export SA_REFRESH_REGISTRY_SOURCE_LEDGER_SECRET="${REFRESH_REGISTRY_SOURCE_LEDGER_SECRET}"
export SA_REFRESH_REGISTRY_CATALOG_WRITER_SECRET="${REFRESH_REGISTRY_CATALOG_WRITER_SECRET}"
export SA_REFRESH_REGISTRY_PREVIOUS_CATALOG_WRITER_SECRET="${REFRESH_REGISTRY_PREVIOUS_CATALOG_WRITER_SECRET}"
export SA_OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED="${OBSERVATION_REFRESH_EVIDENCE_INGRESS_ENABLED}"
export SA_OBSERVATION_REFRESH_EVIDENCE_INGRESS_SECRET="${OBSERVATION_REFRESH_EVIDENCE_INGRESS_SECRET}"
export SA_OBSERVATION_REFRESH_EVIDENCE_PREVIOUS_INGRESS_SECRET="${OBSERVATION_REFRESH_EVIDENCE_PREVIOUS_INGRESS_SECRET}"
export SA_OBSERVATION_REFRESH_EVIDENCE_WORLD_INTEGRITY_SECRET="${OBSERVATION_REFRESH_EVIDENCE_WORLD_INTEGRITY_SECRET}"
export SA_OUTPUT_LEDGER_INGRESS_ENABLED="${OUTPUT_LEDGER_INGRESS_ENABLED}"
export SA_OUTPUT_LEDGER_INGRESS_PORT="${OUTPUT_LEDGER_INGRESS_PORT}"
export SA_OUTPUT_LEDGER_HA_INSTALLATION_DIGEST="${OUTPUT_LEDGER_HA_INSTALLATION_DIGEST}"
export SA_OUTPUT_LEDGER_BRIDGE_CONFIG_ENTRY_ID="${OUTPUT_LEDGER_BRIDGE_CONFIG_ENTRY_ID}"
export SA_OUTPUT_LEDGER_INGRESS_SECRET="${OUTPUT_LEDGER_INGRESS_SECRET}"
export SA_OUTPUT_LEDGER_PREVIOUS_INGRESS_SECRET="${OUTPUT_LEDGER_PREVIOUS_INGRESS_SECRET}"
export SA_OUTPUT_LEDGER_ATTESTATION_SECRET="${OUTPUT_LEDGER_ATTESTATION_SECRET}"
export SA_OUTPUT_LEDGER_PREVIOUS_ATTESTATION_SECRET="${OUTPUT_LEDGER_PREVIOUS_ATTESTATION_SECRET}"
export SA_OUTPUT_LEDGER_INTEGRITY_SECRET="${OUTPUT_LEDGER_INTEGRITY_SECRET}"
export SA_MAINTENANCE_CHANGE_INGRESS_ENABLED="${MAINTENANCE_CHANGE_INGRESS_ENABLED}"
export SA_MAINTENANCE_CHANGE_INGRESS_PORT="${MAINTENANCE_CHANGE_INGRESS_PORT}"
export SA_MAINTENANCE_CHANGE_HA_INSTALLATION_DIGEST="${MAINTENANCE_CHANGE_HA_INSTALLATION_DIGEST}"
export SA_MAINTENANCE_CHANGE_BRIDGE_CONFIG_ENTRY_ID="${MAINTENANCE_CHANGE_BRIDGE_CONFIG_ENTRY_ID}"
export SA_MAINTENANCE_CHANGE_INGRESS_SECRET="${MAINTENANCE_CHANGE_INGRESS_SECRET}"
export SA_MAINTENANCE_CHANGE_PREVIOUS_INGRESS_SECRET="${MAINTENANCE_CHANGE_PREVIOUS_INGRESS_SECRET}"
export SA_MAINTENANCE_DELEGATION_ATTESTATION_SECRET="${MAINTENANCE_DELEGATION_ATTESTATION_SECRET}"
export SA_MAINTENANCE_DELEGATION_PREVIOUS_ATTESTATION_SECRET="${MAINTENANCE_DELEGATION_PREVIOUS_ATTESTATION_SECRET}"
export SA_MAINTENANCE_CHANGE_LEDGER_INTEGRITY_SECRET="${MAINTENANCE_CHANGE_LEDGER_INTEGRITY_SECRET}"
export SA_FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED="${FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_ENABLED}"
export SA_FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT="${FIELD_CANARY_OPERATOR_IDENTITY_INGRESS_PORT}"
export SA_FIELD_CANARY_OPERATOR_HA_INSTALLATION_DIGEST="${FIELD_CANARY_OPERATOR_HA_INSTALLATION_DIGEST}"
export SA_FIELD_CANARY_OPERATOR_BRIDGE_CONFIG_ENTRY_ID="${FIELD_CANARY_OPERATOR_BRIDGE_CONFIG_ENTRY_ID}"
export SA_FIELD_CANARY_OPERATOR_INGRESS_SECRET="${FIELD_CANARY_OPERATOR_INGRESS_SECRET}"
export SA_FIELD_CANARY_OPERATOR_PREVIOUS_INGRESS_SECRET="${FIELD_CANARY_OPERATOR_PREVIOUS_INGRESS_SECRET}"
export SA_FIELD_CANARY_OPERATOR_ATTESTATION_SECRET="${FIELD_CANARY_OPERATOR_ATTESTATION_SECRET}"
export SA_FIELD_CANARY_OPERATOR_PREVIOUS_ATTESTATION_SECRET="${FIELD_CANARY_OPERATOR_PREVIOUS_ATTESTATION_SECRET}"
export SA_FIELD_CANARY_OPERATOR_CHALLENGE_LEDGER_SECRET="${FIELD_CANARY_OPERATOR_CHALLENGE_LEDGER_SECRET}"
export SA_FIELD_CANARY_OPERATOR_IDENTITY_LEDGER_SECRET="${FIELD_CANARY_OPERATOR_IDENTITY_LEDGER_SECRET}"
export SA_FIELD_CANARY_OPERATOR_APPROVAL_LEDGER_SECRET="${FIELD_CANARY_OPERATOR_APPROVAL_LEDGER_SECRET}"
export SA_FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED="${FIELD_CANARY_GOVERNANCE_RUNTIME_ENABLED}"
export SA_FIELD_CANARY_AUTHORITY_ISSUER_SECRET="${FIELD_CANARY_AUTHORITY_ISSUER_SECRET}"
export SA_FIELD_CANARY_ISSUER_POLICY_SECRET="${FIELD_CANARY_ISSUER_POLICY_SECRET}"
export SA_FIELD_CANARY_AUTHORITY_LEDGER_SECRET="${FIELD_CANARY_AUTHORITY_LEDGER_SECRET}"
export SA_FIELD_CANARY_AUTHORITY_SNAPSHOT_SECRET="${FIELD_CANARY_AUTHORITY_SNAPSHOT_SECRET}"
export SA_FIELD_CANARY_MATERIALIZER_SECRET="${FIELD_CANARY_MATERIALIZER_SECRET}"
export SA_FIELD_CANARY_GRANT_PROPOSAL_SECRET="${FIELD_CANARY_GRANT_PROPOSAL_SECRET}"
export SA_FIELD_CANARY_GRANT_SECRET="${FIELD_CANARY_GRANT_SECRET}"
export SA_FIELD_CANARY_GRANT_REVOCATION_PROPOSAL_SECRET="${FIELD_CANARY_GRANT_REVOCATION_PROPOSAL_SECRET}"
export SA_FIELD_CANARY_GRANT_REVOCATION_RECEIPT_SECRET="${FIELD_CANARY_GRANT_REVOCATION_RECEIPT_SECRET}"
export SA_FIELD_CANARY_GRANT_USE_SECRET="${FIELD_CANARY_GRANT_USE_SECRET}"
export SA_FIELD_CANARY_DISPATCH_PRECONDITION_SECRET="${FIELD_CANARY_DISPATCH_PRECONDITION_SECRET}"
export SA_FIELD_CANARY_DISPATCH_PERMIT_SECRET="${FIELD_CANARY_DISPATCH_PERMIT_SECRET}"
export SA_FIELD_CANARY_PROOF_ISSUANCE_SECRET="${FIELD_CANARY_PROOF_ISSUANCE_SECRET}"
export SA_FIELD_CANARY_HOST_DISPATCH_PROOF_SECRET="${FIELD_CANARY_HOST_DISPATCH_PROOF_SECRET}"

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
