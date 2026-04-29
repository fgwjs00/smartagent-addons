"""Pure fast-path decision pipeline for the SmartAgent add-on.

The HA integration still owns runtime event collection and service execution.
This module owns the deterministic decision orchestration over plain JSON
snapshots so it can run inside the add-on without importing Home Assistant.
"""
from __future__ import annotations

import json
from datetime import datetime
from typing import Any

from .fast_brain import FastBrainEngine
from .intent_verifier import CMD_SOURCE_SENSOR, IntentVerifier


_ACTIVE_SCENE_STATUSES = {"active", "enabled", "on", "1", "true"}


def _domain(entity_id: str) -> str:
    return entity_id.split(".", 1)[0] if "." in entity_id else ""


def _state_value(raw: Any) -> str:
    if isinstance(raw, dict):
        raw = raw.get("state", "")
    return str(raw or "")


def _hour_matches(start: int, end: int, hour: int) -> bool:
    if start <= end:
        return start <= hour <= end
    return hour >= start or hour <= end


def _int_or(value: Any, default: int) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _float_or(value: Any, default: float) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _as_list(value: Any) -> list[Any]:
    if isinstance(value, list):
        return value
    if isinstance(value, str) and value.strip():
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError:
            return []
        return parsed if isinstance(parsed, list) else []
    return []


def _weekday_matches(mask: Any, weekday: int) -> bool:
    if mask in (None, "", [], ()):
        return True
    if isinstance(mask, (list, tuple, set)):
        return str(weekday) in {str(item) for item in mask}
    return str(weekday) in str(mask)


def _is_active_scene(scene: dict[str, Any]) -> bool:
    status = scene.get("status")
    if status in (None, ""):
        return True
    if isinstance(status, bool):
        return status
    return str(status).strip().lower() in _ACTIVE_SCENE_STATUSES


def _scene_entity_id(scene: dict[str, Any]) -> str:
    for key in ("scene_entity_id", "ha_entity_id", "entity_id"):
        value = str(scene.get(key) or "").strip()
        if value:
            return value
    scene_id = scene.get("id")
    if scene_id not in (None, ""):
        return f"scene.ai_{scene_id}"
    return ""


