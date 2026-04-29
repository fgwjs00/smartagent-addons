"""
SmartAgent Add-on 内部 API 服务。

职责：
1) 承接 /infer 推理调用（本地 core.inference_engine）
2) 提供 Add-on 运行态与诊断
3) 作为最小 Gateway 代理层，转发高频核心 API 到 HA /api/v1/*

统一约定：
- 受保护端点统一走内部令牌鉴权（X-SA-Token 或 Authorization Bearer）
- 错误响应统一结构：{"ok": false, "error", "error_type", "retryable"}
- /diagnostics 返回依赖链路健康信息与契约清单
"""
from __future__ import annotations

import asyncio
import ipaddress
import json
import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import aiohttp
from aiohttp import web

_LOGGER = logging.getLogger("smartagent.addon")
logging.basicConfig(level=os.getenv("SA_LOG_LEVEL", "INFO"))

_SA_AUTH_TOKEN: str = os.getenv("SA_AUTH_TOKEN", "").strip()
_SA_EMPTY_AUTH_ALLOW_CIDRS: str = os.getenv(
    "SA_EMPTY_AUTH_ALLOW_CIDRS",
    "127.0.0.0/8,::1/128,172.16.0.0/12",
).strip()
_SA_HA_URL: str = os.getenv("SA_HA_URL", "http://supervisor/core").strip().rstrip("/")
_SA_HA_TOKEN: str = os.getenv("SA_HA_TOKEN", os.getenv("SUPERVISOR_TOKEN", "")).strip()
_SA_UI_ROOT: str = os.getenv("SA_UI_ROOT", "/app/ui").strip() or "/app/ui"
_SA_SCREEN_ROOT: str = os.getenv("SA_SCREEN_ROOT", "/app/screen").strip() or "/app/screen"
_SA_GATEWAY_UI_PORT: str = os.getenv("SA_GATEWAY_UI_PORT", "8234").strip()
_SA_DB_PATH: str = os.getenv("SA_DB_PATH", "/data/smart_agent_memory.db").strip() or "/data/smart_agent_memory.db"
_SA_CORE_STORAGE_MODE: str = os.getenv("SA_CORE_STORAGE_MODE", "bridge").strip().lower() or "bridge"

_PROXY_TIMEOUT = aiohttp.ClientTimeout(total=20)
_INFER_TIMEOUT = aiohttp.ClientTimeout(total=95)

_ERROR_TYPE_BY_STATUS: dict[int, str] = {
    400: "bad_request",
    401: "auth_failed",
    403: "auth_failed",
    404: "not_found",
    405: "method_not_allowed",
    409: "conflict",
    422: "unprocessable_entity",
    429: "rate_limited",
    500: "internal_error",
    502: "dependency_unreachable",
    503: "service_unavailable",
    504: "timeout",
}

# 统计信息
_infer_count_today: int = 0
_infer_date: str = ""
_last_infer_error: str = ""
_last_infer_error_at: str = ""
_proxy_count: int = 0
_proxy_error_count: int = 0
_proxy_status_counts: dict[str, int] = {}
_last_proxy_error: str = ""
_last_proxy_error_at: str = ""
_bridge_fallback_count: int = 0
_bridge_fallback_status_counts: dict[str, int] = {}
_SYSTEM_CPU_SNAPSHOT: tuple[int, int] | None = None
_LOCAL_DB: Any | None = None

# Batch5 收口后不再保留 root-base logs/export 兼容路径。


def _addon_root() -> Path:
    return Path(__file__).resolve().parent


def _ensure_local_import_root() -> None:
    root = str(_addon_root())
    if root not in sys.path:
        sys.path.insert(0, root)


def _core_storage_enabled() -> bool:
    return _SA_CORE_STORAGE_MODE in {"1", "true", "yes", "on", "local", "local_first"}


def _core_storage_strict() -> bool:
    return _SA_CORE_STORAGE_MODE == "local"


def _local_db_path() -> Path:
    path = Path(_SA_DB_PATH).expanduser()
    if not path.is_absolute():
        path = _addon_root() / path
    return path


def _get_local_db() -> Any:
    global _LOCAL_DB
    if _LOCAL_DB is not None:
        return _LOCAL_DB

    _ensure_local_import_root()
    from core.storage import DatabaseService, init_schema  # type: ignore[import]

    db_path = _local_db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)
    db = DatabaseService(str(db_path))
    db.open()
    init_schema(db)
    _LOCAL_DB = db
    return db


def _clamp_percent(value: Any) -> float:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return 0.0
    if numeric != numeric or numeric < 0:
        return 0.0
    if numeric > 100:
        return 100.0
    return round(numeric, 1)


def _read_proc_cpu_snapshot() -> tuple[int, int] | None:
    try:
        with open("/proc/stat", "r", encoding="utf-8") as fp:
            line = fp.readline()
    except OSError:
        return None

    parts = line.split()
    if not parts or parts[0] != "cpu":
        return None
    try:
        values = [int(item) for item in parts[1:]]
    except ValueError:
        return None
    if len(values) < 4:
        return None

    idle = values[3] + (values[4] if len(values) > 4 else 0)
    return sum(values), idle


def _cpu_percent_between(before: tuple[int, int], after: tuple[int, int]) -> float | None:
    total_delta = after[0] - before[0]
    idle_delta = after[1] - before[1]
    if total_delta <= 0 or idle_delta < 0:
        return None
    busy_delta = max(0, total_delta - idle_delta)
    return _clamp_percent((busy_delta * 100.0) / total_delta)


def _read_proc_cpu_percent() -> float | None:
    global _SYSTEM_CPU_SNAPSHOT

    current = _read_proc_cpu_snapshot()
    if current is None:
        return None

    previous = _SYSTEM_CPU_SNAPSHOT
    if previous is None:
        time.sleep(0.05)
        sampled = _read_proc_cpu_snapshot()
        _SYSTEM_CPU_SNAPSHOT = sampled or current
        if sampled is None:
            return None
        return _cpu_percent_between(current, sampled)

    _SYSTEM_CPU_SNAPSHOT = current
    return _cpu_percent_between(previous, current)


def _read_proc_memory_percent() -> float | None:
    fields: dict[str, float] = {}
    try:
        with open("/proc/meminfo", "r", encoding="utf-8") as fp:
            for line in fp:
                if ":" not in line:
                    continue
                key, raw_value = line.split(":", 1)
                parts = raw_value.strip().split()
                if not parts:
                    continue
                try:
                    fields[key] = float(parts[0])
                except ValueError:
                    continue
    except OSError:
        return None

    total = fields.get("MemTotal", 0.0)
    available = fields.get("MemAvailable")
    if available is None:
        available = fields.get("MemFree", 0.0) + fields.get("Buffers", 0.0) + fields.get("Cached", 0.0)
    if total <= 0 or available is None:
        return None
    return _clamp_percent(((total - available) * 100.0) / total)


def _collect_system_resource_metrics() -> dict[str, Any]:
    cpu: float | None = None
    memory: float | None = None
    source = "unavailable"

    try:
        import psutil  # type: ignore[import-not-found]

        cpu = _clamp_percent(psutil.cpu_percent(interval=0.05))
        memory = _clamp_percent(psutil.virtual_memory().percent)
        source = "psutil"
    except Exception:
        cpu = _read_proc_cpu_percent()
        memory = _read_proc_memory_percent()
        if cpu is not None or memory is not None:
            source = "procfs"

    return {
        "cpu": cpu if cpu is not None else 0.0,
        "memory": memory if memory is not None else 0.0,
        "resource_metrics": {
            "source": source,
            "cpu_available": cpu is not None,
            "memory_available": memory is not None,
            "sampled_at": datetime.now().isoformat(),
        },
    }


def _has_meaningful_resource_metric(value: Any) -> bool:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return False
    return 0 < numeric <= 100


def _env_flag(name: str, default: bool = True) -> bool:
    raw = str(os.getenv(name, "1" if default else "0") or "").strip().lower()
    if raw in {"1", "true", "yes", "on"}:
        return True
    if raw in {"0", "false", "no", "off"}:
        return False
    return bool(default)


def _env_csv_set(name: str) -> set[str]:
    raw = str(os.getenv(name, "") or "")
    items = [item.strip().lower() for item in raw.split(",")]
    return {item for item in items if item}


_LEGACY_DRYOFF_ENABLED = _env_flag("SA_LEGACY_DRYOFF_ENABLED", False)
_LEGACY_DRYOFF_TARGETS = _env_csv_set("SA_LEGACY_DRYOFF_TARGETS")
_LEGACY_DRYOFF_SUPPORTED_TARGETS: set[str] = {
    "ai_scene_snake_write",
}
_LEGACY_DRYOFF_DEFAULT_TARGETS: set[str] = set(_LEGACY_DRYOFF_SUPPORTED_TARGETS)
_LEGACY_DRYOFF_SESSION_BOOT_TS = float(time.time())


def _env_int(name: str, default: int) -> int:
    try:
        return int(str(os.getenv(name, str(default)) or str(default)))
    except ValueError:
        return int(default)


def _parse_iso_timestamp(raw: str) -> float | None:
    text = str(raw or "").strip()
    if not text:
        return None
    normalized = text.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(normalized)
    except ValueError:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc).timestamp()
    return dt.timestamp()


_LEGACY_DRYOFF_SESSION_ENABLED = _env_flag("SA_LEGACY_DRYOFF_SESSION_ENABLED", False)
_LEGACY_DRYOFF_SESSION_DURATION_RAW = str(os.getenv("SA_LEGACY_DRYOFF_SESSION_DURATION_SECONDS", "") or "").strip()
_LEGACY_DRYOFF_SESSION_DURATION_SECONDS = max(
    1,
    _env_int("SA_LEGACY_DRYOFF_SESSION_DURATION_SECONDS", 900),
)
_LEGACY_DRYOFF_SESSION_PRESET = "15m_default" if not _LEGACY_DRYOFF_SESSION_DURATION_RAW else "custom"
_LEGACY_DRYOFF_SESSION_START_AT_TS = _parse_iso_timestamp(
    str(os.getenv("SA_LEGACY_DRYOFF_SESSION_START_AT", "") or "")
)
if _LEGACY_DRYOFF_SESSION_START_AT_TS is None:
    _LEGACY_DRYOFF_SESSION_START_AT_TS = _LEGACY_DRYOFF_SESSION_BOOT_TS

try:
    _LEGACY_DRYOFF_GUARD_WINDOW_SECONDS = max(
        60,
        int(str(os.getenv("SA_LEGACY_DRYOFF_GUARD_WINDOW_SECONDS", "300") or "300")),
    )
except ValueError:
    _LEGACY_DRYOFF_GUARD_WINDOW_SECONDS = 300
try:
    _LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD = max(
        1,
        int(str(os.getenv("SA_LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD", "10") or "10")),
    )
except ValueError:
    _LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD = 10
try:
    _LEGACY_DRYOFF_GUARD_BYPASS_SECONDS = max(
        60,
        int(str(os.getenv("SA_LEGACY_DRYOFF_GUARD_BYPASS_SECONDS", "600") or "600")),
    )
except ValueError:
    _LEGACY_DRYOFF_GUARD_BYPASS_SECONDS = 600
try:
    _LEGACY_ROUTE_WARN_THRESHOLD = max(1, int(str(os.getenv("SA_LEGACY_ROUTE_WARN_THRESHOLD", "50") or "50")))
except ValueError:
    _LEGACY_ROUTE_WARN_THRESHOLD = 50
try:
    _LEGACY_ROUTE_NOISY_MULTIPLIER = max(
        2,
        int(str(os.getenv("SA_LEGACY_ROUTE_NOISY_MULTIPLIER", "3") or "3")),
    )
except ValueError:
    _LEGACY_ROUTE_NOISY_MULTIPLIER = 3
try:
    _LEGACY_ROUTE_EVENT_MAX_PER_ROUTE = max(
        100,
        int(str(os.getenv("SA_LEGACY_ROUTE_EVENT_MAX_PER_ROUTE", "5000") or "5000")),
    )
except ValueError:
    _LEGACY_ROUTE_EVENT_MAX_PER_ROUTE = 5000
_LEGACY_ROUTE_24H_SECONDS = 24 * 60 * 60
_LEGACY_ROUTE_7D_SECONDS = 7 * _LEGACY_ROUTE_24H_SECONDS

_legacy_dryoff_block_count: int = 0
_legacy_dryoff_block_events: list[float] = []
_legacy_dryoff_last_block_at: str = ""
_legacy_dryoff_last_hit_path: str = ""
_legacy_dryoff_last_target: str = ""


def _calc_compat_risk_level(*, any_exceeded: bool, noisy_routes_count: int, hits_24h_total: int, warn_threshold: int) -> str:
    high_hits_threshold = max(1, int(warn_threshold or 1)) * 8
    medium_hits_threshold = max(1, int(warn_threshold or 1)) * 3
    if any_exceeded or noisy_routes_count >= 3 or hits_24h_total >= high_hits_threshold:
        return "high"
    if noisy_routes_count >= 1 or hits_24h_total >= medium_hits_threshold:
        return "medium"
    return "low"


def _build_deprecation_readiness_payload() -> dict[str, Any]:
    stats = _build_legacy_compat_stats_payload()
    routes = stats.get("routes") if isinstance(stats.get("routes"), dict) else {}

    grouped: dict[str, list[dict[str, Any]]] = {
        "deprecate_ready": [],
        "observe": [],
        "blocked": [],
    }

    for path, route_info in routes.items():
        if not isinstance(route_info, dict):
            continue
        item = {
            "path": str(path or ""),
            "route": str(path or ""),
            "route_type": str(route_info.get("route_type") or "unknown"),
            "risk": str(route_info.get("risk") or "low"),
            "hits_24h": int(route_info.get("hits_24h", 0) or 0),
            "hits_7d": int(route_info.get("hits_7d", 0) or 0),
            "reason": str(route_info.get("reason") or ""),
            "candidate_deprecate": bool(route_info.get("candidate_deprecate", False)),
            "readiness_status": str(route_info.get("readiness_status") or "observe"),
        }
        readiness_status = item["readiness_status"]
        if readiness_status not in grouped:
            readiness_status = "observe"
            item["readiness_status"] = readiness_status
        grouped[readiness_status].append(item)

    for key in grouped:
        grouped[key].sort(key=lambda x: (x["risk"], x["hits_7d"], x["path"]))

    return {
        "ok": True,
        "deprecate_ready": grouped["deprecate_ready"],
        "observe": grouped["observe"],
        "blocked": grouped["blocked"],
        "summary": {
            "route_count": int(stats.get("route_count", 0) or 0),
            "hits_24h_total": int(stats.get("hits_24h_total", 0) or 0),
            "hits_7d_total": int(stats.get("hits_7d_total", 0) or 0),
            "compat_risk_level": _build_compat_summary_payload().get("compat_risk_level", "low"),
        },
    }


