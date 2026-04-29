"""HTTP client for the HA adapter boundary."""
from __future__ import annotations

from typing import Any

import aiohttp


class HABridgeClient:
    """Small client that sends command envelopes to the HA adapter."""

    def __init__(
        self,
        base_url: str,
        token: str,
        *,
        timeout: aiohttp.ClientTimeout | None = None,
    ) -> None:
        self._base_url = str(base_url or "").rstrip("/")
        self._token = str(token or "")
        self._timeout = timeout or aiohttp.ClientTimeout(total=20)

    @property
    def headers(self) -> dict[str, str]:
        if not self._token:
            return {}
        return {"Authorization": f"Bearer {self._token}"}

    async def execute(self, envelope: dict[str, Any]) -> dict[str, Any]:
        async with aiohttp.ClientSession(timeout=self._timeout) as session:
            async with session.post(
                f"{self._base_url}/api/v1/ha/execute",
                json=envelope,
                headers=self.headers,
            ) as resp:
                try:
                    payload = await resp.json(content_type=None)
                except Exception:
                    payload = {}
                if isinstance(payload, dict):
                    payload.setdefault("__status", resp.status)
                    return payload
                return {"ok": 200 <= resp.status < 300, "__status": resp.status}
