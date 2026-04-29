"""Minimal add-on transaction record for command envelopes."""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any

from .command_schema import CommandEnvelope
from .result_schema import ExecutionResult


@dataclass(slots=True)
class TransactionRecord:
    transaction_id: str
    request_id: str
    status: str
    envelope: dict[str, Any]
    result: dict[str, Any] | None = None
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    @classmethod
    def from_envelope(cls, envelope: CommandEnvelope, transaction_id: str | None = None) -> "TransactionRecord":
        return cls(
            transaction_id=str(transaction_id or envelope.request_id),
            request_id=envelope.request_id,
            status="pending",
            envelope=envelope.to_dict(),
        )

    def attach_result(self, result: ExecutionResult) -> None:
        self.result = result.to_dict()
        self.status = "succeeded" if result.ok else "failed"
        self.updated_at = datetime.now(timezone.utc).isoformat()

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
