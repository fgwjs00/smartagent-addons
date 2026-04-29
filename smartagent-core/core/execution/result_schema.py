"""Execution result contract returned by HA adapter."""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass(slots=True)
class CommandResult:
    entity_id: str
    domain: str
    service: str
    ok: bool
    error: str = ""
    error_type: str = ""
    retryable: bool = False
    latency_ms: int = 0
    data: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(slots=True)
class ExecutionResult:
    request_id: str
    ok: bool
    results: list[CommandResult]
    error: str = ""
    error_type: str = ""
    retryable: bool = False
    completed_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    @classmethod
    def from_command_results(cls, request_id: str, results: list[CommandResult]) -> "ExecutionResult":
        ok = bool(results) and all(item.ok for item in results)
        first_error = next((item for item in results if not item.ok), None)
        return cls(
            request_id=str(request_id),
            ok=ok,
            results=results,
            error=first_error.error if first_error else "",
            error_type=first_error.error_type if first_error else "",
            retryable=bool(first_error.retryable) if first_error else False,
        )

    @classmethod
    def error_result(
        cls,
        request_id: str,
        *,
        error: str,
        error_type: str = "execution_error",
        retryable: bool = False,
    ) -> "ExecutionResult":
        return cls(
            request_id=str(request_id),
            ok=False,
            results=[],
            error=str(error),
            error_type=str(error_type),
            retryable=bool(retryable),
        )

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["results"] = [item.to_dict() for item in self.results]
        return payload
