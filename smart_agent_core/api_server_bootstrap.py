"""Bootstrap, wiring, and aiohttp app assembly for the SmartAgent add-on API server."""
from __future__ import annotations

import asyncio
import faulthandler
from pathlib import Path
from typing import Any

import api_server_runtime as _runtime_state
from aiohttp import web

faulthandler.enable(all_threads=True)

__all__ = [
    "configure_app_namespace",
    "configure_ingress_wiring",
    "create_app",
    "_serve_static_spa",
    "_reject_native_api_ingress",
    "main",
]
# --- Merged from api_server_app.py (P3B consolidation) ---

_NAMESPACE: dict[str, Any] = {}


def configure_app_namespace(namespace: dict[str, Any]) -> None:
    """Bind route handlers, constants, and helper functions from api_server.py."""
    _NAMESPACE.clear()
    _NAMESPACE.update(namespace)
    globals().update(namespace)


def _split_ingress_api_v1_routes() -> tuple[tuple[str, str, Any], ...]:
    return (
        *_logs_api_v1_routes(),
        *_backups_api_v1_routes(),
        *_patrol_api_v1_routes(),
        *_settings_api_v1_routes(),
        *_scenes_api_v1_routes(),
        *_rooms_api_v1_routes(),
        *_mcp_api_v1_routes(),
        *_presence_api_v1_routes(),
        *_transactions_api_v1_routes(),
        *_learning_api_v1_routes(),
        *_devices_api_v1_routes(),
        *_operations_api_v1_routes(),
        *_planning_api_v1_routes(),
    )






def _register_api_v1_routes(
    app: web.Application,
    *,
    extra_routes: tuple[tuple[str, str, Any], ...] = (),
) -> None:
    routes: tuple[tuple[str, str, Any], ...] = (
        ("GET", "/health", health),
        ("POST", "/infer", infer),
        ("GET", "/status", get_status),
        ("GET", "/capabilities", capabilities),
        ("GET", "/core/status", core_status),
        ("POST", "/decision/verify", _service_decision_verify),
        ("POST", "/decision/fast-brain", _service_decision_fast_brain),
        ("POST", "/decision/fast-path", _service_decision_fast_path),
        ("POST", "/decision/run", _service_decision_run),
        ("POST", "/internal/event", _service_internal_event),
        ("POST", "/context/build", _service_context_build),
        ("POST", "/memory/room-context", _service_memory_room_context),
        ("GET", "/diagnostics", diagnostics),
        ("GET", "/system/diagnostics", diagnostics),
        ("GET", "/addon/system-status", addon_system_status),
        ("POST", "/mode", _service_mode_post),
        ("POST", "/showroom/scene", _service_showroom_scene_post),
        ("POST", "/showroom/scene-config", _service_showroom_scene_config_post),
        ("GET", "/system/status", _service_system_status),
        ("GET", "/dashboard/summary", _service_dashboard_summary),
        ("GET", "/addon/dashboard-summary", dashboard_summary_local),
        ("GET", "/ai-scenes", _service_ai_scenes_list),
        ("POST", "/ai-scenes/approve", _service_ai_scene_approve),
        ("POST", "/ai-scenes/reject", _service_ai_scene_reject),
        ("POST", "/ai-scenes/trigger", _service_ai_scene_trigger),
        ("POST", "/ai-scenes/{scene_id}/trigger", _proxy_scene_trigger),
        ("POST", "/ai-scenes/analyze", _service_ai_scenes_analyze),
        ("POST", "/ai-scenes/create-from-text", _service_ai_scenes_create_from_text),
        ("POST", "/ai-scenes/sync-fixed-lighting", _service_ai_scenes_sync_fixed_lighting),
        ("POST", "/ai-scenes/{scene_id}/archive", _service_ai_scene_archive),
        ("POST", "/ai-scenes/{scene_id}", _service_ai_scene_delete),
        ("GET", "/memory/profiles", _service_memory_profiles),
        ("POST", "/memory/profiles/{action}", _proxy_profile_action),
        ("GET", "/memory/habits", _service_memory_habits),
        ("POST", "/memory/habits/{action}", _proxy_habit_action),
        ("GET", "/corrections", _service_corrections),
        ("POST", "/corrections/{action}", _proxy_correction_action),
        ("GET", "/license/status", _service_license_status),
        ("POST", "/license/verify", _service_license_verify),
        ("GET", "/energy", _service_energy),
        ("GET", "/vision/cameras", _service_vision_cameras_get),
        ("POST", "/vision/cameras/{action}", _proxy_vision_camera_action),
        ("POST", "/vision/cameras/register", _proxy_vision_camera_action),
        ("POST", "/vision/cameras/delete", _proxy_vision_camera_action),
        ("POST", "/vision/zones", _service_vision_zones_post),
        ("POST", "/vision/zones/save", _service_vision_zones_save),
        ("GET", "/system/brand", _service_system_brand),
        ("POST", "/auth/login", _service_auth_login),
        ("GET", "/auth/me", _service_auth_me),
        ("POST", "/auth/logout", _service_auth_logout),
        ("POST", "/device/pair/create", _service_pair_create),
        ("GET", "/device/pair/start", _service_pair_start),
        ("POST", "/device/pair/start", _service_pair_start),
        ("POST", "/device/pair/confirm", _service_pair_confirm),
        ("POST", "/voice/interrupt", _service_voice_interrupt),
        ("GET", "/core/config", _service_core_config_get),
        ("POST", "/core/config", _service_core_config_post),
        ("GET", "/ai-behavior", _service_ai_behavior),
        ("POST", "/ai-behavior/{kind}/{source_id}/{action}", _service_ai_behavior_action),
        ("GET", "/behavior-patterns", _service_behavior_patterns),
        ("POST", "/behavior-patterns/{pattern_id}/{action}", _service_behavior_pattern_action),
        ("POST", "/ha/execute", _service_ha_execute_alias),
    ) + _split_ingress_api_v1_routes() + extra_routes
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