class FastPathDecisionPipeline:
    """Orchestrate scene shortcut, FastBrain, and intent verification."""

    def __init__(self, snapshot: dict[str, Any] | None = None, *, now: datetime | None = None) -> None:
        self.snapshot = snapshot if isinstance(snapshot, dict) else {}
        self.now = now or datetime.now()
        self.device_info = (
            self.snapshot.get("device_info")
            if isinstance(self.snapshot.get("device_info"), dict)
            else {}
        )
        self.states = self.snapshot.get("states") if isinstance(self.snapshot.get("states"), dict) else {}

    def run_fast_path(self, entity_id: str, new_state: str, old_state: str = "") -> dict[str, Any] | None:
        """Return a verified fast-path decision, or None when no safe match exists."""
        entity_id = str(entity_id or "")
        new_state = str(new_state or "")
        old_state = str(old_state or "")
        if not entity_id:
            return None

        trigger_room = str((self.device_info.get(entity_id) or {}).get("room") or "")
        result = self._scene_path(entity_id, new_state, trigger_room)
        if result is not None:
            return result

        result = self._fast_brain_path(entity_id, new_state, old_state, trigger_room)
        if result is not None:
            return result
        return None

    def _scene_path(self, entity_id: str, new_state: str, trigger_room: str) -> dict[str, Any] | None:
        if not self._is_arrival_trigger(entity_id, new_state) or not trigger_room:
            return None

        scenes = self.snapshot.get("ai_scenes")
        if not isinstance(scenes, list):
            return None

        for scene in scenes:
            if not isinstance(scene, dict):
                continue
            candidate = self._match_scene(scene, trigger_room)
            if candidate is None:
                continue
            verified = self._verify(candidate, trigger_room)
            if verified is not None:
                return verified
        return None

    def _fast_brain_path(
        self,
        entity_id: str,
        new_state: str,
        old_state: str,
        trigger_room: str,
    ) -> dict[str, Any] | None:
        engine = FastBrainEngine(
            device_info=self.device_info,
            behavior_patterns=(
                self.snapshot.get("behavior_patterns")
                if isinstance(self.snapshot.get("behavior_patterns"), list)
                else []
            ),
            arrival_baseline=(
                self.snapshot.get("arrival_baseline")
                if isinstance(self.snapshot.get("arrival_baseline"), list)
                else []
            ),
            now=self.now,
        )
        result = engine.decide_from_snapshot(
            self.snapshot,
            entity_id=entity_id,
            new_state=new_state,
            old_state=old_state,
        )
        if result is None:
            return None
        result = dict(result)
        result.setdefault("source", "fast_brain")
        result.setdefault("trigger_room", trigger_room)
        return self._verify(result, trigger_room)

    def _match_scene(self, scene: dict[str, Any], trigger_room: str) -> dict[str, Any] | None:
        if not _is_active_scene(scene):
            return None

        confidence = _float_or(scene.get("confidence"), 80.0)
        if confidence < 70:
            return None

        hour_start = _int_or(scene.get("hour_start", scene.get("start_hour")), 0)
        hour_end = _int_or(scene.get("hour_end", scene.get("end_hour")), 23)
        if not _hour_matches(hour_start, hour_end, self.now.hour):
            return None
        weekday = (self.now.weekday() + 1) % 7
        if not _weekday_matches(scene.get("weekday_mask", scene.get("weekdays")), weekday):
            return None

        entities = _as_list(scene.get("entities") if "entities" in scene else scene.get("entities_json"))
        if not entities:
            return None
        entity_ids = [str(item.get("entity_id") or item) for item in entities if item]
        if not entity_ids:
            return None

        room_entities = [
            eid
            for eid in entity_ids
            if str((self.device_info.get(eid) or {}).get("room") or "") == trigger_room
        ]
        if not room_entities or len(room_entities) < len(entity_ids) * 0.5:
            return None

        ha_mode_count = sum(
            1
            for eid in room_entities
            if str((self.device_info.get(eid) or {}).get("control_mode", "shared")) == "ha"
        )
        if room_entities and ha_mode_count / len(room_entities) > 0.5:
            return None

        scene_entity = _scene_entity_id(scene)
        if not scene_entity:
            return None

        return {
            "scene": str(scene.get("name") or scene_entity),
            "confidence": int(confidence),
            "source": "ai_scene",
            "trigger_room": trigger_room,
            "actions": [
                {
                    "domain": "scene",
                    "service": "turn_on",
                    "entity_id": scene_entity,
                    "params": {},
                    "reason": f"[Scene Path] {trigger_room} occupancy arrival",
                    "delay_seconds": 0,
                }
            ],
        }

    def _verify(self, result: dict[str, Any], trigger_room: str) -> dict[str, Any] | None:
        actions = result.get("actions")
        if not isinstance(actions, list):
            return None
        snapshot = self._snapshot_for_verification(
            [action for action in actions if isinstance(action, dict)],
            trigger_room,
        )
        verifier = IntentVerifier.from_snapshot(snapshot)
        clean, rejected = verifier.verify(
            [action for action in actions if isinstance(action, dict)],
            trigger_room=trigger_room,
            cmd_source=str(result.get("cmd_source") or CMD_SOURCE_SENSOR),
        )
        if not clean:
            return None
        verified = dict(result)
        verified["actions"] = clean
        verified["rejected_actions"] = rejected
        verified["verified"] = True
        return verified

    def _snapshot_for_verification(self, actions: list[dict[str, Any]], trigger_room: str) -> dict[str, Any]:
        snapshot = dict(self.snapshot)
        device_info = dict(self.device_info)
        for action in actions:
            eid = str(action.get("entity_id") or "")
            if eid and eid not in device_info and _domain(eid) in {"scene", "script"}:
                device_info[eid] = {"room": trigger_room, "name": str(action.get("reason") or eid)}
        snapshot["device_info"] = device_info
        return snapshot

    def _is_arrival_trigger(self, entity_id: str, new_state: str) -> bool:
        domain = _domain(entity_id)
        if domain == "binary_sensor" and new_state == "on":
            return True
        if domain == "sensor" and "person" in entity_id.lower():
            return _state_value(new_state) not in ("0", "unknown", "unavailable", "")
        return False


DecisionPipeline = FastPathDecisionPipeline
