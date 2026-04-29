"""Command envelope contract between add-on Core and HA adapter."""
from __future__ import annotations

import uuid
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass(slots=True)
class SafetyContext:
    risk_level: str = "safe"
    requires_confirmation: bool = False
    reason: str = ""

    @classmethod
    def from_dict(cls, raw: dict[str, Any] | None) -> "SafetyContext":
        raw = raw if isinstance(raw, dict) else {}
        return cls(
            risk_level=str(raw.get("risk_level") or "safe"),
            requires_confirmation=bool(raw.get("requires_confirmation", False)),
            reason=str(raw.get("reason") or ""),
        )


@dataclass(slots=True)
class Command:
    entity_id: str
    domain: str
    service: str
    data: dict[str, Any] = field(default_factory=dict)
    reason: str = ""

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "Command":
        if not isinstance(raw, dict):
            raise ValueError("command must be an object")
        entity_id = str(raw.get("entity_id") or "").strip()
        domain = str(raw.get("domain") or "").strip()
        service = str(raw.get("service") or "").strip()
        data = raw.get("data", raw.get("params", {}))
        if not entity_id:
            raise ValueError("command.entity_id required")
        if "." not in entity_id:
            raise ValueError("command.entity_id must include domain prefix")
        inferred_domain = entity_id.split(".", 1)[0]
        if not domain:
            domain = inferred_domain
        if domain != inferred_domain:
            raise ValueError(f"command.domain mismatch: {domain} != {inferred_domain}")
        if not service:
            raise ValueError("command.service required")
        return cls(
            entity_id=entity_id,
            domain=domain,
            service=service,
            data=data if isinstance(data, dict) else {},
            reason=str(raw.get("reason") or ""),
        )

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(slots=True)
class CommandEnvelope:
    request_id: str
    source: str
    user_id: str
    scope: str
    commands: list[Command]
    safety: SafetyContext = field(default_factory=SafetyContext)
    expires_at: str = ""
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "CommandEnvelope":
        if not isinstance(raw, dict):
            raise ValueError("envelope must be an object")
        commands_raw = raw.get("commands")
        if not isinstance(commands_raw, list) or not commands_raw:
            raise ValueError("envelope.commands must be a non-empty list")
        commands = [Command.from_dict(item) for item in commands_raw]
        return cls(
            request_id=str(raw.get("request_id") or uuid.uuid4()),
            source=str(raw.get("source") or "gateway"),
            user_id=str(raw.get("user_id") or "local-admin"),
            scope=str(raw.get("scope") or "home_control"),
            commands=commands,
            safety=SafetyContext.from_dict(raw.get("safety")),
            expires_at=str(raw.get("expires_at") or ""),
            created_at=str(raw.get("created_at") or datetime.now(timezone.utc).isoformat()),
        )

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["commands"] = [command.to_dict() for command in self.commands]
        payload["safety"] = asdict(self.safety)
        return payload


def build_command_envelope(
    commands: list[dict[str, Any]] | list[Command],
    *,
    source: str = "gateway",
    user_id: str = "local-admin",
    scope: str = "home_control",
    safety: dict[str, Any] | SafetyContext | None = None,
    request_id: str | None = None,
    expires_at: str = "",
) -> CommandEnvelope:
    normalized_commands = [
        item if isinstance(item, Command) else Command.from_dict(item)
        for item in commands
    ]
    safety_context = safety if isinstance(safety, SafetyContext) else SafetyContext.from_dict(safety)
    return CommandEnvelope(
        request_id=request_id or str(uuid.uuid4()),
        source=source,
        user_id=user_id,
        scope=scope,
        commands=normalized_commands,
        safety=safety_context,
        expires_at=expires_at,
    )
