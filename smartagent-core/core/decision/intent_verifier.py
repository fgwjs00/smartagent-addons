"""Pure intent verification for add-on Core.

This is the first module-level migration from the HA integration. It keeps the
two-stage verification semantics but removes direct access to ``hass``. Runtime
state is supplied as plain dictionaries by the HA adapter or Gateway caller.
"""
from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

_LOGGER = logging.getLogger("smartagent.core.decision.intent_verifier")

CMD_SOURCE_SENSOR = "SENSOR"
CMD_SOURCE_SCHEDULE = "SCHEDULE"
CMD_SOURCE_USER_EXPLICIT = "USER_EXPLICIT"

SAFETY_LEVEL_SAFE = 1
SAFETY_LEVEL_HIGH_COST = 2
SAFETY_LEVEL_CRITICAL = 3

_VALID_SERVICES: dict[str, set[str]] = {
    "light": {"turn_on", "turn_off", "toggle"},
    "switch": {"turn_on", "turn_off", "toggle"},
    "climate": {
        "set_temperature",
        "set_hvac_mode",
        "set_fan_mode",
        "set_humidity",
        "set_preset_mode",
        "turn_on",
        "turn_off",
    },
    "water_heater": {"turn_on", "turn_off", "set_temperature", "set_operation_mode"},
    "humidifier": {"turn_on", "turn_off", "set_humidity", "set_mode"},
    "cover": {"open_cover", "close_cover", "stop_cover", "set_cover_position", "toggle"},
    "fan": {"turn_on", "turn_off", "set_percentage", "set_direction", "oscillate", "toggle"},
    "script": {"turn_on", "turn_off"},
    "scene": {"turn_on"},
    "media_player": {
        "media_play",
        "media_pause",
        "media_stop",
        "media_next_track",
        "media_previous_track",
        "volume_set",
        "volume_up",
        "volume_down",
        "volume_mute",
        "select_source",
        "turn_on",
        "turn_off",
    },
    "vacuum": {"start", "pause", "stop", "return_to_base", "turn_on", "turn_off"},
    "input_boolean": {"turn_on", "turn_off", "toggle"},
    "input_number": {"set_value"},
    "input_select": {"select_option", "select_next", "select_previous"},
    "number": {"set_value"},
    "select": {"select_option"},
    "button": {"press"},
}

_PARAM_RANGES: dict[str, tuple[float, float]] = {
    "brightness_pct": (0, 100),
    "brightness": (0, 255),
    "temperature": (10, 35),
    "color_temp_kelvin": (1000, 10000),
    "color_temp": (153, 500),
    "position": (0, 100),
    "percentage": (0, 100),
    "volume_level": (0.0, 1.0),
    "humidity": (0, 100),
    "target_humidity": (0, 100),
    "speed": (0, 100),
    "fan_speed": (0, 100),
}

_CLIMATE_ONLY_PARAMS = {"temperature"}
_PERSON_COUNT_KEYWORDS = ("person_count", "people_count", "person_detected", "人数")

StateLookup = Callable[[str], Any]
LogFunc = Callable[[str, str], None]
SuppressCheck = Callable[..., tuple[bool, int, float]]


def _state_value(raw: Any) -> str:
    if raw is None:
        return ""
    if isinstance(raw, dict):
        return str(raw.get("state", "") or "")
    return str(getattr(raw, "state", raw) or "")