_SPA_SHELL_CACHE_HEADERS = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0",
}


def _static_file_response(path: Path) -> web.FileResponse:
    if path.name == "index.html":
        return web.FileResponse(path, headers=dict(_SPA_SHELL_CACHE_HEADERS))
    return web.FileResponse(path)


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
        return _static_file_response(index_file)
    if raw_path.lower() == "favicon.ico":
        favicon_svg = root / "favicon.svg"
        if favicon_svg.is_file():
            return _static_file_response(favicon_svg)

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
        return _static_file_response(candidate)

    if "." in Path(raw_path).name:
        return _json_error(
            404,
            error=asset_error,
            error_type="not_found",
            retryable=False,
        )
    return _static_file_response(index_file)


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
    session = app.get("http_session")
    if session is not None and not session.closed:
        await session.close()
    local_db = getattr(_runtime_state, "_LOCAL_DB", None)
    if local_db is not None:
        try:
            local_db.close()
        finally:
            setattr(_runtime_state, "_LOCAL_DB", None)
            _NAMESPACE["_LOCAL_DB"] = None
            globals()["_LOCAL_DB"] = None


def create_app() -> web.Application:
    app = web.Application(middlewares=[_error_middleware, _pause_guard_middleware])
    app.cleanup_ctx.append(_http_session_context)
    model_evolution_handler = make_model_evolution_summary_handler(
        ModelEvolutionRouteDeps(
            require_auth=_require_auth,
            get_local_db=_get_local_db,
            json_error=_json_error,
            status_error_type=_status_error_type,
            logger=_LOGGER,
        )
    )
    extra_api_v1_routes = model_evolution_routes(model_evolution_handler)

    # 基础运行态
    app.router.add_get("/health", health)
    app.router.add_post("/infer", infer)
    app.router.add_get("/status", get_status)
    app.router.add_get("/capabilities", capabilities)
    app.router.add_get("/core/status", core_status)
    app.router.add_post("/decision/verify", _service_decision_verify)
    app.router.add_post("/decision/fast-brain", _service_decision_fast_brain)
    app.router.add_post("/decision/fast-path", _service_decision_fast_path)
    app.router.add_post("/decision/run", _service_decision_run)
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
    app.router.add_get("/dashboard/summary", _service_dashboard_summary)
    app.router.add_get("/addon/dashboard-summary", dashboard_summary_local)
    _register_operations_root_routes(app)
    _register_devices_root_routes(app)
    _register_rooms_root_routes(app)
    app.router.add_get("/ai-scenes", _service_ai_scenes_list)
    app.router.add_post("/ai-scenes/approve", _service_ai_scene_approve)
    app.router.add_post("/ai-scenes/reject", _service_ai_scene_reject)
    app.router.add_post("/ai-scenes/trigger", _service_ai_scene_trigger)
    app.router.add_post("/ai-scenes/{scene_id}/trigger", _proxy_scene_trigger)
    _register_transactions_root_routes(app)

    # 第四批服务面（memory/corrections/license/backups/patrol）
    app.router.add_get("/memory/profiles", _service_memory_profiles)
    app.router.add_post("/memory/profiles/{action}", _proxy_profile_action)
    app.router.add_get("/memory/habits", _service_memory_habits)
    app.router.add_post("/memory/habits/{action}", _proxy_habit_action)
    app.router.add_get("/corrections", _service_corrections)
    app.router.add_post("/corrections/{action}", _proxy_correction_action)
    app.router.add_get("/license/status", _service_license_status)
    app.router.add_post("/license/verify", _service_license_verify)
    _register_backups_root_routes(app)
    _register_patrol_root_routes(app)

    # 第五批服务面（energy + ai-scene analyze/create-from-text + canonical delete-by-id）
    app.router.add_get("/energy", _service_energy)
    app.router.add_post("/ai-scenes/analyze", _service_ai_scenes_analyze)
    app.router.add_post("/ai-scenes/create-from-text", _service_ai_scenes_create_from_text)
    app.router.add_post("/ai-scenes/sync-fixed-lighting", _service_ai_scenes_sync_fixed_lighting)
    app.router.add_post("/ai-scenes/{scene_id}/archive", _service_ai_scene_archive)
    app.router.add_post("/ai-scenes/{scene_id}", _service_ai_scene_delete)

    # 第六批服务面（devices/rooms/learning）
    _register_presence_root_routes(app)
    _register_learning_root_routes(app)

    # 第七批服务面（vision，白名单仅保留 /vision/*）
    app.router.add_get("/vision/cameras", _service_vision_cameras_get)
    app.router.add_post("/vision/cameras/{action}", _proxy_vision_camera_action)
    app.router.add_post("/vision/cameras/register", _proxy_vision_camera_action)
    app.router.add_post("/vision/cameras/delete", _proxy_vision_camera_action)
    app.router.add_post("/vision/zones", _service_vision_zones_post)
    app.router.add_post("/vision/zones/save", _service_vision_zones_save)

    # 第八批服务面（system brand/settings）
    app.router.add_get("/system/brand", _service_system_brand)
    _register_settings_root_routes(app)

    # 第九批服务面（logs/export，优先 v1，404/405 回退 root-base）
    _register_logs_root_routes(app)
    _register_scenes_root_routes(app)

    # 第七批服务面（mcp）
    _register_mcp_root_routes(app)

    # 第十批服务面（pair + voice interrupt）
    app.router.add_post("/auth/login", _service_auth_login)
    app.router.add_get("/auth/me", _service_auth_me)
    app.router.add_post("/auth/logout", _service_auth_logout)
    app.router.add_post("/device/pair/create", _service_pair_create)
    app.router.add_get("/device/pair/start", _service_pair_start)
    app.router.add_post("/device/pair/start", _service_pair_start)
    app.router.add_post("/device/pair/confirm", _service_pair_confirm)
    app.router.add_post("/voice/interrupt", _service_voice_interrupt)
    app.router.add_get("/core/config", _service_core_config_get)
    app.router.add_post("/core/config", _service_core_config_post)
    _register_planning_root_routes(app)
    app.router.add_get("/ai-behavior", _service_ai_behavior)
    register_model_evolution_routes(app, model_evolution_handler)
    app.router.add_post("/ai-behavior/{kind}/{source_id}/{action}", _service_ai_behavior_action)
    app.router.add_get("/behavior-patterns", _service_behavior_patterns)
    app.router.add_post("/behavior-patterns/{pattern_id}/{action}", _service_behavior_pattern_action)
    app.router.add_post("/ha/execute", _service_ha_execute_alias)

    # 第十一批服务面（会话读链路 WS）
    app.router.add_post("/events/ticket", _service_events_ticket)
    app.router.add_post("/api/v1/events/ticket", _service_events_ticket)
    app.router.add_get("/events/health", _service_events_health)
    app.router.add_get("/api/v1/events/health", _service_events_health)
    app.router.add_get("/voice/health", _service_voice_health)
    app.router.add_get("/api/v1/voice/health", _service_voice_health)
    app.router.add_post("/voice/session", _service_voice_session_bootstrap)
    app.router.add_post("/api/v1/voice/session", _service_voice_session_bootstrap)
    app.router.add_get("/events", _proxy_events_ws)
    app.router.add_get("/api/v1/events", _proxy_events_ws)
    app.router.add_get("/voice/session", _proxy_voice_session_ws)
    app.router.add_get("/api/v1/voice/session", _proxy_voice_session_ws)
    app.router.add_get("/api/websocket", _proxy_ha_websocket)

    _register_api_v1_routes(app, extra_routes=extra_api_v1_routes)
    app.router.add_route("*", "/api/{path:.*}", _api_not_found)
    app.router.add_route("*", "/screen", _redirect_screen_root)
    app.router.add_route("*", "/screen/", _serve_screen_asset)
    app.router.add_route("*", "/screen/{path:.*}", _serve_screen_asset)
    app.router.add_route("*", "/", _serve_ui_asset)
    app.router.add_route("*", "/{path:.*}", _serve_ui_asset)

    app.on_cleanup.append(_on_cleanup)
    return app