def _legacy_rollout_switches_payload() -> dict[str, Any]:
    return {
        "default_mode": "compatible",
    }


def _build_legacy_rollout_and_dryoff_payload() -> dict[str, Any]:
    payload = _legacy_rollout_switches_payload()
    payload.update(_legacy_dryoff_status_payload())
    if _legacy_dryoff_last_block_at:
        payload["dryoff_last_block_at"] = _legacy_dryoff_last_block_at
    if _legacy_dryoff_last_hit_path:
        payload["dryoff_last_hit_path"] = _legacy_dryoff_last_hit_path
    if _legacy_dryoff_last_target:
        payload["dryoff_last_target"] = _legacy_dryoff_last_target
    return payload


def _legacy_dryoff_active_targets() -> set[str]:
    configured = {
        tag for tag in _LEGACY_DRYOFF_TARGETS if tag in _LEGACY_DRYOFF_SUPPORTED_TARGETS
    }
    if configured:
        return configured
    if _LEGACY_DRYOFF_ENABLED or _LEGACY_DRYOFF_SESSION_ENABLED:
        return {
            tag for tag in _LEGACY_DRYOFF_DEFAULT_TARGETS if tag in _LEGACY_DRYOFF_SUPPORTED_TARGETS
        }
    return set()


def _legacy_dryoff_session_snapshot() -> dict[str, Any]:
    global _legacy_dryoff_block_count, _legacy_dryoff_last_block_at
    now_ts = time.time()

    start_ts = float(_LEGACY_DRYOFF_SESSION_START_AT_TS or _LEGACY_DRYOFF_SESSION_BOOT_TS)
    duration = int(max(1, _LEGACY_DRYOFF_SESSION_DURATION_SECONDS))
    end_ts = start_ts + duration

    session_enabled = bool(_LEGACY_DRYOFF_SESSION_ENABLED)
    session_active = bool(session_enabled and start_ts <= now_ts <= end_ts)
    if session_active:
        remaining = max(0, int(end_ts - now_ts))
    else:
        remaining = 0

    if session_enabled:
        session_block_count = int(_legacy_dryoff_block_count or 0)
        session_last_block_at = _legacy_dryoff_last_block_at or None
    else:
        session_block_count = 0
        session_last_block_at = None

    return {
        "session_enabled": session_enabled,
        "session_active": session_active,
        "session_preset": _LEGACY_DRYOFF_SESSION_PRESET,
        "session_duration_seconds": int(duration),
        "session_start_at": datetime.fromtimestamp(start_ts).isoformat(),
        "session_end_at": datetime.fromtimestamp(end_ts).isoformat(),
        "session_remaining_seconds": int(remaining),
        "session_block_count": int(session_block_count),
        "session_last_block_at": session_last_block_at,
        "block_count": int(session_block_count),
    }


def _legacy_dryoff_is_effective() -> bool:
    if bool(_LEGACY_DRYOFF_ENABLED):
        return True
    session = _legacy_dryoff_session_snapshot()
    return bool(session.get("session_active", False))


def _legacy_dryoff_record_session_block() -> None:
    global _legacy_dryoff_block_count
    if not _LEGACY_DRYOFF_SESSION_ENABLED:
        return
    session = _legacy_dryoff_session_snapshot()
    if not bool(session.get("session_active", False)):
        return
    _legacy_dryoff_block_count = int(_legacy_dryoff_block_count or 0) + 1


def _legacy_dryoff_rehearsal_summary(
    *,
    session_snapshot: dict[str, Any],
    guard_snapshot: dict[str, Any],
) -> dict[str, Any]:
    block_count = int(session_snapshot.get("session_block_count", session_snapshot.get("block_count", 0)) or 0)
    safe_block_max = max(0, int(_LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD) - 1)
    auto_guard_triggered = bool(int(guard_snapshot.get("guard_trigger_count", 0) or 0) > 0)

    if not bool(session_snapshot.get("session_enabled", False)):
        rehearsal_status = "pending"
        rehearsal_result = "unknown"
        rehearsal_reason = "dryoff session not enabled"
    elif bool(session_snapshot.get("session_active", False)):
        rehearsal_status = "active"
        rehearsal_result = "unknown"
        rehearsal_reason = "dryoff session still active; waiting for completion"
    else:
        rehearsal_status = "completed"
        if auto_guard_triggered:
            rehearsal_result = "fail"
            rehearsal_reason = "auto_guard triggered during rehearsal"
        elif block_count > safe_block_max:
            rehearsal_result = "fail"
            rehearsal_reason = f"block_count={block_count} exceeds safe range <= {safe_block_max}"
        else:
            rehearsal_result = "pass"
            rehearsal_reason = f"block_count={block_count} within safe range <= {safe_block_max} and auto_guard not triggered"

    return {
        "rehearsal_status": rehearsal_status,
        "rehearsal_result": rehearsal_result,
        "rehearsal_reason": rehearsal_reason,
        "auto_guard_triggered": auto_guard_triggered,
        "rehearsal_safe_block_max": int(safe_block_max),
    }


def _legacy_dryoff_report_payload() -> dict[str, Any]:
    session_snapshot = _legacy_dryoff_session_snapshot()
    guard_snapshot = _legacy_dryoff_guard_snapshot()
    rehearsal = _legacy_dryoff_rehearsal_summary(
        session_snapshot=session_snapshot,
        guard_snapshot=guard_snapshot,
    )
    payload = dict(session_snapshot)
    payload.update(
        {
            "dryoff_guard": guard_snapshot,
            "rehearsal_status": rehearsal.get("rehearsal_status", "pending"),
            "rehearsal_result": rehearsal.get("rehearsal_result", "unknown"),
            "rehearsal_reason": rehearsal.get("rehearsal_reason", ""),
            "auto_guard_triggered": bool(rehearsal.get("auto_guard_triggered", False)),
            "rehearsal_safe_block_max": int(rehearsal.get("rehearsal_safe_block_max", 0) or 0),
        }
    )
    return payload


def _legacy_dryoff_guard_snapshot() -> dict[str, Any]:
    global _legacy_dryoff_block_events
    now_ts = time.time()
    cutoff_window = now_ts - _LEGACY_DRYOFF_GUARD_WINDOW_SECONDS
    _legacy_dryoff_block_events = [float(ts) for ts in _legacy_dryoff_block_events if float(ts) >= cutoff_window]

    bypass_until_ts = float(globals().get("_legacy_dryoff_guard_bypass_until_ts", 0.0) or 0.0)
    trigger_count = int(globals().get("_legacy_dryoff_guard_trigger_count", 0) or 0)
    last_trigger_at = str(globals().get("_legacy_dryoff_guard_last_trigger_at", "") or "")

    bypass_active = bypass_until_ts > now_ts
    if bypass_active:
        remaining = max(0, int(bypass_until_ts - now_ts))
    else:
        remaining = 0
        bypass_until_ts = 0.0

    block_count_window = len(_legacy_dryoff_block_events)
    if (not bypass_active) and block_count_window >= _LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD:
        bypass_until_ts = now_ts + _LEGACY_DRYOFF_GUARD_BYPASS_SECONDS
        last_trigger_at = datetime.now().isoformat()
        trigger_count += 1
        bypass_active = True
        remaining = _LEGACY_DRYOFF_GUARD_BYPASS_SECONDS
        _LOGGER.warning(
            "[LegacyDryoffGuard] triggered bypass window=%ss threshold=%s bypass=%ss hits=%s",
            _LEGACY_DRYOFF_GUARD_WINDOW_SECONDS,
            _LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD,
            _LEGACY_DRYOFF_GUARD_BYPASS_SECONDS,
            block_count_window,
        )

    globals()["_legacy_dryoff_guard_bypass_until_ts"] = bypass_until_ts
    globals()["_legacy_dryoff_guard_trigger_count"] = trigger_count
    globals()["_legacy_dryoff_guard_last_trigger_at"] = last_trigger_at

    return {
        "guard_enabled": True,
        "guard_window_seconds": int(_LEGACY_DRYOFF_GUARD_WINDOW_SECONDS),
        "guard_block_threshold": int(_LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD),
        "guard_bypass_seconds": int(_LEGACY_DRYOFF_GUARD_BYPASS_SECONDS),
        "guard_block_count_window": int(block_count_window),
        "guard_bypass_active": bool(bypass_active),
        "guard_bypass_until": datetime.fromtimestamp(bypass_until_ts).isoformat() if bypass_until_ts > 0 else None,
        "guard_bypass_remaining_seconds": int(remaining),
        "guard_trigger_count": int(trigger_count),
        "guard_last_trigger_at": last_trigger_at or None,
    }


def _legacy_dryoff_should_bypass() -> tuple[bool, dict[str, Any]]:
    snapshot = _legacy_dryoff_guard_snapshot()
    return bool(snapshot.get("guard_bypass_active", False)), snapshot


def _legacy_dryoff_audit_context(
    request: web.Request,
    *,
    target_tag: str,
    guard_snapshot: dict[str, Any] | None = None,
) -> dict[str, Any]:
    if guard_snapshot is None:
        _, guard_snapshot = _legacy_dryoff_should_bypass()
    return {
        "route": str(request.path or "").lower(),
        "path": str(request.path or "").lower(),
        "target_tag": str(target_tag or ""),
        "timestamp": datetime.now().isoformat(),
        "env": {
            "SA_LEGACY_DRYOFF_ENABLED": bool(_LEGACY_DRYOFF_ENABLED),
            "SA_LEGACY_DRYOFF_TARGETS": sorted(_legacy_dryoff_active_targets()),
            "SA_LEGACY_DRYOFF_GUARD_WINDOW_SECONDS": int(_LEGACY_DRYOFF_GUARD_WINDOW_SECONDS),
            "SA_LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD": int(_LEGACY_DRYOFF_GUARD_BLOCK_THRESHOLD),
            "SA_LEGACY_DRYOFF_GUARD_BYPASS_SECONDS": int(_LEGACY_DRYOFF_GUARD_BYPASS_SECONDS),
            "SA_LEGACY_DRYOFF_SESSION_ENABLED": bool(_LEGACY_DRYOFF_SESSION_ENABLED),
            "SA_LEGACY_DRYOFF_SESSION_DURATION_SECONDS": int(_LEGACY_DRYOFF_SESSION_DURATION_SECONDS),
            "SA_LEGACY_DRYOFF_SESSION_START_AT": datetime.fromtimestamp(
                float(_LEGACY_DRYOFF_SESSION_START_AT_TS or _LEGACY_DRYOFF_SESSION_BOOT_TS)
            ).isoformat(),
        },
        "guard": guard_snapshot,
    }


def _record_legacy_dryoff_block(request: web.Request, *, target_tag: str) -> dict[str, Any]:
    global _legacy_last_warn_at, _legacy_dryoff_block_count, _legacy_dryoff_last_block_at, _legacy_dryoff_last_hit_path, _legacy_dryoff_last_target
    path = str(request.path or "").lower()
    now_ts = time.time()
    _legacy_dryoff_block_events.append(now_ts)
    _legacy_dryoff_last_block_at = datetime.now().isoformat()
    _legacy_dryoff_last_hit_path = path
    _legacy_dryoff_last_target = str(target_tag or "")
    _legacy_last_warn_at = _legacy_dryoff_last_block_at
    _legacy_dryoff_record_session_block()
    _, guard_snapshot = _legacy_dryoff_should_bypass()
    audit = _legacy_dryoff_audit_context(
        request,
        target_tag=target_tag,
        guard_snapshot=guard_snapshot,
    )
    _LOGGER.warning(
        "[LegacyDryoffBlock] route=%s target_tag=%s env=%s timestamp=%s",
        audit.get("route"),
        audit.get("target_tag"),
        audit.get("env"),
        audit.get("timestamp"),
    )
    return audit


def _legacy_dryoff_reject_payload(*, legacy_group: str, target_tag: str, audit: dict[str, Any] | None = None) -> dict[str, Any]:
    details = {
        "legacy_group": str(legacy_group or "legacy"),
        "target_tag": str(target_tag or ""),
        "switch_env": "SA_LEGACY_DRYOFF_ENABLED",
        "targets_env": "SA_LEGACY_DRYOFF_TARGETS",
        "sunset_phase": "dryoff",
        "reason": "legacy compatibility route blocked by dryoff drill",
    }
    if audit:
        details["audit"] = audit
    return {
        "ok": False,
        "error": "legacy_route_dryoff_blocked",
        "error_type": "gone",
        "retryable": False,
        "details": details,
    }


def _legacy_dryoff_hit_target(request: web.Request) -> tuple[str | None, dict[str, Any]]:
    _, guard_snapshot = _legacy_dryoff_should_bypass()
    return None, guard_snapshot


def _legacy_dryoff_status_payload() -> dict[str, Any]:
    active_targets = sorted(_legacy_dryoff_active_targets())
    cutoff_24h = time.time() - _LEGACY_ROUTE_24H_SECONDS
    global _legacy_dryoff_block_events
    compacted = [float(ts) for ts in _legacy_dryoff_block_events if float(ts) >= cutoff_24h]
    _legacy_dryoff_block_events = compacted
    guard_snapshot = _legacy_dryoff_guard_snapshot()
    session_snapshot = _legacy_dryoff_session_snapshot()
    return {
        "dryoff_enabled": bool(_legacy_dryoff_is_effective()),
        "dryoff_targets": active_targets,
        "dryoff_default_targets": sorted(_LEGACY_DRYOFF_DEFAULT_TARGETS),
        "dryoff_block_count_24h": int(len(compacted)),
        "dryoff_guard": guard_snapshot,
        "dryoff_session": session_snapshot,
    }


def _status_error_type(status: int, fallback: str = "upstream_rejected") -> str:
    return _ERROR_TYPE_BY_STATUS.get(int(status), fallback)


def _is_retryable_status(status: int) -> bool:
    return int(status) in (429, 500, 502, 503, 504)


def _json_error(
    status: int,
    *,
    error: str,
    error_type: str,
    retryable: bool,
    details: dict[str, Any] | None = None,
) -> web.Response:
    payload: dict[str, Any] = {
        "ok": False,
        "error": error,
        "error_type": error_type,
        "retryable": retryable,
    }
    if details:
        payload["details"] = details
    return web.json_response(payload, status=status)