class IntentVerifier:
    """Two-stage verifier that accepts only serializable snapshots."""

    def __init__(
        self,
        device_info: dict[str, dict[str, Any]],
        occ_map: dict[str, list[tuple[str, str]]] | None = None,
        *,
        states: dict[str, Any] | None = None,
        room_topology: dict[str, list[str] | set[str] | tuple[str, ...]] | None = None,
        locked_people_rules: list[dict[str, Any]] | None = None,
        state_lookup: StateLookup | None = None,
        sys_log_func: LogFunc | None = None,
        suppress_check_func: SuppressCheck | None = None,
    ) -> None:
        self.device_info = device_info or {}
        self._occ_map = occ_map or {}
        self._states = states or {}
        self._room_topology = {
            str(room): {str(item) for item in neighbours}
            for room, neighbours in (room_topology or {}).items()
        }
        self._locked_people_rules = locked_people_rules or []
        self._state_lookup = state_lookup
        self._sys_log = sys_log_func
        self._suppress_check = suppress_check_func

    @classmethod
    def from_snapshot(cls, snapshot: dict[str, Any]) -> "IntentVerifier":
        """Build a verifier from a Gateway/HA adapter snapshot payload."""
        if not isinstance(snapshot, dict):
            snapshot = {}
        return cls(
            device_info=snapshot.get("device_info") if isinstance(snapshot.get("device_info"), dict) else {},
            occ_map=snapshot.get("occ_map") if isinstance(snapshot.get("occ_map"), dict) else {},
            states=snapshot.get("states") if isinstance(snapshot.get("states"), dict) else {},
            room_topology=(
                snapshot.get("room_topology")
                if isinstance(snapshot.get("room_topology"), dict)
                else {}
            ),
            locked_people_rules=(
                snapshot.get("locked_people_rules")
                if isinstance(snapshot.get("locked_people_rules"), list)
                else []
            ),
        )

    def _get_state(self, entity_id: str) -> str:
        if self._state_lookup is not None:
            try:
                return _state_value(self._state_lookup(entity_id))
            except Exception as exc:
                self._log("WARN", f"[IntentVerifier] state lookup failed for {entity_id}: {exc}")
                return ""
        return _state_value(self._states.get(entity_id))

    def _is_adjacent_room(self, room_a: str, room_b: str) -> bool:
        if not room_a or not room_b:
            return False
        return room_b in self._room_topology.get(room_a, set())

    def _get_room_person_count(self, room: str) -> int:
        if not room:
            return 0
        room_l = room.lower()
        total = 0
        for eid, info in self.device_info.items():
            if not str(eid).startswith("sensor."):
                continue
            eid_l = str(eid).lower()
            name_l = str((info or {}).get("name", "") or "").lower()
            if not any(kw in eid_l or kw in name_l for kw in _PERSON_COUNT_KEYWORDS):
                continue
            sensor_room = str((info or {}).get("room", "") or "")
            if sensor_room and sensor_room.lower() != room_l and room_l not in eid_l:
                continue
            try:
                total += int(float(self._get_state(eid) or 0))
            except (TypeError, ValueError):
                continue
        return total

    def _is_blocked_by_locked_people_rule(self, action: dict[str, Any], action_room: str) -> tuple[bool, str]:
        if action.get("domain") != "light" or action.get("service") != "turn_on":
            return False, ""
        if not self._locked_people_rules:
            return False, ""

        eid = str(action.get("entity_id", "") or "")
        dev_name = str((self.device_info.get(eid) or {}).get("name", "") or "")
        text = f"{dev_name} {eid}".lower()

        for rule in self._locked_people_rules:
            rule_room = str(rule.get("room", "") or "")
            if rule_room and action_room and rule_room != action_room:
                continue

            keywords = [str(k).lower() for k in (rule.get("keywords") or []) if str(k).strip()]
            if keywords and not any(k in text for k in keywords):
                continue

            threshold = int(rule.get("threshold", 0) or 0)
            op = str(rule.get("operator", ">=") or ">=")
            people = self._get_room_person_count(action_room or rule_room)

            allowed = people > threshold if op == ">" else people >= threshold
            if not allowed:
                return True, f"P1 people rule: need {op}{threshold}, current {people}"

        return False, ""

    def _log(self, level: str, msg: str) -> None:
        if self._sys_log:
            self._sys_log(level, msg)
            return
        if level == "ERROR":
            _LOGGER.error(msg)
        elif level == "WARN":
            _LOGGER.warning(msg)
        else:
            _LOGGER.info(msg)

    def verify(
        self,
        actions: list[dict[str, Any]],
        trigger_room: str = "",
        is_global_cmd: bool = False,
        cmd_source: str = CMD_SOURCE_SENSOR,
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        if not actions:
            return [], []

        try:
            after_s1, s1_rejected = self._stage1_semantic_check(
                actions,
                trigger_room,
                is_global_cmd,
                cmd_source,
            )
            clean, s2_rejected = self._stage2_physical_check(after_s1)
        except Exception as exc:
            self._log("ERROR", f"[IntentVerifier] internal failure, rejecting all actions: {exc}")
            return [], [dict(action, reject_reason=f"verifier_error: {exc}") for action in actions]

        return clean, s1_rejected + s2_rejected

    def grade_action_safety(self, action: dict[str, Any]) -> int:
        domain = str(action.get("domain", "") or "")
        if domain in ("light", "cover", "fan", "media_player", "input_boolean", "input_select", "button"):
            return SAFETY_LEVEL_SAFE
        if domain in ("climate", "vacuum", "water_heater", "humidifier", "dehumidifier"):
            return SAFETY_LEVEL_HIGH_COST
        if domain in ("lock", "alarm_control_panel", "garage_door"):
            return SAFETY_LEVEL_CRITICAL
        return SAFETY_LEVEL_HIGH_COST

    def split_actions_by_safety(
        self,
        actions: list[dict[str, Any]],
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
        safe: list[dict[str, Any]] = []
        high: list[dict[str, Any]] = []
        critical: list[dict[str, Any]] = []
        for action in actions:
            level = self.grade_action_safety(action)
            if level == SAFETY_LEVEL_SAFE:
                safe.append(action)
            elif level == SAFETY_LEVEL_HIGH_COST:
                high.append(action)
            else:
                critical.append(action)
        return safe, high, critical

    def _stage1_semantic_check(
        self,
        actions: list[dict[str, Any]],
        trigger_room: str,
        is_global_cmd: bool,
        cmd_source: str = CMD_SOURCE_SENSOR,
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        clean: list[dict[str, Any]] = []
        rejected: list[dict[str, Any]] = []

        occupied_rooms: set[str] = set()
        empty_rooms: set[str] = set()
        uncertain_rooms: set[str] = set()
        for room, sensors in self._occ_map.items():
            pairs = sensors or []
            states = [state for _, state in pairs]
            if any(state in ("unknown", "unavailable") for state in states):
                occupied_rooms.add(room)
                uncertain_rooms.add(room)
            elif any(state == "on" for state in states):
                occupied_rooms.add(room)
            elif states and all(state == "off" for state in states):
                empty_rooms.add(room)

        entity_services: dict[str, list[str]] = {}
        for action in actions:
            eid = str(action.get("entity_id", "") or "")
            svc = str(action.get("service", "") or "")
            entity_services.setdefault(eid, []).append(svc)
        contradicted_entities = {
            eid for eid, services in entity_services.items()
            if "turn_on" in services and "turn_off" in services
        }

        for action in actions:
            action = dict(action)
            eid = str(action.get("entity_id", "") or "")
            domain = str(action.get("domain", "") or "")
            service = str(action.get("service", "") or "")
            action_room = str((self.device_info.get(eid) or {}).get("room", "") or "")

            if eid not in self.device_info:
                rejected.append({**action, "reject_reason": f"entity_not_found: {eid}"})
                continue

            if eid in contradicted_entities:
                rejected.append({**action, "reject_reason": "conflicting turn_on/turn_off for same entity"})
                continue

            if not is_global_cmd and trigger_room and action_room and action_room != trigger_room:
                is_exempt = (
                    domain in ("climate", "cover", "scene", "script", "vacuum")
                    or cmd_source == CMD_SOURCE_USER_EXPLICIT
                    or bool(action.get("is_global", False))
                    or self._is_adjacent_room(trigger_room, action_room)
                )
                if not is_exempt:
                    rejected.append({
                        **action,
                        "reject_reason": f"cross_room_rejected: trigger={trigger_room}, target={action_room}",
                    })
                    continue

            if domain == "light" and service == "turn_off" and action_room in occupied_rooms:
                if cmd_source == CMD_SOURCE_USER_EXPLICIT:
                    pass
                else:
                    reason = (
                        f"uncertain_occupancy_turn_off_rejected: {action_room}"
                        if action_room in uncertain_rooms
                        else f"occupied_room_turn_off_rejected: {action_room}"
                    )
                    rejected.append({**action, "reject_reason": reason})
                    continue

            blocked, blocked_reason = self._is_blocked_by_locked_people_rule(action, action_room)
            if blocked:
                rejected.append({**action, "reject_reason": blocked_reason})
                continue

            if service == "turn_on" and cmd_source != CMD_SOURCE_USER_EXPLICIT and self._suppress_check is not None:
                current_presence = "occupied" if action_room in occupied_rooms else "empty"
                if action_room not in occupied_rooms and action_room not in empty_rooms:
                    current_presence = "any"
                try:
                    suppress, count, score = self._suppress_check(
                        eid,
                        service,
                        current_presence=current_presence,
                        room=action_room,
                    )
                except TypeError:
                    suppress, count, score = self._suppress_check(eid, service)
                if suppress:
                    rejected.append({
                        **action,
                        "reject_reason": f"correction_suppressed: count={count}, score={score:.2f}",
                    })
                    continue

            clean.append(action)

        return clean, rejected

    def _stage2_physical_check(
        self,
        actions: list[dict[str, Any]],
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        clean: list[dict[str, Any]] = []
        rejected: list[dict[str, Any]] = []

        for action in actions:
            action = dict(action)
            eid = str(action.get("entity_id", "") or "")
            domain = str(action.get("domain", "") or "")
            service = str(action.get("service", "") or "")
            params = action.get("params") or {}
            if not isinstance(params, dict):
                params = {}

            expected_domain = eid.split(".")[0] if "." in eid else ""
            if not expected_domain:
                rejected.append({**action, "reject_reason": f"invalid_entity_id: {eid}"})
                continue
            if not domain:
                domain = expected_domain
                action["domain"] = domain
            if expected_domain != domain:
                rejected.append({
                    **action,
                    "reject_reason": f"domain_mismatch: entity={expected_domain}, action={domain}",
                })
                continue

            valid_services = _VALID_SERVICES.get(domain, set())
            if not valid_services or service not in valid_services:
                rejected.append({**action, "reject_reason": f"invalid_service: {domain}.{service}"})
                continue

            param_error = self._check_param_ranges(params, domain)
            if param_error:
                rejected.append({**action, "reject_reason": f"invalid_params: {param_error}"})
                continue

            clean.append(action)

        return clean, rejected

    def _check_param_ranges(self, params: dict[str, Any], domain: str = "") -> str:
        for key, value in params.items():
            if key not in _PARAM_RANGES:
                continue
            if key in _CLIMATE_ONLY_PARAMS and domain != "climate":
                continue
            try:
                numeric = float(value)
            except (TypeError, ValueError):
                return f"{key} is not numeric: {value!r}"
            lower, upper = _PARAM_RANGES[key]
            if not (lower <= numeric <= upper):
                return f"{key}={numeric} outside [{lower}, {upper}]"
        return ""
