"""Repositories for add-on owned SmartAgent memory data."""
from __future__ import annotations

from datetime import datetime
from typing import Any

from core.storage.database import DatabaseService

from .memory_store import MemoryStore


def _now_str() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


class HabitRepository:
    """CRUD boundary for habit/profile rows stored in the add-on DB."""

    def __init__(self, db: DatabaseService) -> None:
        self._db = db

    def list_habits(self) -> list[dict[str, Any]]:
        rows = self._db.query(
            "SELECT id, content, locked, created FROM habits ORDER BY id",
        )
        return [
            {
                "id": int(row.get("id") or 0),
                "content": str(row.get("content") or ""),
                "locked": bool(row.get("locked") or 0),
                "created": row.get("created") or "",
            }
            for row in rows
        ]

    def _find_first(self, content: str) -> dict[str, Any] | None:
        rows = self._db.query(
            "SELECT id, content, locked, created FROM habits WHERE content=? ORDER BY id LIMIT 1",
            (content,),
        )
        return rows[0] if rows else None

    def add_habit(self, content: str, *, locked: bool = False, created: str | None = None) -> dict[str, Any]:
        text = str(content or "").strip()
        if not text:
            return {"ok": False, "error": "empty_content"}
        ok = self._db.execute(
            "INSERT INTO habits (content, locked, created) VALUES (?, ?, ?)",
            (text, 1 if locked else 0, created or _now_str()),
        )
        return {"ok": bool(ok), "content": text}

    def delete_habit(self, content: str) -> dict[str, Any]:
        text = str(content or "").strip()
        row = self._find_first(text)
        if row is None:
            return {"ok": False, "error": "habit_not_found", "content": text}
        if bool(row.get("locked") or 0):
            return {"ok": False, "error": "habit_locked", "content": text}
        ok = self._db.execute("DELETE FROM habits WHERE id=?", (int(row["id"]),))
        return {"ok": bool(ok), "content": text}

    def toggle_lock(self, content: str) -> dict[str, Any]:
        text = str(content or "").strip()
        row = self._find_first(text)
        if row is None:
            return {"ok": False, "error": "habit_not_found", "content": text}
        new_locked = 0 if bool(row.get("locked") or 0) else 1
        ok = self._db.execute("UPDATE habits SET locked=? WHERE id=?", (new_locked, int(row["id"])))
        return {"ok": bool(ok), "content": text, "locked": bool(new_locked)}

    def apply_action(self, action: str, content: str) -> dict[str, Any]:
        normalized = action.strip().lower().replace("_", "-")
        if normalized == "add":
            return self.add_habit(content)
        if normalized == "delete":
            return self.delete_habit(content)
        if normalized == "toggle-lock":
            return self.toggle_lock(content)
        return {"ok": False, "error": "invalid_action", "action": action}


class MemoryContextRepository:
    """Read-model boundary for generating room memory context."""

    def __init__(self, db: DatabaseService) -> None:
        self._db = db

    def load_device_info(self) -> dict[str, dict[str, Any]]:
        rows = self._db.query("SELECT entity_id, name, area, type, control_mode FROM devices ORDER BY entity_id")
        return {
            str(row.get("entity_id")): {
                "name": row.get("name") or row.get("entity_id") or "",
                "room": row.get("area") or "",
                "type": row.get("type") or "",
                "control_mode": row.get("control_mode") or "shared",
            }
            for row in rows
            if row.get("entity_id")
        }

    def get_room_context(
        self,
        *,
        room: str,
        trigger_type: str = "arrival",
        current_hour: int | None = None,
        current_presence: str = "",
        device_info: dict[str, dict[str, Any]] | None = None,
    ) -> str:
        devices = device_info if isinstance(device_info, dict) else self.load_device_info()

        def _name(entity_id: str) -> str:
            item = devices.get(entity_id, {})
            return str(item.get("name") or entity_id)

        store = MemoryStore(
            db_query_func=self._db.query,
            device_info=devices,
            get_device_name_func=_name,
        )
        return store.get_room_context(
            room=room,
            trigger_type=trigger_type,
            current_hour=current_hour,
            current_presence=current_presence,
        )