def _redact_token(value: str) -> str:
    s = str(value or "")
    if len(s) <= 8:
        return "***" if s else ""
    return f"{s[:4]}***{s[-4:]}"


def _extract_internal_token(request: web.Request) -> str:
    x_sa = str(request.headers.get("X-SA-Token", "") or "").strip()
    if x_sa:
        return x_sa
    auth_header = str(request.headers.get("Authorization", "") or "")
    if auth_header.lower().startswith("bearer "):
        return auth_header[7:].strip()
    query = getattr(request, "query", None)
    if query is not None:
        token = str(query.get("token", "") or "").strip()
        if token:
            return token
    return ""


def _empty_auth_remote_allowed(remote: str | None) -> bool:
    value = str(remote or "").strip()
    if not value:
        return False
    if value.lower() == "localhost":
        return True
    if value.startswith("[") and "]" in value:
        value = value[1:value.index("]")]
    try:
        address = ipaddress.ip_address(value)
    except ValueError:
        return False

    for raw_cidr in _SA_EMPTY_AUTH_ALLOW_CIDRS.split(","):
        cidr = raw_cidr.strip()
        if not cidr:
            continue
        try:
            network = ipaddress.ip_network(cidr, strict=False)
        except ValueError:
            _LOGGER.warning("Ignoring invalid SA_EMPTY_AUTH_ALLOW_CIDRS entry: %s", cidr)
            continue
        if address in network:
            return True
    return False


def _check_auth(request: web.Request) -> bool:
    if not _SA_AUTH_TOKEN:
        return _empty_auth_remote_allowed(getattr(request, "remote", None))
    return _extract_internal_token(request) == _SA_AUTH_TOKEN


def _ha_headers() -> dict[str, str]:
    headers = {
        "Content-Type": "application/json",
        "X-SA-Proxy-From": "addon",
    }
    if _SA_HA_TOKEN:
        headers["Authorization"] = f"Bearer {_SA_HA_TOKEN}"
    return headers


def _ha_url(path: str) -> str:
    p = path if path.startswith("/") else f"/{path}"
    return f"{_SA_HA_URL}{p}"


def _ha_ws_headers() -> dict[str, str]:
    headers = {
        "X-SA-Proxy-From": "addon",
    }
    if _SA_HA_TOKEN:
        headers["Authorization"] = f"Bearer {_SA_HA_TOKEN}"
    return headers


def _append_query(url: str, query_string: str) -> str:
    if not query_string:
        return url
    separator = "&" if "?" in url else "?"
    return f"{url}{separator}{query_string}"


def _route_kind(upstream_path: str) -> str:
    if upstream_path == "/api/v1" or upstream_path.startswith("/api/v1/"):
        return "api_v1"
    if upstream_path == "/api" or upstream_path.startswith("/api/"):
        return "ha_api"
    return "root"


def _ha_ws_url(path: str) -> str:
    url = _ha_url(path)
    if url.startswith("https://"):
        return "wss://" + url[len("https://"):]
    if url.startswith("http://"):
        return "ws://" + url[len("http://"):]
    return url


def _record_status_counter(counter: dict[str, int], status: int) -> None:
    key = str(int(status or 0))
    counter[key] = int(counter.get(key, 0) or 0) + 1


def _sorted_status_counts(counter: dict[str, int]) -> dict[str, int]:
    return {k: int(counter[k] or 0) for k in sorted(counter.keys(), key=lambda x: int(x))}


async def _ensure_session(request: web.Request) -> aiohttp.ClientSession:
    session = request.app.get("http_session")
    if session is None or session.closed:
        session = aiohttp.ClientSession(timeout=_PROXY_TIMEOUT)
        request.app["http_session"] = session
    return session


async def _proxy_to_ha(
    request: web.Request,
    upstream_path: str,
    *,
    allow_methods: tuple[str, ...] = ("GET", "POST", "PATCH", "DELETE"),
    body_override: Any | None = None,
    audit_route_kind: str | None = None,
) -> web.Response:
    global _proxy_count, _proxy_error_count, _proxy_status_counts, _last_proxy_error, _last_proxy_error_at

    target_url = _append_query(_ha_url(upstream_path), request.query_string)
    route_kind = audit_route_kind or _route_kind(upstream_path)

    if request.method.upper() not in allow_methods:
        _record_status_counter(_proxy_status_counts, 405)
        _LOGGER.warning(
            "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            route_kind,
            target_url,
            405,
            0,
            _status_error_type(405),
            request.method.upper(),
            request.path,
        )
        return _json_error(
            405,
            error="method_not_allowed",
            error_type=_status_error_type(405),
            retryable=False,
        )

    if not _SA_HA_TOKEN:
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 503)
        _last_proxy_error = "ha_token_not_configured"
        _last_proxy_error_at = datetime.now().isoformat()
        _LOGGER.warning(
            "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            route_kind,
            target_url,
            503,
            0,
            "dependency_not_configured",
            request.method.upper(),
            request.path,
        )
        return _json_error(
            503,
            error="ha_token_not_configured",
            error_type="dependency_not_configured",
            retryable=False,
            details={"dependency": "home_assistant_api"},
        )

    session = await _ensure_session(request)
    body: Any = body_override
    if body_override is None and request.method.upper() in ("POST", "PATCH", "PUT"):
        try:
            body = await request.json()
        except Exception:
            body = {}

    started = time.monotonic()
    try:
        async with session.request(
            request.method.upper(),
            target_url,
            json=body,
            headers=_ha_headers(),
            timeout=_PROXY_TIMEOUT,
        ) as resp:
            latency_ms = int((time.monotonic() - started) * 1000)
            text = await resp.text()
            payload: Any
            try:
                payload = await resp.json(content_type=None)
            except Exception:
                payload = None

            _proxy_count += 1
            _record_status_counter(_proxy_status_counts, int(resp.status))

            if 200 <= resp.status < 300:
                _LOGGER.info(
                    "[AUDIT] proxy_ok route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
                    route_kind,
                    target_url,
                    resp.status,
                    latency_ms,
                    "",
                    request.method.upper(),
                    request.path,
                )
                if payload is not None:
                    return web.json_response(payload, status=resp.status)
                return web.json_response({"ok": True}, status=resp.status)

            _proxy_error_count += 1
            upstream_error = "upstream_request_failed"
            if isinstance(payload, dict) and payload.get("error"):
                upstream_error = str(payload.get("error"))
            elif text:
                upstream_error = text[:180]

            _last_proxy_error = upstream_error
            _last_proxy_error_at = datetime.now().isoformat()
            retryable = _is_retryable_status(resp.status)
            error_type = _status_error_type(resp.status)
            _LOGGER.warning(
                "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s error=%s",
                route_kind,
                target_url,
                resp.status,
                latency_ms,
                error_type,
                request.method.upper(),
                request.path,
                upstream_error,
            )
            return _json_error(
                resp.status,
                error=upstream_error,
                error_type=error_type,
                retryable=retryable,
                details={"upstream_path": upstream_path, "upstream_status": resp.status},
            )
    except asyncio.TimeoutError:
        latency_ms = int((time.monotonic() - started) * 1000)
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 504)
        _last_proxy_error = "upstream_timeout"
        _last_proxy_error_at = datetime.now().isoformat()
        _LOGGER.warning(
            "[AUDIT] proxy_timeout route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            route_kind,
            target_url,
            504,
            latency_ms,
            "timeout",
            request.method.upper(),
            request.path,
        )
        return _json_error(
            504,
            error="upstream_timeout",
            error_type="timeout",
            retryable=True,
            details={"upstream_path": upstream_path},
        )
    except aiohttp.ClientError as exc:
        latency_ms = int((time.monotonic() - started) * 1000)
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 502)
        _last_proxy_error = "upstream_unreachable"
        _last_proxy_error_at = datetime.now().isoformat()
        _LOGGER.error(
            "[AUDIT] proxy_client_error route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s error=%s",
            route_kind,
            target_url,
            502,
            latency_ms,
            "dependency_unreachable",
            request.method.upper(),
            request.path,
            str(exc),
        )
        return _json_error(
            502,
            error="upstream_unreachable",
            error_type="dependency_unreachable",
            retryable=True,
            details={"upstream_path": upstream_path},
        )


async def _fetch_bridge_json(
    request: web.Request,
    upstream_path: str,
    *,
    allow_methods: tuple[str, ...] = ("GET",),
    body_override: Any | None = None,
    audit_route_kind: str = "ha_adapter_bridge",
) -> tuple[Any | None, dict[str, Any]]:
    global _proxy_count, _proxy_error_count, _proxy_status_counts, _last_proxy_error, _last_proxy_error_at

    target_url = _append_query(_ha_url(upstream_path), request.query_string)
    method = request.method.upper()

    if method not in allow_methods:
        _record_status_counter(_proxy_status_counts, 405)
        err = {
            "ok": False,
            "upstream_path": upstream_path,
            "upstream_url": target_url,
            "status": 405,
            "error": "method_not_allowed",
            "error_type": _status_error_type(405),
            "retryable": False,
            "latency_ms": 0,
        }
        _LOGGER.warning(
            "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            audit_route_kind,
            target_url,
            405,
            0,
            err["error_type"],
            method,
            request.path,
        )
        return None, err

    if not _SA_HA_TOKEN:
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 503)
        _last_proxy_error = "ha_token_not_configured"
        _last_proxy_error_at = datetime.now().isoformat()
        err = {
            "ok": False,
            "upstream_path": upstream_path,
            "upstream_url": target_url,
            "status": 503,
            "error": "ha_token_not_configured",
            "error_type": "dependency_not_configured",
            "retryable": False,
            "latency_ms": 0,
        }
        _LOGGER.warning(
            "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            audit_route_kind,
            target_url,
            503,
            0,
            err["error_type"],
            method,
            request.path,
        )
        return None, err

    session = await _ensure_session(request)
    body: Any = body_override
    if body_override is None and method in ("POST", "PATCH", "PUT"):
        try:
            body = await request.json()
        except Exception:
            body = {}

    started = time.monotonic()
    try:
        async with session.request(
            method,
            target_url,
            json=body,
            headers=_ha_headers(),
            timeout=_PROXY_TIMEOUT,
        ) as resp:
            latency_ms = int((time.monotonic() - started) * 1000)
            text = await resp.text()
            payload: Any
            try:
                payload = await resp.json(content_type=None)
            except Exception:
                payload = None

            _proxy_count += 1
            _record_status_counter(_proxy_status_counts, int(resp.status))

            if 200 <= resp.status < 300:
                _LOGGER.info(
                    "[AUDIT] proxy_ok route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
                    audit_route_kind,
                    target_url,
                    resp.status,
                    latency_ms,
                    "",
                    method,
                    request.path,
                )
                bridge_meta = {
                    "ok": True,
                    "upstream_path": upstream_path,
                    "upstream_url": target_url,
                    "status": resp.status,
                    "latency_ms": latency_ms,
                }
                if isinstance(payload, dict):
                    return payload, bridge_meta
                if isinstance(payload, list):
                    return payload, bridge_meta
                return {"ok": True}, bridge_meta

            _proxy_error_count += 1
            upstream_error = "upstream_request_failed"
            if isinstance(payload, dict) and payload.get("error"):
                upstream_error = str(payload.get("error"))
            elif text:
                upstream_error = text[:180]
            _last_proxy_error = upstream_error
            _last_proxy_error_at = datetime.now().isoformat()
            error_type = _status_error_type(resp.status)
            retryable = _is_retryable_status(resp.status)
            _LOGGER.warning(
                "[AUDIT] proxy_fail route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s error=%s",
                audit_route_kind,
                target_url,
                resp.status,
                latency_ms,
                error_type,
                method,
                request.path,
                upstream_error,
            )
            return None, {
                "ok": False,
                "upstream_path": upstream_path,
                "upstream_url": target_url,
                "status": resp.status,
                "error": upstream_error,
                "error_type": error_type,
                "retryable": retryable,
                "latency_ms": latency_ms,
            }
    except asyncio.TimeoutError:
        latency_ms = int((time.monotonic() - started) * 1000)
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 504)
        _last_proxy_error = "upstream_timeout"
        _last_proxy_error_at = datetime.now().isoformat()
        _LOGGER.warning(
            "[AUDIT] proxy_timeout route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s",
            audit_route_kind,
            target_url,
            504,
            latency_ms,
            "timeout",
            method,
            request.path,
        )
        return None, {
            "ok": False,
            "upstream_path": upstream_path,
            "upstream_url": target_url,
            "status": 504,
            "error": "upstream_timeout",
            "error_type": "timeout",
            "retryable": True,
            "latency_ms": latency_ms,
        }
    except aiohttp.ClientError as exc:
        latency_ms = int((time.monotonic() - started) * 1000)
        _proxy_error_count += 1
        _record_status_counter(_proxy_status_counts, 502)
        _last_proxy_error = "upstream_unreachable"
        _last_proxy_error_at = datetime.now().isoformat()
        _LOGGER.error(
            "[AUDIT] proxy_client_error route_kind=%s upstream=%s status=%s latency_ms=%s failure_type=%s method=%s path=%s error=%s",
            audit_route_kind,
            target_url,
            502,
            latency_ms,
            "dependency_unreachable",
            method,
            request.path,
            str(exc),
        )
        return None, {
            "ok": False,
            "upstream_path": upstream_path,
            "upstream_url": target_url,
            "status": 502,
            "error": "upstream_unreachable",
            "error_type": "dependency_unreachable",
            "retryable": True,
            "latency_ms": latency_ms,
        }


def _merge_local_first(local_payload: dict[str, Any], bridge_payload: dict[str, Any] | None) -> dict[str, Any]:
    if not isinstance(bridge_payload, dict):
        return dict(local_payload)

    merged = dict(local_payload)
    merged.update(bridge_payload)

    for field in ("gateway", "core", "ha", "proxy_metrics", "auth", "compat_summary", "resource_metrics"):
        local_v = local_payload.get(field)
        bridge_v = bridge_payload.get(field)
        if isinstance(local_v, dict) and isinstance(bridge_v, dict):
            nested = dict(local_v)
            nested.update(bridge_v)
            merged[field] = nested

    preserved_local_resource_metric = False
    for field in ("cpu", "memory"):
        local_v = local_payload.get(field)
        bridge_v = bridge_payload.get(field)
        if _has_meaningful_resource_metric(local_v) and not _has_meaningful_resource_metric(bridge_v):
            merged[field] = local_v
            preserved_local_resource_metric = True

    if preserved_local_resource_metric and isinstance(local_payload.get("resource_metrics"), dict):
        merged["resource_metrics"] = dict(local_payload["resource_metrics"])

    return merged