# --- Merged from api_server_wiring.py (P3B consolidation) ---

def configure_ingress_wiring(namespace: dict[str, Any]) -> None:
    """Bind split module namespaces and configure migrated ingress modules."""
    globals().update(namespace)

    def _call(name: str, *args: Any, **kwargs: Any) -> Any:
        return namespace[name](*args, **kwargs)

    def _configure_p3b_split_namespaces() -> None:
        configure_runtime_namespace(namespace)
        configure_errors_namespace(namespace)
        configure_auth_namespace(namespace)
        configure_proxy_namespace(namespace)
        configure_system_namespace(namespace)
        configure_dashboard_namespace(namespace)
        configure_read_models_namespace(namespace)
        configure_operations_support_namespace(namespace)
        configure_operations_read_namespace(namespace)
        configure_events_namespace(namespace)
        configure_decision_namespace(namespace)
        configure_context_namespace(namespace)
        configure_inventory_namespace(namespace)
        configure_list_read_namespace(namespace)
        configure_execution_namespace(namespace)
        configure_account_namespace(namespace)
        configure_config_namespace(namespace)
        configure_memory_namespace(namespace)
        configure_fixed_lighting_namespace(namespace)
        configure_ai_scenes_storage_namespace(namespace)
        configure_ai_scenes_handlers_namespace(namespace)
        configure_showroom_namespace(namespace)
        configure_vision_namespace(namespace)


    _configure_p3b_split_namespaces()

    _configure_logs_ingress(
        service_operations_read_contract=lambda *args, **kwargs: _service_operations_read_contract(*args, **kwargs),
        operations_provider_read_contract=lambda *args, **kwargs: _operations_provider_read_contract(*args, **kwargs),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        logger=_LOGGER,
    )

    _configure_backups_ingress(
        require_auth=lambda request: _require_auth(request),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        extract_inventory_list=lambda *args, **kwargs: _extract_inventory_list(*args, **kwargs),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        is_retryable_status=lambda status: _is_retryable_status(status),
        operations_delegated_action_plan=lambda *args, **kwargs: _operations_delegated_action_plan(*args, **kwargs),
        read_model_fallback_statuses=_READ_MODEL_FALLBACK_STATUSES,
        logger=_LOGGER,
    )

    _configure_patrol_ingress(
        operations_delegated_action_plan=lambda *args, **kwargs: _operations_delegated_action_plan(*args, **kwargs),
        logger=_LOGGER,
    )

    _configure_settings_ingress(
        require_auth=lambda request: _require_auth(request),
        read_json_dict=lambda request: _read_json_dict(request),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        normalize_system_settings_payload=lambda *args, **kwargs: _call(
            "_normalize_system_settings_payload",
            *args,
            **kwargs,
        ),
        load_system_settings_row=lambda: _call("_load_system_settings_row"),
        save_system_settings_payload=lambda raw: _call("_save_system_settings_payload", raw),
        logger=_LOGGER,
    )

    _configure_scenes_ingress(
        require_auth=lambda request: _require_auth(request),
        read_json_dict=lambda request: _read_json_dict(request),
        scene_id_from_body=lambda *args, **kwargs: _scene_id_from_body(*args, **kwargs),
        load_ai_scene_by_id=lambda scene_id: _load_ai_scene_by_id(scene_id),
        build_ai_scene_yaml_export_payload=lambda scene: _build_ai_scene_yaml_export_payload(scene),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        logger=_LOGGER,
    )

    _configure_rooms_ingress(
        require_auth=lambda request: _require_auth(request),
        read_json_dict=lambda request: _read_json_dict(request),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        service_list_read=lambda *args, **kwargs: _service_list_read(*args, **kwargs),
        proxy_to_ha=lambda *args, **kwargs: _proxy_to_ha(*args, **kwargs),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        normalize_room_topology_rows=lambda payload: _normalize_room_topology_rows(payload),
        load_local_room_topology_rows=lambda: _load_local_room_topology_rows(),
        save_local_room_topology_rows=lambda rows: _save_local_room_topology_rows(rows),
        load_core_config_payload=lambda: _load_core_config_payload(),
        save_core_config=lambda config: _save_core_config(config),
        logger=_LOGGER,
    )

    _configure_mcp_ingress(
        require_auth=lambda request: _require_auth(request),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        is_retryable_status=lambda status: _is_retryable_status(status),
        local_mcp_status_read_model_payload=lambda upstream_status=None: _local_mcp_status_read_model_payload(
            upstream_status
        ),
        operations_delegated_action_plan=lambda *args, **kwargs: _operations_delegated_action_plan(*args, **kwargs),
        read_model_fallback_statuses=_READ_MODEL_FALLBACK_STATUSES,
        logger=_LOGGER,
    )

    _configure_presence_ingress(
        require_auth=lambda request: _require_auth(request),
        proxy_to_ha=lambda *args, **kwargs: _proxy_to_ha(*args, **kwargs),
        read_json_dict=lambda request: _read_json_dict(request),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        request_bool=lambda value, default: _request_bool(value, default),
        core_config_body=lambda body: _core_config_body(body),
        load_core_config_payload=lambda: _load_core_config_payload(),
        core_config_from_raw=lambda raw: _core_config_from_raw(raw),
        save_core_config=lambda config: _save_core_config(config),
        validation_issue_dicts=lambda issues: _validation_issue_dicts(issues),
        has_validation_error_dicts=lambda items: _has_validation_error_dicts(items),
        ensure_local_import_root=lambda: _ensure_local_import_root(),
        local_system_settings_read_model_payload=lambda: _local_system_settings_read_model_payload(),
        save_system_settings_payload=lambda raw: _call("_save_system_settings_payload", raw),
        system_settings_fields=_SYSTEM_SETTINGS_FIELDS,
        logger=_LOGGER,
    )

    _configure_transactions_ingress(
        require_auth=lambda request: _require_auth(request),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        is_retryable_status=lambda status: _is_retryable_status(status),
        ensure_local_import_root=lambda: _ensure_local_import_root(),
        get_local_db=lambda: _call("_get_local_db"),
        core_storage_enabled=lambda: _core_storage_enabled(),
        core_storage_strict=lambda: _core_storage_strict(),
        extract_list_rows=lambda payload: _extract_list_rows(payload),
        safe_int=lambda value: _safe_int(value),
        query_bool=lambda query, name: _query_bool(query, name),
        parse_transaction_time=lambda value, is_end=False: _parse_transaction_time(value, is_end=is_end),
        logger=_LOGGER,
    )

    _configure_learning_ingress(
        require_auth=lambda request: _require_auth(request),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        ensure_local_import_root=lambda: _ensure_local_import_root(),
        get_local_db=lambda: _call("_get_local_db"),
        logger=_LOGGER,
    )

    _configure_devices_ingress(
        require_auth=lambda request: _require_auth(request),
        service_list_read=lambda *args, **kwargs: _service_list_read(*args, **kwargs),
        fetch_bridge_json=lambda *args, **kwargs: _fetch_bridge_json(*args, **kwargs),
        extract_list_rows=lambda payload: _extract_list_rows(payload),
        read_ha_standard_devices=lambda *args, **kwargs: _read_ha_standard_devices(*args, **kwargs),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda status: _status_error_type(status),
        is_retryable_status=lambda status: _is_retryable_status(status),
        read_json_dict=lambda request: _read_json_dict(request),
        upsert_local_device_projection=lambda *args, **kwargs: _upsert_local_device_projection(*args, **kwargs),
        delete_local_device_projection=lambda entity_id: _delete_local_device_projection(entity_id),
        logger=_LOGGER,
    )

    _configure_operations_ingress(
        require_auth=lambda request: _require_auth(request),
        ensure_local_import_root=lambda: _ensure_local_import_root(),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        read_json_dict=lambda request: _read_json_dict(request),
        operations_summary_fetch_read_model=lambda *args, **kwargs: _operations_summary_fetch_read_model(*args, **kwargs),
        operations_action_plan_response=lambda body: _operations_action_plan_response(body),
        status_error_type=lambda status: _status_error_type(status),
        operations_plan_build_failure_response=lambda *args, **kwargs: _operations_plan_build_failure_response(
            *args,
            **kwargs,
        ),
        operations_execute_rejection=lambda *args, **kwargs: _operations_execute_rejection(*args, **kwargs),
        operations_execution_blockers=lambda plan: _operations_execution_blockers(plan),
        execute_operations_provider_action=lambda *args, **kwargs: _execute_operations_provider_action(*args, **kwargs),
        operations_real_execution_enabled=lambda: bool(
            namespace.get("_SA_OPERATIONS_REAL_EXECUTION_ENABLED", _SA_OPERATIONS_REAL_EXECUTION_ENABLED)
        ),
        confirmation_secret=lambda: namespace["_confirmation_secret"](),
        logger=_LOGGER,
    )

    _configure_planning_ingress(
        require_auth=lambda request: _require_auth(request),
        read_json_dict=lambda request: _read_json_dict(request),
        json_error=lambda *args, **kwargs: _json_error(*args, **kwargs),
        status_error_type=lambda *args, **kwargs: _status_error_type(*args, **kwargs),
        ensure_local_import_root=lambda: _ensure_local_import_root(),
        request_bool=lambda value, default: _request_bool(value, default),
        optional_int=lambda value: _optional_int(value),
        core_config_body=lambda body: _core_config_body(body),
        load_core_config_payload=lambda: _load_core_config_payload(),
        core_storage_enabled=lambda: _core_storage_enabled(),
        validation_issue_dicts=lambda issues: _validation_issue_dicts(issues),
        planner_memory_rows=lambda *args, **kwargs: _planner_memory_rows(*args, **kwargs),
        planning_runtime_cache_key=lambda *args, **kwargs: _planning_runtime_cache_key(*args, **kwargs),
        planning_runtime_cache_get=lambda cache_key: _planning_runtime_cache_get(cache_key),
        planning_runtime_cache_set=lambda cache_key, snapshot: _planning_runtime_cache_set(cache_key, snapshot),
        get_core_planning_facade=lambda: _get_core_planning_facade(),
        lighting_controlled_execution_enabled=lambda: _SA_LIGHTING_CONTROLLED_EXECUTION_ENABLED,
        normalize_envelope_for_execute_alias=lambda envelope: _normalize_envelope_for_execute_alias(envelope),
        envelope_max_disturbance=lambda envelope, body: _envelope_max_disturbance(envelope, body),
        confirmation_secret=lambda: _confirmation_secret(),
        evaluate_execute_preflight=lambda envelope, body: _evaluate_execute_preflight(envelope, body),
        persist_execute_audit=lambda *args, **kwargs: _persist_execute_audit(*args, **kwargs),
        execute_ha_command_envelope=lambda envelope: _execute_ha_command_envelope(envelope),
        persist_planned_execution_trace=lambda *args, **kwargs: _persist_planned_execution_trace(*args, **kwargs),
        attach_planned_execution_trace_links=lambda payload, transaction_id: _attach_planned_execution_trace_links(
            payload,
            transaction_id,
        ),
        logger=_LOGGER,
    )
# --- Merged from api_server_runner.py (P3B consolidation) ---

def _reject_native_api_ingress() -> None:
    app_root = Path(__file__).resolve().parent
    native_modules = sorted(path.name for path in app_root.glob("api_server*.so"))
    if native_modules:
        joined = ", ".join(native_modules[:5])
        raise SystemExit(
            "[SmartAgent] ERROR: native api ingress modules are disabled; "
            f"remove {joined} and ship api_server*.pyc"
        )


def main() -> None:
    _reject_native_api_ingress()

    import api_server

    entrypoint = getattr(api_server, "main", None)
    if callable(entrypoint):
        entrypoint()
        return

    ports = api_server._listen_ports()
    app = api_server.create_app()
    try:
        asyncio.run(api_server._run_app_on_ports(app, ports))
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
