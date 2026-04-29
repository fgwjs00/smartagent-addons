"""SQLite schema bootstrap for add-on owned SmartAgent memory data."""
from __future__ import annotations

from typing import Any

from .database import DatabaseService

CORE_MEMORY_TABLES = (
    "events",
    "devices",
    "habits",
    "rules",
    "corrections",
    "correction_lessons",
    "behavior_patterns",
    "device_baseline",
    "device_baseline_hourly",
    "arrival_baseline",
    "decision_cache",
    "reflexion_patterns",
)


def _table_columns(db: DatabaseService, table: str) -> set[str]:
    return {str(row.get("name")) for row in db.query(f"PRAGMA table_info({table})")}


def _add_column_if_missing(db: DatabaseService, table: str, column_def: str) -> None:
    column_name = column_def.split()[0]
    if column_name not in _table_columns(db, table):
        db.execute_ddl(f"ALTER TABLE {table} ADD COLUMN {column_def}")


def init_schema(db: DatabaseService) -> dict[str, Any]:
    """Create the subset of tables required by Core context and memory modules."""
    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL,
            type TEXT NOT NULL,
            detail TEXT,
            entity TEXT,
            state TEXT,
            source TEXT DEFAULT 'system',
            area TEXT,
            confidence INTEGER,
            transaction_id INTEGER DEFAULT 0,
            action_seq INTEGER DEFAULT 0
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_events_time ON events(time)")
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_events_type ON events(type)")
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_events_entity ON events(entity)")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS devices (
            entity_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            area TEXT DEFAULT '',
            type TEXT DEFAULT '',
            ops TEXT DEFAULT '',
            control_mode TEXT DEFAULT 'shared',
            sensor_type TEXT DEFAULT '',
            created TEXT,
            updated TEXT
        )
        """
    )
    _add_column_if_missing(db, "devices", "control_mode TEXT DEFAULT 'shared'")
    _add_column_if_missing(db, "devices", "sensor_type TEXT DEFAULT ''")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            locked INTEGER DEFAULT 0,
            created TEXT
        )
        """
    )
    _add_column_if_missing(db, "habits", "locked INTEGER DEFAULT 0")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS rules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            locked INTEGER DEFAULT 0,
            created TEXT
        )
        """
    )
    _add_column_if_missing(db, "rules", "locked INTEGER DEFAULT 0")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS behavior_patterns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_id TEXT NOT NULL,
            expected_state TEXT NOT NULL,
            hour_start INTEGER NOT NULL,
            hour_end INTEGER NOT NULL,
            weekday_mask TEXT DEFAULT '0123456',
            confidence INTEGER DEFAULT 50,
            hit_count INTEGER DEFAULT 0,
            last_updated TEXT,
            UNIQUE(entity_id, hour_start, weekday_mask)
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_behavior_patterns_hour ON behavior_patterns(hour_start, hour_end)")
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_behavior_patterns_entity ON behavior_patterns(entity_id)")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS corrections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL,
            entity_id TEXT NOT NULL,
            ai_service TEXT DEFAULT '',
            ai_state TEXT DEFAULT '',
            user_state TEXT DEFAULT '',
            room TEXT DEFAULT '',
            hour INTEGER DEFAULT 0,
            weekday INTEGER DEFAULT 0,
            scene_desc TEXT DEFAULT '',
            trigger_text TEXT DEFAULT '',
            correction_count INTEGER DEFAULT 1,
            decay_score REAL DEFAULT 1.0,
            presence_context TEXT DEFAULT 'any'
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_corrections_entity ON corrections(entity_id)")
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_corrections_time ON corrections(time)")
    _add_column_if_missing(db, "corrections", "decay_score REAL DEFAULT 1.0")
    _add_column_if_missing(db, "corrections", "presence_context TEXT DEFAULT 'any'")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS device_baseline (
            entity_id TEXT PRIMARY KEY,
            room TEXT DEFAULT '',
            on_samples INTEGER DEFAULT 0,
            total_samples INTEGER DEFAULT 0,
            on_ratio REAL DEFAULT 0.0,
            avg_brightness INTEGER DEFAULT 0,
            correction_down INTEGER DEFAULT 0,
            correction_up INTEGER DEFAULT 0,
            last_updated TEXT
        )
        """
    )
    _add_column_if_missing(db, "device_baseline", "correction_up INTEGER DEFAULT 0")
    _add_column_if_missing(db, "device_baseline", "avg_brightness INTEGER DEFAULT 0")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS device_baseline_hourly (
            entity_id TEXT NOT NULL,
            hour_bucket INTEGER NOT NULL,
            room TEXT DEFAULT '',
            usage_ratio REAL DEFAULT 0.0,
            sample_count INTEGER DEFAULT 0,
            last_updated TEXT,
            PRIMARY KEY (entity_id, hour_bucket)
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_dbl_hourly_room_hour ON device_baseline_hourly(room, hour_bucket)")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS reflexion_patterns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_id TEXT,
            ai_service TEXT,
            hour INTEGER,
            correction_count INTEGER,
            failure_summary TEXT,
            updated TEXT
        )
        """
    )

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS arrival_baseline (
            entity_id TEXT NOT NULL,
            room TEXT NOT NULL DEFAULT '',
            hour_bucket INTEGER NOT NULL DEFAULT 0,
            on_samples INTEGER DEFAULT 0,
            total_samples INTEGER DEFAULT 0,
            turn_on_ratio REAL DEFAULT 0.0,
            last_updated TEXT,
            PRIMARY KEY (entity_id, hour_bucket)
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_arrival_bl_room ON arrival_baseline(room, hour_bucket)")

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS decision_cache (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trigger_room TEXT NOT NULL,
            hour_bucket INTEGER NOT NULL,
            weekday INTEGER NOT NULL,
            trigger_type TEXT NOT NULL DEFAULT 'arrival',
            actions_json TEXT NOT NULL,
            confidence INTEGER DEFAULT 80,
            scene TEXT DEFAULT '',
            hit_count INTEGER DEFAULT 0,
            created TEXT,
            last_hit TEXT,
            UNIQUE(trigger_room, hour_bucket, weekday, trigger_type)
        )
        """
    )
    db.execute_ddl(
        "CREATE INDEX IF NOT EXISTS idx_dcache_room ON decision_cache(trigger_room, hour_bucket, weekday, trigger_type)"
    )

    db.execute_ddl(
        """
        CREATE TABLE IF NOT EXISTS correction_lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_id TEXT NOT NULL,
            room TEXT DEFAULT '',
            presence_context TEXT DEFAULT 'any',
            lesson_text TEXT NOT NULL,
            ai_service TEXT DEFAULT '',
            user_state TEXT DEFAULT '',
            correction_count INTEGER DEFAULT 0,
            confidence REAL DEFAULT 0.5,
            is_conflicted INTEGER DEFAULT 0,
            created TEXT,
            updated TEXT,
            UNIQUE(entity_id, presence_context, ai_service)
        )
        """
    )
    db.execute_ddl("CREATE INDEX IF NOT EXISTS idx_lessons_room ON correction_lessons(room, presence_context)")

    return {"ok": True, "tables": list(CORE_MEMORY_TABLES)}