def _normalize_system_status_scalars(payload: dict[str, Any]) -> dict[str, Any]:
    normalized = dict(payload)

    gateway_obj = normalized.get("gateway") if isinstance(normalized.get("gateway"), dict) else {}
    core_obj = normalized.get("core") if isinstance(normalized.get("core"), dict) else {}
    ha_obj = normalized.get("ha") if isinstance(normalized.get("ha"), dict) else {}

    gateway_status = str(gateway_obj.get("status") or normalized.get("gateway") or "unknown")
    core_status = str(core_obj.get("status") or normalized.get("core") or "unknown")
    ha_status = str(
        ha_obj.get("status")
        or ("online" if bool(ha_obj.get("ok", False)) else "unknown")
        or normalized.get("ha")
        or "unknown"
    )

    normalized["gateway_detail"] = gateway_obj
    normalized["core_detail"] = core_obj
    normalized["ha_detail"] = ha_obj

    normalized["gateway"] = gateway_status
    normalized["core"] = core_status
    normalized["ha"] = ha_status
    normalized["mode"] = str(normalized.get("mode") or "unknown")
    normalized["uptime_sec"] = int(normalized.get("uptime_sec") or normalized.get("uptimeSec") or 0)
    normalized["devices_managed"] = int(normalized.get("devices_managed") or normalized.get("devices") or 0)
    normalized["active_scenes"] = int(normalized.get("active_scenes") or normalized.get("activeScenes") or 0)
    normalized["voice_provider"] = str(normalized.get("voice_provider") or normalized.get("voiceProvider") or "unknown")
    normalized["cpu"] = _clamp_percent(normalized.get("cpu"))
    normalized["memory"] = _clamp_percent(normalized.get("memory"))
    normalized["ready"] = bool(normalized.get("ready", bool(ha_obj.get("ok", False))))

    return normalized


@web.middleware
async def _error_middleware(request: web.Request, handler):
    started = time.monotonic()
    try:
        resp = await handler(request)
    except web.HTTPException as exc:
        resp = _json_error(
            exc.status,
            error=exc.reason or "http_error",
            error_type=_status_error_type(exc.status, "http_error"),
            retryable=_is_retryable_status(exc.status),
        )
    except Exception as exc:
        _LOGGER.exception("[API] unhandled error path=%s error=%s", request.path, exc)
        resp = _json_error(
            500,
            error="internal_server_error",
            error_type="internal_error",
            retryable=False,
        )

    latency_ms = int((time.monotonic() - started) * 1000)
    auth_mode = "empty-token-local-only" if not _SA_AUTH_TOKEN else "token"
    _LOGGER.info(
        "[AUDIT] request method=%s path=%s status=%s latency_ms=%s auth=%s",
        request.method,
        request.path,
        resp.status,
        latency_ms,
        auth_mode,
    )
    return resp


def _require_auth(request: web.Request) -> web.Response | None:
    if _check_auth(request):
        return None
    _LOGGER.warning(
        "[AUDIT] auth_failed path=%s client=%s token=%s",
        request.path,
        request.remote,
        _redact_token(_extract_internal_token(request)),
    )
    return _json_error(
        401,
        error="invalid_internal_token",
        error_type="auth_failed",
        retryable=False,
    )


async def health(_: web.Request) -> web.Response:
    return web.json_response(
        {
            "status": "ok",
            "version": "1.1.0",
            "timestamp": datetime.now().isoformat(),
            "bundle_version": "1.0",
            "auth": {"enabled": bool(_SA_AUTH_TOKEN)},
        }
    )


