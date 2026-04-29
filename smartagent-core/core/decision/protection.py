"""Pure priority protection and arbitration for add-on Core."""
from __future__ import annotations

import time
from dataclasses import asdict, dataclass
from typing import Any

PRIORITY_EMERGENCY = 0
PRIORITY_USER_DIRECT = 1
PRIORITY_AUTOMATION = 2
PRIORITY_AI_LOCKED = 3
PRIORITY_AI_LEARNED = 4

SOURCE_PHYSICAL = "physical"
SOURCE_DASHBOARD = "dashboard"
SOURCE_VOICE = "voice"
SOURCE_AUTOMATION = "automation"
SOURCE_AI_RULE = "ai_rule"
SOURCE_AI_INFER = "ai_infer"
SOURCE_EMERGENCY = "emergency"

SOURCE_PRIORITY_MAP = {
    SOURCE_EMERGENCY: PRIORITY_EMERGENCY,
    SOURCE_PHYSICAL: PRIORITY_USER_DIRECT,
    SOURCE_DASHBOARD: PRIORITY_USER_DIRECT,
    SOURCE_VOICE: PRIORITY_USER_DIRECT,
    SOURCE_AUTOMATION: PRIORITY_AUTOMATION,
    SOURCE_AI_RULE: PRIORITY_AI_LOCKED,
    SOURCE_AI_INFER: PRIORITY_AI_LEARNED,
}

PRIORITY_GUARD_WINDOWS = {
    PRIORITY_EMERGENCY: 300,
    PRIORITY_USER_DIRECT: 120,
    PRIORITY_AUTOMATION: 90,
    PRIORITY_AI_LOCKED: 60,
    PRIORITY_AI_LEARNED: 30,
}

ACTION_PARAM_KEYS_COMMON = frozenset((
    "brightness",
    "brightness_pct",
    "color_temp",
    "color_temp_kelvin",
    "temperature",
    "hvac_mode",
    "position",
    "percentage",
    "volume_level",
))

_OFF_STATES = frozenset(("off", "closed", "idle", "standby", "locked"))


@dataclass(slots=True)
class PriorityRecord:
    entity_id: str
    priority: int
    source: str
    state: str
    params: dict[str, Any]
    updated_at: float
    guard_until: float

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


class PriorityArbiter:
    """Runtime priority map without HA dependencies."""

    def __init__(self, *, max_records: int = 500) -> None:
        self._records: dict[str, PriorityRecord] = {}
        self._max_records = max(1, int(max_records))
        self._global_suppress_until = 0.0
        self._global_suppress_reason = ""

    def set_global_suppression(self, reason: str, seconds: int = 300) -> None:
        self._global_suppress_reason = str(reason or "global_suppression")
        self._global_suppress_until = time.time() + max(1, int(seconds))

    def clear_global_suppression(self) -> None:
        self._global_suppress_reason = ""
        self._global_suppress_until = 0.0

    def record_operation(
        self,
        entity_id: str,
        source: str,
        new_state: str,
        params: dict[str, Any] | None = None,
        *,
        now: float | None = None,
        guard_seconds: int | None = None,
    ) -> PriorityRecord:
        current = time.time() if now is None else float(now)
        priority = SOURCE_PRIORITY_MAP.get(source, PRIORITY_AI_LEARNED)
        guard = int(guard_seconds) if guard_seconds is not None else PRIORITY_GUARD_WINDOWS.get(priority, 30)
        comparable_params = {
            str(k): v
            for k, v in (params or {}).items()
            if str(k) in ACTION_PARAM_KEYS_COMMON
        }
        record = PriorityRecord(
            entity_id=str(entity_id),
            priority=priority,
            source=str(source),
            state=str(new_state),
            params=comparable_params,
            updated_at=current,
            guard_until=current + max(1, guard),
        )
        self._records[record.entity_id] = record
        self._enforce_limits()
        return record

    def arbitrate(
        self,
        entity_id: str,
        source: str,
        service: str,
        params: dict[str, Any] | None = None,
        *,
        now: float | None = None,
    ) -> tuple[bool, str]:
        current = time.time() if now is None else float(now)
        if current < self._global_suppress_until:
            remaining = int(self._global_suppress_until - current)
            return False, f"global_suppression: {self._global_suppress_reason}, remaining={remaining}s"

        existing = self.get_record(entity_id, now=current)
        if existing is None:
            return True, ""

        incoming_priority = SOURCE_PRIORITY_MAP.get(source, PRIORITY_AI_LEARNED)
        if incoming_priority < existing.priority:
            return True, ""

        if self._is_reverse_op(existing.state, service):
            remaining = int(existing.guard_until - current)
            return False, (
                f"priority_guard: {entity_id} source={existing.source} "
                f"state={existing.state} remaining={remaining}s"
            )

        if incoming_priority == existing.priority and self._params_conflict(
            existing.state,
            existing.params,
            service,
            params,
        ):
            remaining = int(existing.guard_until - current)
            return False, f"priority_param_conflict: {entity_id} remaining={remaining}s"

        return True, ""

    def get_record(self, entity_id: str, *, now: float | None = None) -> PriorityRecord | None:
        current = time.time() if now is None else float(now)
        record = self._records.get(str(entity_id))
        if record is None:
            return None
        if current > record.guard_until:
            self._records.pop(str(entity_id), None)
            return None
        return record

    def active_records(self, *, now: float | None = None) -> list[dict[str, Any]]:
        current = time.time() if now is None else float(now)
        active: list[PriorityRecord] = []
        for entity_id in list(self._records):
            record = self.get_record(entity_id, now=current)
            if record is not None:
                active.append(record)
        active.sort(key=lambda item: (item.priority, -item.guard_until))
        return [record.to_dict() for record in active]

    @staticmethod
    def _is_reverse_op(current_state: str, service: str) -> bool:
        is_off = str(current_state) in _OFF_STATES
        action = str(service or "")
        turning_on = "turn_on" in action or "open" in action
        turning_off = "turn_off" in action or "close" in action
        return (is_off and turning_on) or ((not is_off) and turning_off)

    @staticmethod
    def _params_conflict(
        existing_state: str,
        existing_params: dict[str, Any] | None,
        incoming_service: str,
        incoming_params: dict[str, Any] | None,
    ) -> bool:
        if not incoming_params:
            return False
        is_off = str(existing_state) in _OFF_STATES
        turning_on = "turn_on" in str(incoming_service or "") or "open" in str(incoming_service or "")
        if not turning_on and is_off:
            return False
        lhs = dict(existing_params or {})
        rhs = {
            str(k): v
            for k, v in (incoming_params or {}).items()
            if str(k) in ACTION_PARAM_KEYS_COMMON
        }
        return any(lhs.get(key) != rhs.get(key) for key in set(lhs) & set(rhs))

    def _enforce_limits(self) -> None:
        if len(self._records) <= self._max_records:
            return
        ordered = sorted(self._records.items(), key=lambda item: item[1].guard_until)
        for entity_id, _ in ordered[: len(self._records) - self._max_records]:
            self._records.pop(entity_id, None)
