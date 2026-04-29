"""Pure snapshot feature encoding for add-on FastBrain decisions."""
from __future__ import annotations

from datetime import datetime
from typing import Any

CONTROL_DOMAINS = {"light", "switch", "climate", "fan", "cover", "media_player"}


def _domain(entity_id: str) -> str:
    return entity_id.split(".", 1)[0] if "." in entity_id else ""


def _state_value(raw: Any) -> str:
    if isinstance(raw, dict):
        raw = raw.get("state", "")
    value = str(raw or "")
    return value if value not in ("unavailable", "unknown") else "unknown"


class SnapshotFeatureEncoder:
    """Encode pre-collected HA state snapshots without importing HA runtime."""

    def __init__(
        self,
        *,
        device_info: dict[str, dict[str, Any]] | None = None,
        states: dict[str, Any] | None = None,
        room_topology: dict[str, list[str] | set[str]] | None = None,
        now: datetime | None = None,
    ) -> None:
        self.device_info = device_info or {}
        self.states = states or {}
        self.room_topology = room_topology or {}
        self.now = now or datetime.now()

    def encode(self, entity_id: str, new_state: str, old_state: str = "") -> dict[str, Any]:
        room = str(self.device_info.get(entity_id, {}).get("room") or "")
        features: dict[str, Any] = {
            "trigger_entity": entity_id,
            "trigger_state": str(new_state or ""),
            "trigger_old_state": str(old_state or ""),
            "trigger_state_changed": bool(old_state) and old_state != new_state,
            "trigger_domain": _domain(entity_id),
            "trigger_room": room,
            "time_hour": self.now.hour,
            "time_minute": self.now.minute,
            "weekday": (self.now.weekday() + 1) % 7,
            "is_weekend": self.now.weekday() >= 5,
        }

        room_lights: dict[str, str] = {}
        room_devices: dict[str, str] = {}
        if room:
            for eid, info in self.device_info.items():
                if info.get("room") != room:
                    continue
                if info.get("control_mode", "shared") == "ha":
                    continue
                domain = _domain(eid)
                if domain not in CONTROL_DOMAINS:
                    continue
                state = _state_value(self.states.get(eid, "unknown"))
                room_devices[eid] = state
                if domain == "light":
                    room_lights[eid] = state

        features["room_lights"] = room_lights
        features["room_devices"] = room_devices
        features["room_person_count"] = self._room_person_count(room)
        features["adjacent_occupied_count"] = self._adjacent_occupied_count(room)
        return features

    def _room_person_count(self, room: str) -> int:
        if not room:
            return 0
        count = 0
        for eid, raw in self.states.items():
            info = self.device_info.get(eid, {})
            if info.get("room") != room:
                continue
            lowered = eid.lower()
            if "person" not in lowered and "people" not in lowered and "人数" not in lowered:
                continue
            try:
                count = max(count, int(float(_state_value(raw))))
            except (TypeError, ValueError):
                continue
        return count

    def _adjacent_occupied_count(self, room: str) -> int:
        adjacent = self.room_topology.get(room) or []
        total = 0
        for candidate in adjacent:
            for eid, info in self.device_info.items():
                if info.get("room") != candidate:
                    continue
                if _domain(eid) != "binary_sensor":
                    continue
                if _state_value(self.states.get(eid)) == "on":
                    total += 1
                    break
        return total


FeatureEncoder = SnapshotFeatureEncoder
