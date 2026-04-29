"""Pure FastBrain decision path for add-on Core."""
from __future__ import annotations

from datetime import datetime
from typing import Any

from .feature_encoder import SnapshotFeatureEncoder


def _domain(entity_id: str) -> str:
    return entity_id.split(".", 1)[0] if "." in entity_id else "light"


def _hour_matches(start: int, end: int, hour: int) -> bool:
    if start <= end:
        return start <= hour <= end
    return hour >= start or hour <= end


class FastBrainEngine:
    """Fast, deterministic decision engine over a JSON feature snapshot."""

    def __init__(
        self,
        *,
        device_info: dict[str, dict[str, Any]] | None = None,
        behavior_patterns: list[dict[str, Any]] | None = None,
        arrival_baseline: list[dict[str, Any]] | None = None,
        now: datetime | None = None,
    ) -> None:
        self.device_info = device_info or {}
        self.behavior_patterns = behavior_patterns or []
        self.arrival_baseline = arrival_baseline or []
        self.now = now or datetime.now()

    def decide_from_snapshot(
        self,
        snapshot: dict[str, Any],
        *,
        entity_id: str,
        new_state: str,
        old_state: str = "",
    ) -> dict[str, Any] | None:
        encoder = SnapshotFeatureEncoder(
            device_info=snapshot.get("device_info") if isinstance(snapshot.get("device_info"), dict) else self.device_info,
            states=snapshot.get("states") if isinstance(snapshot.get("states"), dict) else {},
            room_topology=snapshot.get("room_topology") if isinstance(snapshot.get("room_topology"), dict) else {},
            now=self.now,
        )
        features = encoder.encode(entity_id, new_state, old_state)
        return self.predict(features)

    def predict(self, features: dict[str, Any]) -> dict[str, Any] | None:
        trigger_domain = features.get("trigger_domain")
        trigger_state = features.get("trigger_state")
        trigger_entity = str(features.get("trigger_entity") or "")
        is_pir_trigger = trigger_domain == "binary_sensor" and trigger_state == "on"
        is_camera_trigger = (
            trigger_domain == "sensor"
            and "person" in trigger_entity
            and trigger_state not in ("0", "unknown", "unavailable")
        )
        if not (is_pir_trigger or is_camera_trigger):
            return None

        room = str(features.get("trigger_room") or "")
        room_lights = features.get("room_lights")
        if not room or not isinstance(room_lights, dict) or not room_lights:
            return None
        if all(state != "off" for state in room_lights.values()):
            return None

        hour = int(features.get("time_hour") or self.now.hour)
        weekday = str(features.get("weekday") if features.get("weekday") is not None else (self.now.weekday() + 1) % 7)

        habit = self._habit_lights(room_lights, hour, weekday)
        if habit:
            selected_lights = habit["lights"]
            confidence = int(habit["confidence"])
            source = "habit"
        else:
            selected_lights = self._baseline_lights(room_lights, hour)
            if not selected_lights:
                return None
            confidence = 78
            source = "arrival_baseline"

        brightness = self._time_brightness(hour)
        transition = self._time_transition(hour)
        actions = [
            {
                "domain": _domain(entity_id),
                "service": "turn_on",
                "entity_id": entity_id,
                "params": {"brightness_pct": brightness, "transition": transition},
                "reason": f"[FastBrain:{source}] {room} occupancy arrival",
                "delay_seconds": 0,
            }
            for entity_id in selected_lights
            if room_lights.get(entity_id) == "off"
        ]
        if not actions:
            return None
        return {
            "scene": f"{room} occupancy fast-brain ({source})",
            "confidence": confidence,
            "actions": actions,
        }

    def _habit_lights(self, room_lights: dict[str, str], hour: int, weekday: str) -> dict[str, Any] | None:
        matched: list[tuple[int, str]] = []
        for pattern in self.behavior_patterns:
            eid = str(pattern.get("entity_id") or "")
            if eid not in room_lights:
                continue
            if str(pattern.get("expected_state") or "").lower() not in {"on", "open"}:
                continue
            try:
                confidence = int(pattern.get("confidence") or 0)
                start = int(pattern.get("hour_start") or 0)
                end = int(pattern.get("hour_end") or 23)
            except (TypeError, ValueError):
                continue
            if confidence < 55 or not _hour_matches(start, end, hour):
                continue
            if weekday not in str(pattern.get("weekday_mask") or "0123456"):
                continue
            matched.append((confidence, eid))
        if not matched:
            return None
        matched.sort(reverse=True)
        top = matched[0][0]
        return {
            "lights": [eid for confidence, eid in matched if top - confidence <= 10],
            "confidence": min(97, 80 + top // 10),
        }

    def _baseline_lights(self, room_lights: dict[str, str], hour: int) -> list[str]:
        selected: list[str] = []
        for row in self.arrival_baseline:
            eid = str(row.get("entity_id") or "")
            if eid not in room_lights:
                continue
            try:
                bucket = int(row.get("hour_bucket", hour))
                samples = int(row.get("total_samples") or 0)
                ratio = float(row.get("turn_on_ratio") or 0)
            except (TypeError, ValueError):
                continue
            if samples >= 3 and ratio >= 0.5 and bucket in {(hour - 1) % 24, hour, (hour + 1) % 24}:
                selected.append(eid)
        return selected

    @staticmethod
    def _time_brightness(hour: int) -> int:
        if 6 <= hour < 8:
            return 70
        if 8 <= hour < 18:
            return 100
        if 18 <= hour < 21:
            return 80
        if 21 <= hour < 23:
            return 50
        return 20

    @staticmethod
    def _time_transition(hour: int) -> int:
        if 0 <= hour < 6:
            return 10
        if 6 <= hour < 8:
            return 5
        if 8 <= hour < 18:
            return 2
        if 18 <= hour < 21:
            return 3
        return 8