async def infer(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    global _infer_count_today, _infer_date, _last_infer_error, _last_infer_error_at

    try:
        bundle = await request.json()
    except Exception:
        return _json_error(
            400,
            error="invalid_json_bundle",
            error_type="bad_request",
            retryable=False,
        )

    online_api_key = str(request.headers.get("X-SA-Online-Key", "") or "").strip()
    if online_api_key:
        bundle["online_api_key"] = online_api_key

    today = datetime.now().strftime("%Y-%m-%d")
    if today != _infer_date:
        _infer_count_today = 0
        _infer_date = today
    _infer_count_today += 1

    trigger = str(bundle.get("trigger", ""))
    _LOGGER.info("[推理] 收到 Bundle | trigger=%s", trigger[:80])

    try:
        from core.inference_engine import infer as real_infer  # type: ignore[import]

        result = await asyncio.wait_for(real_infer(bundle), timeout=_INFER_TIMEOUT.total or 95)
    except ImportError:
        _last_infer_error = "inference_engine_not_ready"
        _last_infer_error_at = datetime.now().isoformat()
        return _json_error(
            503,
            error="inference_engine_not_ready",
            error_type="service_unavailable",
            retryable=True,
        )
    except asyncio.TimeoutError:
        _last_infer_error = "inference_timeout"
        _last_infer_error_at = datetime.now().isoformat()
        return _json_error(
            504,
            error="inference_timeout",
            error_type="timeout",
            retryable=True,
        )

    if result is None:
        _last_infer_error = "llm_unreachable_or_parse_failed"
        _last_infer_error_at = datetime.now().isoformat()
        return _json_error(
            503,
            error="llm_unreachable_or_parse_failed",
            error_type="llm_failure",
            retryable=True,
        )

    if isinstance(result, dict):
        result.setdefault("retryable", False)
        result.setdefault("error_type", "")
        result.setdefault("transaction_id", bundle.get("transaction_id", 0))
        result.setdefault("action_seq", bundle.get("action_seq", 0))
    return web.json_response(result)


def _local_core_mode() -> str:
    _ensure_local_import_root()
    try:
        import core.inference_engine  # type: ignore[import]

        return "inference_engine"
    except ImportError:
        return "stub"


def _core_module_status() -> dict[str, Any]:
    core_root = _addon_root() / "core"
    modules = {
        "inference": core_root / "inference_engine.py",
        "decision.pipeline": core_root / "decision" / "decision_pipeline.py",
        "decision.feature_encoder": core_root / "decision" / "feature_encoder.py",
        "decision.fast_brain": core_root / "decision" / "fast_brain.py",
        "decision.intent_verifier": core_root / "decision" / "intent_verifier.py",
        "decision.protection": core_root / "decision" / "protection.py",
        "execution.command_schema": core_root / "execution" / "command_schema.py",
        "execution.result_schema": core_root / "execution" / "result_schema.py",
        "execution.transaction": core_root / "execution" / "transaction.py",
        "storage.database": core_root / "storage" / "database.py",
        "memory.memory_store": core_root / "memory" / "memory_store.py",
        "context.context_builder": core_root / "context" / "context_builder.py",
    }
    present = {name: path.exists() for name, path in modules.items()}
    grouped = {
        "storage": present["storage.database"],
        "memory": present["memory.memory_store"],
        "context": present["context.context_builder"],
        "decision": (
            present["decision.pipeline"]
            and present["decision.feature_encoder"]
            and present["decision.fast_brain"]
            and present["decision.intent_verifier"]
            and present["decision.protection"]
        ),
        "execution": (
            present["execution.command_schema"]
            and present["execution.result_schema"]
            and present["execution.transaction"]
        ),
        "inference": present["inference"],
    }
    return {
        "present": present,
        "groups": grouped,
        "completed_groups": [name for name, ok in grouped.items() if ok],
        "pending_groups": [name for name, ok in grouped.items() if not ok],
    }


async def get_status(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    try:
        import core.inference_engine  # type: ignore[import]

        mode = "inference_engine"
    except ImportError:
        mode = "stub"

    return web.json_response(
        {
            "addon_version": "1.1.0",
            "bundle_version": "1.0",
            "inference_count_today": _infer_count_today,
            "mode": mode,
            "proxy_count": _proxy_count,
            "proxy_error_count": _proxy_error_count,
        }
    )


async def _ha_dependency_health(request: web.Request) -> dict[str, Any]:
    session = await _ensure_session(request)
    probe_url = _ha_url("/api/")
    started = time.monotonic()

    if not _SA_HA_TOKEN:
        return {
            "ok": False,
            "error": "ha_token_not_configured",
            "error_type": "auth_failed",
            "retryable": False,
            "latency_ms": 0,
            "url": _SA_HA_URL,
        }

    try:
        async with session.get(probe_url, headers=_ha_headers(), timeout=_PROXY_TIMEOUT) as resp:
            latency_ms = int((time.monotonic() - started) * 1000)
            return {
                "ok": 200 <= resp.status < 300,
                "status": resp.status,
                "retryable": resp.status in (429, 500, 502, 503, 504),
                "latency_ms": latency_ms,
                "url": _SA_HA_URL,
            }
    except asyncio.TimeoutError:
        return {
            "ok": False,
            "error": "timeout",
            "retryable": True,
            "latency_ms": int((time.monotonic() - started) * 1000),
            "url": _SA_HA_URL,
        }
    except Exception as exc:
        return {
            "ok": False,
            "error": str(exc)[:120],
            "retryable": True,
            "latency_ms": int((time.monotonic() - started) * 1000),
            "url": _SA_HA_URL,
        }


def _extract_contracts(app: web.Application) -> dict[str, list[str]]:
    reads: set[str] = set()
    writes: set[str] = set()

    excluded_paths = {
        "/health",
        "/infer",
        "/status",
        "/addon/dashboard-summary",
        "/addon/system-status",
    }

    for resource in app.router.resources():
        info = resource.get_info() or {}
        path = str(info.get("path") or info.get("formatter") or "")
        if not path or path in excluded_paths:
            continue
        for route in resource:
            method = str(getattr(route, "method", "") or "").upper()
            if method in ("HEAD", "OPTIONS"):
                continue
            entry = f"{method} {path}"
            if method == "GET":
                reads.add(entry)
            else:
                writes.add(entry)

    def _sort_key(item: str) -> tuple[str, str]:
        parts = item.split(" ", 1)
        return (parts[0], parts[1] if len(parts) > 1 else "")

    return {
        "reads": sorted(reads, key=_sort_key),
        "writes": sorted(writes, key=_sort_key),
    }


def _classify_route(path: str, handler_name: str) -> str:
    if handler_name == "_bridge_to_ha_v1":
        return "ha_adapter_bridge"
    if handler_name in ("_proxy_events_ws", "_proxy_voice_session_ws"):
        return "ws_proxy"
    if handler_name == "_proxy_root":
        return "legacy_proxy"
    if handler_name.startswith("_proxy_"):
        return "proxy_ha_v1"
    if handler_name in ("infer", "core_status", "dashboard_summary_local"):
        return "local_core"
    if path in ("/health", "/status", "/capabilities", "/diagnostics", "/system/diagnostics"):
        return "addon_local"
    return "addon_local"


def _route_class_summary(app: web.Application) -> dict[str, Any]:
    counts: dict[str, int] = {}
    bridge_routes: list[str] = []
    excluded_paths = {"/addon/system-status"}

    for resource in app.router.resources():
        info = resource.get_info() or {}
        path = str(info.get("path") or info.get("formatter") or "")
        if not path or path in excluded_paths:
            continue
        for route in resource:
            method = str(getattr(route, "method", "") or "").upper()
            if method in ("HEAD", "OPTIONS"):
                continue
            handler_name = str(getattr(getattr(route, "handler", None), "__name__", ""))
            route_class = _classify_route(path, handler_name)
            counts[route_class] = counts.get(route_class, 0) + 1
            if route_class == "ha_adapter_bridge":
                bridge_routes.append(f"{method} {path}")

    return {
        "counts": dict(sorted(counts.items())),
        "ha_adapter_bridge_routes": sorted(bridge_routes),
    }


def _build_legacy_compat_stats_payload() -> dict[str, Any]:
    return {
        "ok": True,
        "threshold": {
            "warn_threshold": _LEGACY_ROUTE_WARN_THRESHOLD,
            "any_exceeded": False,
            "noisy_multiplier_24h": _LEGACY_ROUTE_NOISY_MULTIPLIER,
            "any_noisy": False,
            "noise_rule": f"hits_24h > warn_threshold * {_LEGACY_ROUTE_NOISY_MULTIPLIER}",
        },
        "route_count": 0,
        "hits_24h_total": 0,
        "hits_7d_total": 0,
        "noisy_routes_count": 0,
        "routes": {},
        "last_warn_at": None,
        "rollout_switches": _build_legacy_rollout_and_dryoff_payload(),
    }


async def capabilities(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    contracts = _extract_contracts(request.app)
    route_classes = _route_class_summary(request.app)
    return web.json_response(
        {
            "ok": True,
            "role": "gateway_core_proxy",
            "ports": {
                "internal": os.getenv("SA_INTERNAL_PORT", "18099"),
            },
            "gateway": {
                "proxy_to_ha_api_v1": {
                    "enabled": True,
                    "upstream_base": "/api/v1",
                },
                "ha_adapter_bridge": {
                    "enabled": True,
                    "upstream_base": "/api/v1",
                    "scopes": [
                        "devices",
                        "presence_sensors",
                        "presence_sensor_type",
                        "rooms",
                        "system_brand",
                        "settings_system_read",
                        "system_settings_read",
                        "system_status",
                        "dashboard_summary",
                        "learning_stats",
                        "energy",
                        "memory_profiles",
                        "memory_habits",
                        "corrections",
                        "license_status",
                        "mcp_status",
                        "mcp",
                    ],
                },
                "events": {
                    "enabled": True,
                    "transport": "websocket",
                    "upstream": "/api/v1/events",
                },
                "voice_session": {
                    "enabled": True,
                    "transport": "websocket",
                    "upstream": "/api/v1/voice/session",
                },
            },
            "local_core": {
                "mode": _local_core_mode(),
                "modules": _core_module_status(),
            },
            "contracts_summary": {
                "reads": len(contracts.get("reads", [])),
                "writes": len(contracts.get("writes", [])),
                "route_classes": route_classes.get("counts", {}),
                "ha_adapter_bridge_routes": route_classes.get("ha_adapter_bridge_routes", []),
            },
        }
    )


async def core_status(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    return web.json_response(
        {
            "ok": True,
            "mode": _local_core_mode(),
            "bundle_version": "1.0",
            "inference_count_today": _infer_count_today,
            "last_infer_error": _last_infer_error,
            "last_infer_error_at": _last_infer_error_at,
            "modules": _core_module_status(),
        }
    )


def _build_compat_summary_payload() -> dict[str, Any]:
    stats = _build_legacy_compat_stats_payload()
    threshold = stats.get("threshold") if isinstance(stats.get("threshold"), dict) else {}
    any_exceeded = bool(threshold.get("any_exceeded", False))
    hits_24h_total = int(stats.get("hits_24h_total", 0) or 0)
    noisy_routes_count = int(stats.get("noisy_routes_count", 0) or 0)
    compat_risk_level = _calc_compat_risk_level(
        any_exceeded=any_exceeded,
        noisy_routes_count=noisy_routes_count,
        hits_24h_total=hits_24h_total,
        warn_threshold=_LEGACY_ROUTE_WARN_THRESHOLD,
    )
    dryoff = _legacy_dryoff_status_payload()
    session = dryoff.get("dryoff_session") if isinstance(dryoff.get("dryoff_session"), dict) else {}
    guard_snapshot = dryoff.get("dryoff_guard") if isinstance(dryoff.get("dryoff_guard"), dict) else {}
    rehearsal = _legacy_dryoff_rehearsal_summary(
        session_snapshot=session,
        guard_snapshot=guard_snapshot,
    )
    session_summary = {
        "session_enabled": bool(session.get("session_enabled", False)),
        "session_active": bool(session.get("session_active", False)),
        "session_preset": session.get("session_preset"),
        "session_duration_seconds": int(session.get("session_duration_seconds", 0) or 0),
        "session_start_at": session.get("session_start_at"),
        "session_end_at": session.get("session_end_at"),
        "session_remaining_seconds": int(session.get("session_remaining_seconds", 0) or 0),
        "session_block_count": int(session.get("session_block_count", 0) or 0),
        "session_last_block_at": session.get("session_last_block_at"),
        "block_count": int(session.get("session_block_count", session.get("block_count", 0)) or 0),
        "rehearsal_status": rehearsal.get("rehearsal_status", "pending"),
        "rehearsal_result": rehearsal.get("rehearsal_result", "unknown"),
        "rehearsal_reason": rehearsal.get("rehearsal_reason", ""),
        "auto_guard_triggered": bool(rehearsal.get("auto_guard_triggered", False)),
        "rehearsal_safe_block_max": int(rehearsal.get("rehearsal_safe_block_max", 0) or 0),
    }
    return {
        "any_exceeded": any_exceeded,
        "hits_24h_total": hits_24h_total,
        "hits_7d_total": int(stats.get("hits_7d_total", 0) or 0),
        "noisy_routes_count": noisy_routes_count,
        "compat_risk_level": compat_risk_level,
        "dryoff_enabled": bool(dryoff.get("dryoff_enabled", False)),
        "dryoff_targets": list(dryoff.get("dryoff_targets", [])),
        "dryoff_default_targets": list(dryoff.get("dryoff_default_targets", [])),
        "dryoff_block_count_24h": int(dryoff.get("dryoff_block_count_24h", 0) or 0),
        "dryoff_guard": dryoff.get("dryoff_guard", {}),
        "session_enabled": session_summary["session_enabled"],
        "session_active": session_summary["session_active"],
        "session_start_at": session_summary["session_start_at"],
        "session_end_at": session_summary["session_end_at"],
        "session_remaining_seconds": session_summary["session_remaining_seconds"],
        "session_block_count": session_summary["session_block_count"],
        "session_last_block_at": session_summary["session_last_block_at"],
        "session": session_summary,
        "rollout_switches": _build_legacy_rollout_and_dryoff_payload(),
    }


def _build_local_system_status_payload(
    mode: str,
    ha: dict[str, Any],
    contracts: dict[str, list[str]],
    route_classes: dict[str, Any],
) -> dict[str, Any]:
    resource_metrics = _collect_system_resource_metrics()
    return {
        "ok": True,
        "ready": bool(ha.get("ok", False)),
        "timestamp": datetime.now().isoformat(),
        "addon_version": "1.1.0",
        "bundle_version": "1.0",
        "mode": mode,
        "role": "gateway_core_proxy",
        "migration_phase": "addon_gateway_observability",
        "cpu": resource_metrics["cpu"],
        "memory": resource_metrics["memory"],
        "resource_metrics": resource_metrics["resource_metrics"],
        "gateway": {
            "status": "online",
            "role": "gateway_core_proxy",
        },
        "core": {
            "status": "online" if mode == "inference_engine" else "stub",
            "mode": mode,
            "bundle_version": "1.0",
            "inference_count_today": _infer_count_today,
            "last_infer_error": _last_infer_error,
            "last_infer_error_at": _last_infer_error_at,
        },
        "ha": ha,
        "proxy_metrics": {
            "total": _proxy_count,
            "errors": _proxy_error_count,
            "status_counts": _sorted_status_counts(_proxy_status_counts),
            "last_proxy_error": _last_proxy_error,
            "last_proxy_error_at": _last_proxy_error_at,
        },
        "contracts_summary": {
            "reads": len(contracts.get("reads", [])),
            "writes": len(contracts.get("writes", [])),
            "route_classes": route_classes.get("counts", {}),
            "ha_adapter_bridge_routes": route_classes.get("ha_adapter_bridge_routes", []),
        },
        "compat_summary": _build_compat_summary_payload(),
        "rollout_switches": _build_legacy_rollout_and_dryoff_payload(),
        "auth": {
            "enabled": bool(_SA_AUTH_TOKEN),
        },
        "addon_capabilities": {
            "bridge_mode": "local_first_with_fallback",
            "ha_adapter_bridge": True,
        },
        "addon_core_status": {
            "mode": mode,
            "healthy": mode == "inference_engine",
        },
    }


def _build_local_diagnostics_payload(
    mode: str,
    ha_health: dict[str, Any],
    contracts: dict[str, list[str]],
) -> dict[str, Any]:
    return {
        "addon_version": "1.1.0",
        "bundle_version": "1.0",
        "mode": mode,
        "last_infer_error": _last_infer_error,
        "last_infer_error_at": _last_infer_error_at,
        "auth": {
            "enabled": bool(_SA_AUTH_TOKEN),
            "header": "X-SA-Token or Authorization: Bearer",
        },
        "dependencies": {
            "ha_api": ha_health,
        },
        "proxy_metrics": {
            "total": _proxy_count,
            "errors": _proxy_error_count,
            "status_counts": _sorted_status_counts(_proxy_status_counts),
            "last_proxy_error": _last_proxy_error,
            "last_proxy_error_at": _last_proxy_error_at,
        },
        "compat_summary": _build_compat_summary_payload(),
        "rollout_switches": _build_legacy_rollout_and_dryoff_payload(),
        "error_mapping": {
            str(code): {
                "error_type": _status_error_type(code),
                "retryable": _is_retryable_status(code),
            }
            for code in sorted(_ERROR_TYPE_BY_STATUS)
        },
        "contracts": contracts,
    }


def _build_local_dashboard_summary_payload(mode: str) -> dict[str, Any]:
    compat_summary = _build_compat_summary_payload()
    return {
        "ok": True,
        "device_count": 0,
        "rule_count": 0,
        "habit_count": 0,
        "recent_corrections": 0,
        "decisions_today": int(_infer_count_today or 0),
        "corrections_today": 0,
        "action_total_7d": 0,
        "action_success_rate_7d": 0.0,
        "addon_mode": mode,
        "addon_inference_count_today": int(_infer_count_today or 0),
        "proxy_total": int(_proxy_count or 0),
        "proxy_errors": int(_proxy_error_count or 0),
        "compat_summary": compat_summary,
        "rollout_switches": _build_legacy_rollout_and_dryoff_payload(),
    }


def _bridge_obs(meta: dict[str, Any], *, fallback_used: bool) -> dict[str, Any]:
    global _bridge_fallback_count, _bridge_fallback_status_counts
    status_code = int(meta.get("status", 0) or 0)
    if fallback_used and status_code > 0:
        _bridge_fallback_count += 1
        _record_status_counter(_bridge_fallback_status_counts, status_code)

    payload = {
        "enabled": True,
        "upstream_path": meta.get("upstream_path", ""),
        "upstream_url": meta.get("upstream_url", ""),
        "status": status_code,
        "latency_ms": int(meta.get("latency_ms", 0) or 0),
        "fallback_used": fallback_used,
        "fallback_count": int(_bridge_fallback_count or 0),
        "fallback_status_counts": _sorted_status_counts(_bridge_fallback_status_counts),
    }
    if bool(meta.get("ok", False)):
        payload.update(
            {
                "ok": True,
                "error": "",
                "error_type": "",
                "retryable": False,
            }
        )
    else:
        payload.update(
            {
                "ok": False,
                "error": str(meta.get("error", "upstream_request_failed") or "upstream_request_failed"),
                "error_type": str(meta.get("error_type", "upstream_rejected") or "upstream_rejected"),
                "retryable": bool(meta.get("retryable", False)),
            }
        )
    return payload


async def addon_system_status(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    mode = _local_core_mode()
    ha = await _ha_dependency_health(request)
    contracts = _extract_contracts(request.app)
    route_classes = _route_class_summary(request.app)

    return web.json_response(
        _build_local_system_status_payload(
            mode,
            ha,
            contracts,
            route_classes,
        )
    )


async def diagnostics(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    mode = _local_core_mode()
    ha = await _ha_dependency_health(request)
    contracts = _extract_contracts(request.app)
    local_payload = _build_local_diagnostics_payload(mode, ha, contracts)

    if str(request.path or "") == "/system/diagnostics":
        bridge_payload, bridge_meta = await _fetch_bridge_json(
            request,
            "/api/v1/system/diagnostics",
            allow_methods=("GET",),
            audit_route_kind="ha_adapter_bridge",
        )
        if bridge_payload is not None:
            response_payload = _merge_local_first(local_payload, bridge_payload)
        else:
            response_payload = dict(local_payload)
        response_payload["ha_adapter_bridge"] = _bridge_obs(
            bridge_meta,
            fallback_used=bridge_payload is None,
        )
        return web.json_response(response_payload)

    return web.json_response(local_payload)


async def dashboard_summary_local(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    return web.json_response(_build_local_dashboard_summary_payload(_local_core_mode()))


async def _service_compat_stats(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return web.json_response(_build_legacy_compat_stats_payload())


async def _service_deprecation_readiness(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return web.json_response(_build_deprecation_readiness_payload())


async def _service_dryoff_session_report(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return web.json_response(_legacy_dryoff_report_payload())


async def _proxy_v1_then_root(
    request: web.Request,
    *,
    upstream_v1_path: str,
    upstream_root_path: str,
    allow_methods: tuple[str, ...] = ("GET",),
) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    bridge_payload, bridge_meta = await _fetch_bridge_json(
        request,
        upstream_v1_path,
        allow_methods=allow_methods,
        audit_route_kind="ha_v1_root_fallback",
    )
    if bridge_payload is not None:
        return web.json_response(bridge_payload)

    fallback_status = int(bridge_meta.get("status") or 0)
    if fallback_status in (404, 405):
        _LOGGER.info(
            "[AUDIT] proxy_fallback route_kind=%s from=%s to=%s status=%s method=%s path=%s",
            "ha_v1_root_fallback",
            upstream_v1_path,
            upstream_root_path,
            fallback_status,
            request.method.upper(),
            request.path,
        )
        return await _proxy_to_ha(
            request,
            upstream_path=upstream_root_path,
            allow_methods=allow_methods,
            audit_route_kind="ha_v1_root_fallback",
        )

    return _json_error(
        fallback_status or 502,
        error=str(bridge_meta.get("error") or "upstream_request_failed"),
        error_type=str(bridge_meta.get("error_type") or _status_error_type(fallback_status or 502)),
        retryable=bool(bridge_meta.get("retryable", _is_retryable_status(fallback_status or 502))),
        details={
            "upstream_path": upstream_v1_path,
            "upstream_status": fallback_status or 502,
        },
    )


def _strip_api_v1_prefix(path: str) -> str:
    if path == "/api/v1":
        return "/"
    if path.startswith("/api/v1/"):
        return path[len("/api/v1"):]
    return path


async def _bridge_to_ha_v1(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    local_mode = _local_core_mode()

    route_path = _strip_api_v1_prefix(str(request.path or ""))
    if route_path == "/system/status":
        upstream_path = "/api/v1/system/status"
        local_payload = _build_local_system_status_payload(
            local_mode,
            {},
            _extract_contracts(request.app),
            _route_class_summary(request.app),
        )
    elif route_path == "/dashboard/summary":
        upstream_path = "/api/v1/dashboard/summary"
        local_payload = _build_local_dashboard_summary_payload(local_mode)
    else:
        return _json_error(
            404,
            error="addon_endpoint_missing",
            error_type="not_found",
            retryable=False,
            details={"upstream_path": f"/api/v1{route_path}"},
        )

    bridge_payload, bridge_meta = await _fetch_bridge_json(
        request,
        upstream_path,
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )

    if bridge_payload is not None:
        response_payload = _merge_local_first(local_payload, bridge_payload)
    else:
        fallback_status = int(bridge_meta.get("status") or 0)
        if fallback_status not in (404, 405):
            return _json_error(
                fallback_status or 502,
                error=str(bridge_meta.get("error") or "upstream_request_failed"),
                error_type=str(bridge_meta.get("error_type") or _status_error_type(fallback_status or 502)),
                retryable=bool(bridge_meta.get("retryable", _is_retryable_status(fallback_status or 502))),
                details={
                    "upstream_path": upstream_path,
                    "upstream_status": fallback_status or 502,
                },
            )
        response_payload = dict(local_payload)

    response_payload["ha_adapter_bridge"] = _bridge_obs(
        bridge_meta,
        fallback_used=bridge_payload is None,
    )

    if route_path == "/system/status":
        response_payload = _normalize_system_status_scalars(response_payload)

    return web.json_response(response_payload)


async def _service_system_status(request: web.Request) -> web.Response:
    return await _bridge_to_ha_v1(request)


async def _service_dashboard_summary(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    local_payload = _build_local_dashboard_summary_payload(_local_core_mode())
    bridge_payload, bridge_meta = await _fetch_bridge_json(
        request,
        "/api/v1/dashboard/summary",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )

    if bridge_payload is not None:
        response_payload = _merge_local_first(local_payload, bridge_payload)
    else:
        response_payload = dict(local_payload)

    response_payload["ha_adapter_bridge"] = _bridge_obs(
        bridge_meta,
        fallback_used=bridge_payload is None,
    )
    return web.json_response(response_payload)


_VOICE_CANONICAL_TYPES: set[str] = {
    "stt_result",
    "intent_result",
    "tts_url",
    "done",
    "error",
}


def _normalize_voice_event_payload(raw_payload: Any) -> Any:
    if not isinstance(raw_payload, dict):
        return raw_payload

    payload: dict[str, Any] = dict(raw_payload)
    event_type = str(payload.get("type") or payload.get("event") or payload.get("name") or "").strip()

    if event_type in _VOICE_CANONICAL_TYPES:
        return payload

    if event_type in ("stt-end", "transcript_final"):
        text = (
            payload.get("text")
            or (payload.get("result") or {}).get("text")
            or (payload.get("data") or {}).get("stt_output", {}).get("text")
            or (payload.get("data") or {}).get("text")
            or ""
        )
        return {
            "type": "stt_result",
            "text": text,
            "legacy_type": event_type,
        }

    if event_type in ("intent-end", "reply"):
        reply = (
            payload.get("reply")
            or payload.get("text")
            or (payload.get("result") or {}).get("reply")
            or (payload.get("data") or {})
            .get("intent_output", {})
            .get("response", {})
            .get("speech", {})
            .get("plain", {})
            .get("speech")
            or ""
        )
        return {
            "type": "intent_result",
            "reply": reply,
            "legacy_type": event_type,
        }

    if event_type in ("tts-end", "audio_url"):
        url = (
            payload.get("url")
            or payload.get("audio_url")
            or (payload.get("data") or {}).get("tts_output", {}).get("url")
            or ""
        )
        return {
            "type": "tts_url",
            "url": url,
            "legacy_type": event_type,
        }

    if event_type in ("pipeline_end", "session_end"):
        return {
            "type": "done",
            "legacy_type": event_type,
        }

    if event_type == "error":
        message = str(payload.get("message") or payload.get("error") or "voice_pipeline_error")
        return {
            "type": "error",
            "message": message,
        }

    return payload


async def _proxy_ws_v1(
    request: web.Request,
    upstream_path: str,
    *,
    normalize_voice_events: bool = False,
) -> web.StreamResponse:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    if not _SA_HA_TOKEN:
        return _json_error(
            503,
            error="ha_token_not_configured",
            error_type="dependency_not_configured",
            retryable=False,
            details={"dependency": "home_assistant_api"},
        )

    session = await _ensure_session(request)
    query = dict(request.query)
    target_path = upstream_path if upstream_path.startswith("/") else f"/{upstream_path}"
    target_url = _ha_ws_url(target_path)

    try:
        ws_upstream = await session.ws_connect(
            target_url,
            params=query,
            headers=_ha_ws_headers(),
            heartbeat=30,
            timeout=_PROXY_TIMEOUT.total,
        )
    except asyncio.TimeoutError:
        return _json_error(504, error="upstream_timeout", error_type="timeout", retryable=True)
    except aiohttp.WSServerHandshakeError as exc:
        status = int(getattr(exc, "status", 0) or 0)
        if status > 0:
            return _json_error(
                status,
                error="upstream_request_failed",
                error_type=_status_error_type(status),
                retryable=_is_retryable_status(status),
            )
        return _json_error(502, error="upstream_unreachable", error_type="dependency_unreachable", retryable=True)
    except aiohttp.ClientError:
        return _json_error(502, error="upstream_unreachable", error_type="dependency_unreachable", retryable=True)
    except Exception as exc:
        if isinstance(exc, aiohttp.WSServerHandshakeError):
            status_raw = getattr(exc, "status", None)
            status = int(status_raw or 0)
            if status > 0:
                return _json_error(
                    status,
                    error="upstream_request_failed",
                    error_type=_status_error_type(status),
                    retryable=_is_retryable_status(status),
                )
            return _json_error(502, error="upstream_unreachable", error_type="dependency_unreachable", retryable=True)
        if isinstance(exc, aiohttp.ClientError):
            return _json_error(502, error="upstream_unreachable", error_type="dependency_unreachable", retryable=True)
        return _json_error(500, error="internal_server_error", error_type="internal_error", retryable=False)

    ws_client = web.WebSocketResponse(heartbeat=30)
    await ws_client.prepare(request)

    try:
        async def _up_to_client() -> None:
            async for msg in ws_upstream:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    raw_text = str(msg.data)
                    if not normalize_voice_events:
                        await ws_client.send_str(raw_text)
                        continue

                    normalized_text = raw_text
                    try:
                        raw_payload = json.loads(raw_text)
                        normalized_payload = _normalize_voice_event_payload(raw_payload)
                        if isinstance(normalized_payload, dict):
                            normalized_text = json.dumps(normalized_payload, ensure_ascii=False)
                    except Exception:
                        normalized_text = raw_text
                    await ws_client.send_str(normalized_text)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_client.send_bytes(msg.data)
                elif msg.type in (aiohttp.WSMsgType.ERROR, aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED):
                    break

        async def _client_to_up() -> None:
            async for msg in ws_client:
                if msg.type == web.WSMsgType.TEXT:
                    await ws_upstream.send_str(str(msg.data))
                elif msg.type == web.WSMsgType.BINARY:
                    await ws_upstream.send_bytes(msg.data)
                elif msg.type == web.WSMsgType.PING:
                    await ws_upstream.ping()
                elif msg.type == web.WSMsgType.PONG:
                    continue
                elif msg.type in (web.WSMsgType.CLOSE, web.WSMsgType.CLOSED, web.WSMsgType.ERROR):
                    break

        await asyncio.gather(_up_to_client(), _client_to_up())
    finally:
        try:
            await ws_upstream.close()
        except Exception:
            pass
        try:
            await ws_client.close()
        except Exception:
            pass
    return ws_client


async def _proxy_events_ws(request: web.Request) -> web.StreamResponse:
    topic = str(request.query.get("topic", "") or "").strip().lower()
    return await _proxy_ws_v1(
        request,
        "/api/v1/events",
        normalize_voice_events=(topic == "voice"),
    )


async def _proxy_voice_session_ws(request: web.Request) -> web.StreamResponse:
    return await _proxy_ws_v1(request, "/api/v1/voice/session")


async def _proxy_scene_trigger(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    scene_id = request.match_info.get("scene_id", "")
    try:
        sid = int(scene_id)
    except (TypeError, ValueError):
        return _json_error(
            400,
            error="invalid_scene_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if sid <= 0:
        return _json_error(
            400,
            error="invalid_scene_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/ai-scenes/{sid}/trigger")


async def _proxy_txn_rollback(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    txn_id = request.match_info.get("txn_id", "")
    try:
        tid = int(txn_id)
    except (TypeError, ValueError):
        return _json_error(
            400,
            error="invalid_transaction_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if tid <= 0:
        return _json_error(
            400,
            error="invalid_transaction_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/transactions/{tid}/rollback")


async def _service_decision_verify(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    try:
        body = await request.json()
    except Exception:
        return _json_error(
            400,
            error="invalid_json",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if not isinstance(body, dict):
        return _json_error(
            400,
            error="invalid_payload",
            error_type=_status_error_type(400),
            retryable=False,
        )

    try:
        _ensure_local_import_root()
        from core.decision.intent_verifier import CMD_SOURCE_SENSOR, IntentVerifier  # type: ignore[import]

        snapshot = body.get("snapshot")
        if not isinstance(snapshot, dict):
            snapshot = {
                "device_info": body.get("device_info", {}),
                "occ_map": body.get("occ_map", {}),
                "states": body.get("states", {}),
                "room_topology": body.get("room_topology", {}),
                "locked_people_rules": body.get("locked_people_rules", []),
            }
        actions = body.get("actions", [])
        if not isinstance(actions, list):
            return _json_error(
                400,
                error="actions_must_be_list",
                error_type=_status_error_type(400),
                retryable=False,
            )
        verifier = IntentVerifier.from_snapshot(snapshot)
        clean, rejected = verifier.verify(
            [item for item in actions if isinstance(item, dict)],
            trigger_room=str(body.get("trigger_room") or ""),
            is_global_cmd=bool(body.get("is_global_cmd", False)),
            cmd_source=str(body.get("cmd_source") or CMD_SOURCE_SENSOR),
        )
    except Exception as exc:
        _LOGGER.exception("[DecisionVerify] verifier failed: %s", exc)
        return _json_error(
            500,
            error="decision_verify_failed",
            error_type="internal_error",
            retryable=False,
            details={"message": str(exc)},
        )

    return web.json_response(
        {
            "ok": True,
            "clean_actions": clean,
            "rejected_actions": rejected,
            "summary": {
                "input_count": len(actions),
                "clean_count": len(clean),
                "rejected_count": len(rejected),
            },
        }
    )


async def _service_decision_fast_brain(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None

    try:
        _ensure_local_import_root()
        from core.decision import FastBrainEngine, SnapshotFeatureEncoder  # type: ignore[import]

        snapshot = body.get("snapshot")
        if not isinstance(snapshot, dict):
            snapshot = body
        device_info = snapshot.get("device_info") if isinstance(snapshot.get("device_info"), dict) else {}
        states = snapshot.get("states") if isinstance(snapshot.get("states"), dict) else {}
        entity_id = str(body.get("entity_id") or snapshot.get("entity_id") or "")
        new_state = str(body.get("new_state") or snapshot.get("new_state") or "")
        old_state = str(body.get("old_state") or snapshot.get("old_state") or "")
        if not entity_id:
            return _json_error(
                400,
                error="entity_id_required",
                error_type=_status_error_type(400),
                retryable=False,
            )
        features = body.get("features")
        if not isinstance(features, dict):
            encoder = SnapshotFeatureEncoder(
                device_info=device_info,
                states=states,
                room_topology=snapshot.get("room_topology") if isinstance(snapshot.get("room_topology"), dict) else {},
            )
            features = encoder.encode(entity_id, new_state, old_state)

        engine = FastBrainEngine(
            device_info=device_info,
            behavior_patterns=snapshot.get("behavior_patterns")
            if isinstance(snapshot.get("behavior_patterns"), list)
            else [],
            arrival_baseline=snapshot.get("arrival_baseline")
            if isinstance(snapshot.get("arrival_baseline"), list)
            else [],
        )
        result = engine.predict(features)
    except Exception as exc:
        _LOGGER.exception("[DecisionFastBrain] failed: %s", exc)
        return _json_error(
            500,
            error="decision_fast_brain_failed",
            error_type="internal_error",
            retryable=False,
            details={"message": str(exc)},
        )

    return web.json_response(
        {
            "ok": True,
            "matched": result is not None,
            "result": result,
            "features": features,
        }
    )


async def _service_decision_fast_path(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None

    try:
        _ensure_local_import_root()
        from core.decision import FastPathDecisionPipeline  # type: ignore[import]

        snapshot = body.get("snapshot")
        if not isinstance(snapshot, dict):
            snapshot = body
        entity_id = str(body.get("entity_id") or snapshot.get("entity_id") or "")
        new_state = str(body.get("new_state") or snapshot.get("new_state") or "")
        old_state = str(body.get("old_state") or snapshot.get("old_state") or "")
        if not entity_id:
            return _json_error(
                400,
                error="entity_id_required",
                error_type=_status_error_type(400),
                retryable=False,
            )
        result = FastPathDecisionPipeline(snapshot).run_fast_path(entity_id, new_state, old_state)
    except Exception as exc:
        _LOGGER.exception("[DecisionFastPath] failed: %s", exc)
        return _json_error(
            500,
            error="decision_fast_path_failed",
            error_type="internal_error",
            retryable=False,
            details={"message": str(exc)},
        )

    return web.json_response(
        {
            "ok": True,
            "matched": result is not None,
            "result": result,
        }
    )


async def _read_json_dict(request: web.Request) -> tuple[dict[str, Any] | None, web.Response | None]:
    try:
        body = await request.json()
    except Exception:
        return None, _json_error(
            400,
            error="invalid_json",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if not isinstance(body, dict):
        return None, _json_error(
            400,
            error="invalid_payload",
            error_type=_status_error_type(400),
            retryable=False,
        )
    return body, None


async def _service_context_build(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None

    try:
        _ensure_local_import_root()
        from core.context import build_context_bundle  # type: ignore[import]

        snapshot = body.get("snapshot")
        if not isinstance(snapshot, dict):
            snapshot = body
        bundle = build_context_bundle(
            snapshot,
            trigger=str(body.get("trigger") or ""),
            one_off_prompt=str(body.get("one_off_prompt") or ""),
            is_voice=bool(body.get("is_voice", False)),
            context_budget=int(body.get("context_budget") or 8000),
        )
    except Exception as exc:
        _LOGGER.exception("[ContextBuild] build failed: %s", exc)
        return _json_error(
            500,
            error="context_build_failed",
            error_type="internal_error",
            retryable=False,
            details={"message": str(exc)},
        )

    return web.json_response(
        {
            "ok": True,
            "bundle": bundle,
            "summary": {
                "bundle_version": bundle.get("bundle_version"),
                "trigger_room": bundle.get("trigger_room", ""),
                "estimated_tokens": (bundle.get("context_budget") or {}).get("estimated_tokens", 0),
            },
        }
    )


async def _service_memory_room_context(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None

    room = str(body.get("room") or "").strip()
    if not room:
        return _json_error(
            400,
            error="room_required",
            error_type=_status_error_type(400),
            retryable=False,
        )
    try:
        _ensure_local_import_root()
        from core.memory import MemoryContextRepository  # type: ignore[import]

        device_info = body.get("device_info")
        repo = MemoryContextRepository(_get_local_db())
        context_text = repo.get_room_context(
            room=room,
            trigger_type=str(body.get("trigger_type") or "arrival"),
            current_hour=int(body["current_hour"]) if body.get("current_hour") is not None else None,
            current_presence=str(body.get("current_presence") or ""),
            device_info=device_info if isinstance(device_info, dict) else None,
        )
    except Exception as exc:
        _LOGGER.exception("[MemoryRoomContext] build failed: %s", exc)
        return _json_error(
            500,
            error="memory_context_failed",
            error_type="internal_error",
            retryable=False,
            details={"message": str(exc)},
        )

    return web.json_response(
        {
            "ok": True,
            "room": room,
            "context_text": context_text,
            "source": "addon_core_memory",
        }
    )


def _extract_list_rows(payload: Any) -> list[dict[str, Any]] | None:
    if isinstance(payload, list):
        return [x for x in payload if isinstance(x, dict)]
    if isinstance(payload, dict) and isinstance(payload.get("data"), list):
        return [x for x in payload.get("data", []) if isinstance(x, dict)]
    return None


async def _service_list_read(
    request: web.Request,
    *,
    upstream_path: str,
    fallback_rows: list[dict[str, Any]] | None = None,
) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    bridge_payload, bridge_meta = await _fetch_bridge_json(
        request,
        upstream_path,
        allow_methods=("GET",),
        audit_route_kind="addon_local_service",
    )
    if bridge_payload is not None:
        rows = _extract_list_rows(bridge_payload)
        if rows is not None:
            return web.json_response(rows)
        return _json_error(
            502,
            error="invalid_upstream_payload",
            error_type="dependency_unreachable",
            retryable=True,
            details={
                "upstream_path": upstream_path,
                "upstream_status": int(bridge_meta.get("status") or 502),
            },
        )

    fallback_status = int(bridge_meta.get("status") or 0)
    if fallback_status in (404, 405):
        return web.json_response(list(fallback_rows or []))

    return _json_error(
        fallback_status or 502,
        error=str(bridge_meta.get("error") or "upstream_request_failed"),
        error_type=str(bridge_meta.get("error_type") or _status_error_type(fallback_status or 502)),
        retryable=bool(bridge_meta.get("retryable", _is_retryable_status(fallback_status or 502))),
        details={
            "upstream_path": upstream_path,
            "upstream_status": fallback_status or 502,
        },
    )


async def _service_memory_profiles(request: web.Request) -> web.Response:
    return await _service_list_read(request, upstream_path="/api/v1/memory/profiles", fallback_rows=[])


async def _service_memory_habits(request: web.Request) -> web.Response:
    if _core_storage_enabled():
        auth_err = _require_auth(request)
        if auth_err is not None:
            return auth_err
        try:
            _ensure_local_import_root()
            from core.memory import HabitRepository  # type: ignore[import]

            rows = HabitRepository(_get_local_db()).list_habits()
            return web.json_response(
                {
                    "ok": True,
                    "data": rows,
                    "source": "addon_core_storage",
                }
            )
        except Exception as exc:
            _LOGGER.warning("[MemoryHabits] local storage read failed: %s", exc)
            if _core_storage_strict():
                return _json_error(
                    500,
                    error="local_memory_habits_failed",
                    error_type="internal_error",
                    retryable=False,
                    details={"message": str(exc)},
                )
    return await _service_list_read(request, upstream_path="/api/v1/memory/habits", fallback_rows=[])


async def _service_corrections(request: web.Request) -> web.Response:
    return await _service_list_read(request, upstream_path="/api/v1/corrections", fallback_rows=[])


async def _service_license_status(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    upstream_path = "/api/v1/license/status"
    bridge_payload, bridge_meta = await _fetch_bridge_json(
        request,
        upstream_path,
        allow_methods=("GET",),
        audit_route_kind="addon_local_service",
    )
    if bridge_payload is not None:
        if isinstance(bridge_payload, dict):
            return web.json_response(bridge_payload)
        return web.json_response({})

    fallback_status = int(bridge_meta.get("status") or 0)
    if fallback_status in (404, 405):
        return web.json_response({})

    return _json_error(
        fallback_status or 502,
        error=str(bridge_meta.get("error") or "upstream_request_failed"),
        error_type=str(bridge_meta.get("error_type") or _status_error_type(fallback_status or 502)),
        retryable=bool(bridge_meta.get("retryable", _is_retryable_status(fallback_status or 502))),
        details={
            "upstream_path": upstream_path,
            "upstream_status": fallback_status or 502,
        },
    )


async def _service_devices(request: web.Request) -> web.Response:
    return await _service_list_read(request, upstream_path="/api/v1/devices", fallback_rows=[])


async def _service_rooms(request: web.Request) -> web.Response:
    return await _service_list_read(request, upstream_path="/api/v1/rooms", fallback_rows=[])


async def _service_rooms_topology(request: web.Request) -> web.Response:
    return await _service_list_read(request, upstream_path="/api/v1/rooms/topology", fallback_rows=[])


async def _service_rooms_topology_save(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/rooms/topology",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_transactions_detail(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err

    txn_id = request.match_info.get("txn_id", "")
    try:
        tid = int(txn_id)
    except (TypeError, ValueError):
        return _json_error(
            400,
            error="invalid_transaction_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if tid <= 0:
        return _json_error(
            400,
            error="invalid_transaction_id",
            error_type=_status_error_type(400),
            retryable=False,
        )

    return await _proxy_to_ha(
        request,
        upstream_path=f"/api/v1/transactions/{tid}",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_learning_stats(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/learning/stats",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_devices_discover(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/devices/discover",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_devices_batch_add(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/devices/batch-add",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_device_patch(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    entity_id = request.match_info.get("entity_id", "")
    return await _proxy_to_ha(
        request,
        upstream_path=f"/api/v1/devices/{entity_id}",
        allow_methods=("PATCH",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_device_delete(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    entity_id = request.match_info.get("entity_id", "")
    return await _proxy_to_ha(
        request,
        upstream_path=f"/api/v1/devices/{entity_id}",
        allow_methods=("DELETE",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_device_control(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    entity_id = request.match_info.get("entity_id", "")
    return await _proxy_to_ha(
        request,
        upstream_path=f"/api/v1/devices/{entity_id}/control",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_presence_sensors(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/presence/sensors",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_presence_sensor_type(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/presence/sensors/type",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_pair_create(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_v1_then_root(
        request,
        upstream_v1_path="/api/v1/device/pair/create",
        upstream_root_path="/api/smart_agent/pair/create",
        allow_methods=("POST",),
    )


async def _service_rooms_sync(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/rooms/sync",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_system_brand(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/system/brand",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_settings_system_get(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/settings/system",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_energy(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/energy",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_mcp_status(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/mcp/status",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_license_verify(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/license/verify",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_backups_create(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/backups/create",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_backups_restore(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/backups/restore",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_backups_delete(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/backups/delete",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_patrol_trigger(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/patrol/trigger",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_settings_system_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/settings/system",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_mcp_settings_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/mcp/settings",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_auth_login(request: web.Request) -> web.Response:
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/auth/login",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_auth_logout(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/auth/logout",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_pair_start(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/device/pair/start",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_pair_confirm(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/device/pair/confirm",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_voice_interrupt(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/voice/interrupt",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scenes_list(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scene_approve(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes/approve",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scene_reject(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes/reject",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scene_trigger(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes/trigger",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_transactions_list(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/transactions",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_backups_list(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/backups",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scenes_analyze(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes/analyze",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_ai_scenes_create_from_text(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/ai-scenes/create-from-text",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_mode_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None
    mode = str(body.get("mode") or "").strip().lower()
    if mode not in ("home", "showroom"):
        return _json_error(
            400,
            error="invalid_mode",
            error_type="validation_error",
            retryable=False,
        )
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/mode",
        allow_methods=("POST",),
        body_override={"mode": mode},
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_showroom_scene_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None
    clean_body = {
        "scene": str(body.get("scene") or "").strip(),
        "custom_prompt": str(body.get("custom_prompt") or "").strip(),
        "is_command": bool(body.get("is_command", False)),
    }
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/showroom/scene",
        allow_methods=("POST",),
        body_override=clean_body,
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_showroom_scene_config_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    body, err = await _read_json_dict(request)
    if err is not None:
        return err
    assert body is not None
    scene_key = str(body.get("scene_key") or "").strip()
    if not scene_key:
        return _json_error(
            400,
            error="scene_key_required",
            error_type="validation_error",
            retryable=False,
        )
    clean_body = {
        "scene_key": scene_key,
        "label": body.get("label"),
        "virtual_time": body.get("virtual_time"),
        "scene_desc": body.get("scene_desc"),
        "hint": body.get("hint"),
    }
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/showroom/scene-config",
        allow_methods=("POST",),
        body_override=clean_body,
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_mcp_protocol_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/smart_agent/mcp",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_vision_cameras_get(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/vision/cameras",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_vision_zones_post(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/vision/zones",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_vision_zones_save(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/vision/zones/save",
        allow_methods=("POST",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _service_auth_me(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/auth/me",
        allow_methods=("GET",),
        audit_route_kind="ha_adapter_bridge",
    )


async def _proxy_profile_action(request: web.Request, action: str | None = None) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    act = str(action or "").strip().lower()
    if not act:
        act = str((request.match_info or {}).get("action") or "").strip().lower()
    if act not in ("add", "delete", "toggle-lock", "toggle_lock"):
        return _json_error(
            400,
            error="invalid_action",
            error_type=_status_error_type(400),
            retryable=False,
            details={"action": act, "scope": "profiles"},
        )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/memory/profiles/{act}", allow_methods=("POST",))


async def _proxy_habit_action(request: web.Request, action: str | None = None) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    act = str(action or "").strip().lower()
    if not act:
        act = str((request.match_info or {}).get("action") or "").strip().lower()
    if act not in ("add", "delete", "toggle-lock", "toggle_lock"):
        return _json_error(
            400,
            error="invalid_action",
            error_type=_status_error_type(400),
            retryable=False,
            details={"action": act, "scope": "habits"},
        )
    if _core_storage_enabled():
        try:
            body, err = await _read_json_dict(request)
            if err is not None:
                return err
            assert body is not None
            content = str(body.get("content") or body.get("text") or "").strip()
            _ensure_local_import_root()
            from core.memory import HabitRepository  # type: ignore[import]

            result = HabitRepository(_get_local_db()).apply_action(act, content)
            status = 200 if result.get("ok") else 409
            return web.json_response(
                {
                    "ok": bool(result.get("ok")),
                    "action": act,
                    "result": result,
                    "data": HabitRepository(_get_local_db()).list_habits(),
                    "source": "addon_core_storage",
                },
                status=status,
            )
        except Exception as exc:
            _LOGGER.warning("[HabitAction] local storage action failed: %s", exc)
            if _core_storage_strict():
                return _json_error(
                    500,
                    error="local_habit_action_failed",
                    error_type="internal_error",
                    retryable=False,
                    details={"message": str(exc)},
                )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/memory/habits/{act}", allow_methods=("POST",))


async def _proxy_correction_action(request: web.Request, action: str | None = None) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    act = str(action or "").strip().lower()
    if act not in ("dismiss", "report"):
        return _json_error(
            400,
            error="invalid_action",
            error_type=_status_error_type(400),
            retryable=False,
            details={"action": act, "scope": "corrections"},
        )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/corrections/{act}", allow_methods=("POST",))


async def _proxy_vision_camera_action(request: web.Request, action: str | None = None) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    act = str(action or "").strip().lower()
    if not act:
        path = str(request.path or "").lower()
        if path.endswith("/register"):
            act = "register"
        elif path.endswith("/delete"):
            act = "delete"
    if act not in ("register", "delete"):
        return _json_error(
            400,
            error="invalid_action",
            error_type=_status_error_type(400),
            retryable=False,
            details={"action": act, "scope": "vision_cameras"},
        )
    return await _proxy_to_ha(request, upstream_path=f"/api/v1/vision/cameras/{act}", allow_methods=("POST",))


async def _proxy_ai_scene_delete(request: web.Request) -> web.Response:
    auth_err = _require_auth(request)
    if auth_err is not None:
        return auth_err
    scene_id = request.match_info.get("scene_id", "")
    try:
        sid = int(scene_id)
    except (TypeError, ValueError):
        return _json_error(
            400,
            error="invalid_scene_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    if sid <= 0:
        return _json_error(
            400,
            error="invalid_scene_id",
            error_type=_status_error_type(400),
            retryable=False,
        )
    body = {
        "id": sid,
    }
    return await _proxy_to_ha(
        request,
        upstream_path=f"/api/v1/ai-scenes/{sid}",
        allow_methods=("POST",),
        body_override=body,
    )


async def _proxy_logs_dates(request: web.Request) -> web.Response:
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/logs/dates",
        allow_methods=("GET",),
    )


async def _proxy_logs_content(request: web.Request) -> web.Response:
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/logs/content",
        allow_methods=("GET",),
    )


async def _proxy_logs_info(request: web.Request) -> web.Response:
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/logs/info",
        allow_methods=("GET",),
    )


async def _proxy_scene_export_yaml(request: web.Request) -> web.Response:
    return await _proxy_to_ha(
        request,
        upstream_path="/api/v1/scenes/export-yaml",
        allow_methods=("GET", "POST"),
    )


def _register_api_v1_routes(app: web.Application) -> None:
    routes: tuple[tuple[str, str, Any], ...] = (
        ("GET", "/health", health),
        ("POST", "/infer", infer),
        ("GET", "/status", get_status),
        ("GET", "/capabilities", capabilities),
        ("GET", "/core/status", core_status),
        ("POST", "/decision/verify", _service_decision_verify),
        ("POST", "/decision/fast-brain", _service_decision_fast_brain),
        ("POST", "/decision/fast-path", _service_decision_fast_path),
        ("POST", "/context/build", _service_context_build),
        ("POST", "/memory/room-context", _service_memory_room_context),
        ("GET", "/diagnostics", diagnostics),
        ("GET", "/system/diagnostics", diagnostics),
        ("GET", "/addon/system-status", addon_system_status),
        ("POST", "/mode", _service_mode_post),
        ("POST", "/showroom/scene", _service_showroom_scene_post),
        ("POST", "/showroom/scene-config", _service_showroom_scene_config_post),
        ("GET", "/system/status", _service_system_status),
        ("GET", "/system/compat-stats", _service_compat_stats),
        ("GET", "/system/deprecation-readiness", _service_deprecation_readiness),
        ("GET", "/system/dryoff-session-report", _service_dryoff_session_report),
        ("GET", "/dashboard/summary", _service_dashboard_summary),
        ("GET", "/addon/dashboard-summary", dashboard_summary_local),
        ("GET", "/devices", _service_devices),
        ("POST", "/devices/discover", _service_devices_discover),
        ("POST", "/devices/batch-add", _service_devices_batch_add),
        ("PATCH", "/devices/{entity_id}", _service_device_patch),
        ("DELETE", "/devices/{entity_id}", _service_device_delete),
        ("POST", "/devices/{entity_id}/control", _service_device_control),
        ("GET", "/presence/sensors", _service_presence_sensors),
        ("POST", "/presence/sensors/type", _service_presence_sensor_type),
        ("GET", "/rooms", _service_rooms),
        ("POST", "/rooms/sync", _service_rooms_sync),
        ("GET", "/rooms/topology", _service_rooms_topology),
        ("POST", "/rooms/topology", _service_rooms_topology_save),
        ("GET", "/learning/stats", _service_learning_stats),
        ("GET", "/ai-scenes", _service_ai_scenes_list),
        ("POST", "/ai-scenes/approve", _service_ai_scene_approve),
        ("POST", "/ai-scenes/reject", _service_ai_scene_reject),
        ("POST", "/ai-scenes/trigger", _service_ai_scene_trigger),
        ("POST", "/ai-scenes/{scene_id}/trigger", _proxy_scene_trigger),
        ("POST", "/ai-scenes/analyze", _service_ai_scenes_analyze),
        ("POST", "/ai-scenes/create-from-text", _service_ai_scenes_create_from_text),
        ("POST", "/ai-scenes/{scene_id}", _proxy_ai_scene_delete),
        ("GET", "/transactions", _service_transactions_list),
        ("GET", "/transactions/{txn_id}", _service_transactions_detail),
        ("POST", "/transactions/{txn_id}/rollback", _proxy_txn_rollback),
        ("GET", "/memory/profiles", _service_memory_profiles),
        ("POST", "/memory/profiles/{action}", _proxy_profile_action),
        ("GET", "/memory/habits", _service_memory_habits),
        ("POST", "/memory/habits/{action}", _proxy_habit_action),
        ("GET", "/corrections", _service_corrections),
        ("POST", "/corrections/{action}", _proxy_correction_action),
        ("GET", "/license/status", _service_license_status),
        ("POST", "/license/verify", _service_license_verify),
        ("GET", "/backups", _service_backups_list),
        ("POST", "/backups/create", _service_backups_create),
        ("POST", "/backups/restore", _service_backups_restore),
        ("POST", "/backups/delete", _service_backups_delete),
        ("POST", "/patrol/trigger", _service_patrol_trigger),
        ("GET", "/energy", _service_energy),
        ("GET", "/mcp/status", _service_mcp_status),
        ("POST", "/mcp", _service_mcp_protocol_post),
        ("POST", "/mcp/protocol", _service_mcp_protocol_post),
        ("POST", "/mcp/settings", _service_mcp_settings_post),
        ("GET", "/vision/cameras", _service_vision_cameras_get),
        ("POST", "/vision/cameras/{action}", _proxy_vision_camera_action),
        ("POST", "/vision/cameras/register", _proxy_vision_camera_action),
        ("POST", "/vision/cameras/delete", _proxy_vision_camera_action),
        ("POST", "/vision/zones", _service_vision_zones_post),
        ("POST", "/vision/zones/save", _service_vision_zones_save),
        ("GET", "/system/brand", _service_system_brand),
        ("GET", "/settings/system", _service_settings_system_get),
        ("POST", "/settings/system", _service_settings_system_post),
        ("GET", "/logs/dates", _proxy_logs_dates),
        ("GET", "/logs/content", _proxy_logs_content),
        ("GET", "/logs/info", _proxy_logs_info),
        ("GET", "/scenes/export-yaml", _proxy_scene_export_yaml),
        ("POST", "/scenes/export-yaml", _proxy_scene_export_yaml),
        ("POST", "/auth/login", _service_auth_login),
        ("GET", "/auth/me", _service_auth_me),
        ("POST", "/auth/logout", _service_auth_logout),
        ("POST", "/device/pair/create", _service_pair_create),
        ("POST", "/device/pair/start", _service_pair_start),
        ("POST", "/device/pair/confirm", _service_pair_confirm),
        ("POST", "/voice/interrupt", _service_voice_interrupt),
    )
    for method, path, handler in routes:
        app.router.add_route(method, f"/api/v1{path}", handler)


def _ui_root_path() -> Path:
    return Path(_SA_UI_ROOT).expanduser().resolve()


def _screen_root_path() -> Path:
    return Path(_SA_SCREEN_ROOT).expanduser().resolve()


async def _api_not_found(request: web.Request) -> web.Response:
    return _json_error(
        404,
        error="addon_endpoint_missing",
        error_type="not_found",
        retryable=False,
        details={"path": request.path},
    )


async def _serve_static_spa(
    request: web.Request,
    *,
    root: Path,
    missing_error: str,
    asset_error: str,
    root_detail_key: str,
) -> web.StreamResponse:
    if request.method.upper() not in ("GET", "HEAD"):
        return _json_error(
            404,
            error="addon_endpoint_missing",
            error_type="not_found",
            retryable=False,
            details={"path": request.path},
        )

    index_file = root / "index.html"
    if not index_file.is_file():
        return _json_error(
            503,
            error=missing_error,
            error_type="dependency_not_configured",
            retryable=False,
            details={root_detail_key: str(root)},
        )

    raw_path = str(request.match_info.get("path") or "").lstrip("/")
    if not raw_path:
        return web.FileResponse(index_file)

    candidate = (root / raw_path).resolve()
    try:
        candidate.relative_to(root)
    except ValueError:
        return _json_error(
            404,
            error=asset_error,
            error_type="not_found",
            retryable=False,
        )

    if candidate.is_dir():
        candidate = candidate / "index.html"
    if candidate.is_file():
        return web.FileResponse(candidate)

    if "." in Path(raw_path).name:
        return _json_error(
            404,
            error=asset_error,
            error_type="not_found",
            retryable=False,
        )
    return web.FileResponse(index_file)


async def _serve_ui_asset(request: web.Request) -> web.StreamResponse:
    return await _serve_static_spa(
        request,
        root=_ui_root_path(),
        missing_error="ui_dist_not_installed",
        asset_error="ui_asset_not_found",
        root_detail_key="ui_root",
    )


async def _redirect_screen_root(request: web.Request) -> web.StreamResponse:
    if request.method.upper() not in ("GET", "HEAD"):
        return _json_error(
            404,
            error="addon_endpoint_missing",
            error_type="not_found",
            retryable=False,
            details={"path": request.path},
        )
    raise web.HTTPPermanentRedirect(location="/screen/")


async def _serve_screen_asset(request: web.Request) -> web.StreamResponse:
    return await _serve_static_spa(
        request,
        root=_screen_root_path(),
        missing_error="screen_dist_not_installed",
        asset_error="screen_asset_not_found",
        root_detail_key="screen_root",
    )


async def _on_cleanup(app: web.Application) -> None:
    global _LOCAL_DB
    session: aiohttp.ClientSession | None = app.get("http_session")
    if session is not None and not session.closed:
        await session.close()
    if _LOCAL_DB is not None:
        try:
            _LOCAL_DB.close()
        finally:
            _LOCAL_DB = None


def create_app() -> web.Application:
    app = web.Application(middlewares=[_error_middleware])

    # 基础运行态
    app.router.add_get("/health", health)
    app.router.add_post("/infer", infer)
    app.router.add_get("/status", get_status)
    app.router.add_get("/capabilities", capabilities)
    app.router.add_get("/core/status", core_status)
    app.router.add_post("/decision/verify", _service_decision_verify)
    app.router.add_post("/decision/fast-brain", _service_decision_fast_brain)
    app.router.add_post("/decision/fast-path", _service_decision_fast_path)
    app.router.add_post("/context/build", _service_context_build)
    app.router.add_post("/memory/room-context", _service_memory_room_context)
    app.router.add_get("/diagnostics", diagnostics)
    app.router.add_get("/system/diagnostics", diagnostics)
    app.router.add_get("/addon/system-status", addon_system_status)
    app.router.add_post("/mode", _service_mode_post)
    app.router.add_post("/showroom/scene", _service_showroom_scene_post)
    app.router.add_post("/showroom/scene-config", _service_showroom_scene_config_post)

    # 核心服务面（Add-on 对外稳定入口）
    app.router.add_get("/system/status", _service_system_status)
    app.router.add_get("/system/compat-stats", _service_compat_stats)
    app.router.add_get("/system/deprecation-readiness", _service_deprecation_readiness)
    app.router.add_get("/system/dryoff-session-report", _service_dryoff_session_report)
    app.router.add_get("/dashboard/summary", _service_dashboard_summary)
    app.router.add_get("/addon/dashboard-summary", dashboard_summary_local)
    app.router.add_get("/devices", _service_devices)
    app.router.add_get("/rooms", _service_rooms)
    app.router.add_get("/ai-scenes", _service_ai_scenes_list)
    app.router.add_post("/ai-scenes/approve", _service_ai_scene_approve)
    app.router.add_post("/ai-scenes/reject", _service_ai_scene_reject)
    app.router.add_post("/ai-scenes/trigger", _service_ai_scene_trigger)
    app.router.add_post("/ai-scenes/{scene_id}/trigger", _proxy_scene_trigger)
    app.router.add_get("/transactions", _service_transactions_list)
    app.router.add_get("/transactions/{txn_id}", _service_transactions_detail)
    app.router.add_post("/transactions/{txn_id}/rollback", _proxy_txn_rollback)

    # 第四批服务面（memory/corrections/license/backups/patrol）
    app.router.add_get("/memory/profiles", _service_memory_profiles)
    app.router.add_post("/memory/profiles/{action}", _proxy_profile_action)
    app.router.add_get("/memory/habits", _service_memory_habits)
    app.router.add_post("/memory/habits/{action}", _proxy_habit_action)
    app.router.add_get("/corrections", _service_corrections)
    app.router.add_post("/corrections/{action}", _proxy_correction_action)
    app.router.add_get("/license/status", _service_license_status)
    app.router.add_post("/license/verify", _service_license_verify)
    app.router.add_get("/backups", _service_backups_list)
    app.router.add_post("/backups/create", _service_backups_create)
    app.router.add_post("/backups/restore", _service_backups_restore)
    app.router.add_post("/backups/delete", _service_backups_delete)
    app.router.add_post("/patrol/trigger", _service_patrol_trigger)

    # 第五批服务面（energy + ai-scene analyze/create-from-text + canonical delete-by-id）
    app.router.add_get("/energy", _service_energy)
    app.router.add_post("/ai-scenes/analyze", _service_ai_scenes_analyze)
    app.router.add_post("/ai-scenes/create-from-text", _service_ai_scenes_create_from_text)
    app.router.add_post("/ai-scenes/{scene_id}", _proxy_ai_scene_delete)

    # 第六批服务面（devices/rooms/learning）
    app.router.add_post("/devices/discover", _service_devices_discover)
    app.router.add_post("/devices/batch-add", _service_devices_batch_add)
    app.router.add_patch("/devices/{entity_id}", _service_device_patch)
    app.router.add_delete("/devices/{entity_id}", _service_device_delete)
    app.router.add_post("/devices/{entity_id}/control", _service_device_control)
    app.router.add_get("/presence/sensors", _service_presence_sensors)
    app.router.add_post("/presence/sensors/type", _service_presence_sensor_type)
    app.router.add_post("/rooms/sync", _service_rooms_sync)
    app.router.add_get("/rooms/topology", _service_rooms_topology)
    app.router.add_post("/rooms/topology", _service_rooms_topology_save)
    app.router.add_get("/learning/stats", _service_learning_stats)

    # 第七批服务面（vision，白名单仅保留 /vision/*）
    app.router.add_get("/vision/cameras", _service_vision_cameras_get)
    app.router.add_post("/vision/cameras/{action}", _proxy_vision_camera_action)
    app.router.add_post("/vision/cameras/register", _proxy_vision_camera_action)
    app.router.add_post("/vision/cameras/delete", _proxy_vision_camera_action)
    app.router.add_post("/vision/zones", _service_vision_zones_post)
    app.router.add_post("/vision/zones/save", _service_vision_zones_save)

    # 第八批服务面（system brand/settings）
    app.router.add_get("/system/brand", _service_system_brand)
    app.router.add_get("/settings/system", _service_settings_system_get)
    app.router.add_post("/settings/system", _service_settings_system_post)

    # 第九批服务面（logs/export，优先 v1，404/405 回退 root-base）
    app.router.add_get("/logs/dates", _proxy_logs_dates)
    app.router.add_get("/logs/content", _proxy_logs_content)
    app.router.add_get("/logs/info", _proxy_logs_info)
    app.router.add_get("/scenes/export-yaml", _proxy_scene_export_yaml)
    app.router.add_post("/scenes/export-yaml", _proxy_scene_export_yaml)

    # 第七批服务面（mcp）
    app.router.add_get("/mcp/status", _service_mcp_status)
    app.router.add_post("/mcp", _service_mcp_protocol_post)
    app.router.add_post("/mcp/protocol", _service_mcp_protocol_post)
    app.router.add_post("/api/smart_agent/mcp", _service_mcp_protocol_post)
    app.router.add_post("/mcp/settings", _service_mcp_settings_post)

    # 第十批服务面（pair + voice interrupt）
    app.router.add_post("/auth/login", _service_auth_login)
    app.router.add_get("/auth/me", _service_auth_me)
    app.router.add_post("/auth/logout", _service_auth_logout)
    app.router.add_post("/device/pair/create", _service_pair_create)
    app.router.add_post("/device/pair/start", _service_pair_start)
    app.router.add_post("/device/pair/confirm", _service_pair_confirm)
    app.router.add_post("/voice/interrupt", _service_voice_interrupt)

    # 第十一批服务面（会话读链路 WS）
    app.router.add_get("/events", _proxy_events_ws)
    app.router.add_get("/api/v1/events", _proxy_events_ws)
    app.router.add_get("/voice/session", _proxy_voice_session_ws)
    app.router.add_get("/api/v1/voice/session", _proxy_voice_session_ws)

    _register_api_v1_routes(app)
    app.router.add_route("*", "/api/{path:.*}", _api_not_found)
    app.router.add_route("*", "/screen", _redirect_screen_root)
    app.router.add_route("*", "/screen/", _serve_screen_asset)
    app.router.add_route("*", "/screen/{path:.*}", _serve_screen_asset)
    app.router.add_route("*", "/", _serve_ui_asset)
    app.router.add_route("*", "/{path:.*}", _serve_ui_asset)

    app.on_cleanup.append(_on_cleanup)
    return app


def _env_port(name: str, default: int) -> int:
    try:
        return int(str(os.getenv(name, str(default)) or str(default)))
    except ValueError:
        return int(default)


def _listen_ports() -> list[int]:
    ports: list[int] = []
    for port in (
        _env_port("SA_INTERNAL_PORT", 18099),
        _env_port("SA_GATEWAY_UI_PORT", 8234),
    ):
        if port > 0 and port not in ports:
            ports.append(port)
    return ports


async def _run_app_on_ports(app: web.Application, ports: list[int]) -> None:
    runner = web.AppRunner(app)
    await runner.setup()
    try:
        for port in ports:
            site = web.TCPSite(runner, host="0.0.0.0", port=port)
            await site.start()
            _LOGGER.info("[SmartAgent Add-on] listening on 0.0.0.0:%s", port)
        await asyncio.Event().wait()
    finally:
        await runner.cleanup()


if __name__ == "__main__":
    ports = _listen_ports()
    _LOGGER.info(
        "[SmartAgent Add-on] 启动 API 服务 | port=%s ha=%s token=%s auth=%s",
        ",".join(str(p) for p in ports),
        _SA_HA_URL,
        _redact_token(_SA_HA_TOKEN),
        "enabled" if _SA_AUTH_TOKEN else "disabled",
    )
    try:
        asyncio.run(_run_app_on_ports(create_app(), ports))
    except KeyboardInterrupt:
        pass
