"""Pure context bundle utilities for the add-on Core.

The HA integration remains responsible for collecting Home Assistant state and
database rows. This module only normalizes already-collected JSON-like payloads
into an inference bundle that the add-on can own and test without HA runtime.
"""
from __future__ import annotations

import copy
import re
from dataclasses import dataclass
from typing import Any

BUNDLE_VERSION = "1.0"

NON_ROOM_TAGS = {
    "物理",
    "巡检",
    "定时",
    "脚本",
    "用户",
    "位置",
    "紧急",
    "自动化",
    "视觉检测",
}

TEXT_FIELD_PRIORITIES: tuple[tuple[str, int, float, float, int], ...] = (
    ("tool_results", 0, 0.25, 0.0, 0),
    ("history", 1, 0.18, 0.30, 120),
    ("context_text", 2, 0.15, 0.35, 180),
    ("rag_context", 3, 0.20, 0.20, 80),
    ("memory_narrative", 4, 0.18, 0.25, 120),
    ("rules", 5, 0.12, 0.50, 160),
    ("habits", 6, 0.12, 0.50, 120),
    ("device_table", 7, 0.20, 0.40, 120),
)


@dataclass(frozen=True)
class ContextBudgetField:
    name: str
    text: str
    priority: int
    trim_step: float = 0.15
    min_ratio: float = 0.2
    hard_min_chars: int = 80


def extract_trigger_room(trigger: str) -> str:
    """Extract a room label from a SmartAgent trigger string."""
    if not trigger:
        return ""
    m = re.search(r"「\[(.*?)\]", trigger)
    if m:
        return m.group(1)
    clean = re.sub(r"(?:进入|离开|在)区域=\[.*?\]", "", trigger)
    for candidate in re.findall(r"\[(.*?)\]", clean):
        if candidate not in NON_ROOM_TAGS:
            return candidate
    return ""


def sanitize_one_off(one_off_prompt: str) -> str:
    """Remove prompt-control punctuation from one-off commands."""
    if not one_off_prompt:
        return ""
    safe = re.sub(r"[{}[\]'\"\n\r【】『』「」]", "", str(one_off_prompt))
    return safe[:200].strip()


def estimate_tokens(text: str) -> int:
    """Rough token estimator used for bundle budget enforcement."""
    if not text:
        return 0
    cn_chars = sum(1 for c in text if "一" <= c <= "鿿")
    non_cn_chars = len(text) - cn_chars
    return int(cn_chars / 1.5 + non_cn_chars / 4)


def _clip_text_with_notice(text: str, target_chars: int, label: str) -> str:
    if not text or target_chars <= 0:
        return ""
    if len(text) <= target_chars:
        return text
    notice = f"\n  ...({label} over budget, clipped)"
    if target_chars <= len(notice) + 8:
        return notice[:target_chars]
    keep_chars = target_chars - len(notice)
    cutoff = text.rfind("\n", 0, keep_chars)
    if cutoff < int(keep_chars * 0.5):
        cutoff = keep_chars
    return text[:cutoff].rstrip() + notice


def enforce_context_bundle_budget(
    fields: list[ContextBudgetField],
    total_budget: int,
) -> tuple[dict[str, str], int, list[str]]:
    """Clip text fields by priority until the estimated token budget is met."""
    ordered = sorted(fields, key=lambda item: item.priority)
    values: dict[str, str] = {field.name: field.text or "" for field in ordered}

    def _render() -> str:
        return "".join(values[field.name] for field in ordered)

    total_tokens = estimate_tokens(_render())
    logs: list[str] = []
    if total_tokens <= total_budget:
        return values, total_tokens, logs

    for field in ordered:
        text = values.get(field.name, "")
        if not text:
            continue
        base_len = len(text)
        min_chars = max(field.hard_min_chars, int(base_len * field.min_ratio))
        current = text
        while total_tokens > total_budget and len(current) > min_chars:
            cur_len = len(current)
            drop_chars = max(80, int(cur_len * field.trim_step))
            target_len = max(min_chars, cur_len - drop_chars)
            before = total_tokens
            clipped = _clip_text_with_notice(current, target_len, field.name)
            if clipped == current:
                break
            values[field.name] = clipped
            current = clipped
            total_tokens = estimate_tokens(_render())
            logs.append(f"{field.name}: {before}->{total_tokens} tok, chars {cur_len}->{len(current)}")
        if total_tokens <= total_budget:
            break

    return values, total_tokens, logs


def _string_value(snapshot: dict[str, Any], name: str) -> str:
    value = snapshot.get(name, "")
    return value if isinstance(value, str) else str(value or "")


def build_context_bundle(
    snapshot: dict[str, Any] | None,
    *,
    trigger: str = "",
    one_off_prompt: str = "",
    is_voice: bool = False,
    context_budget: int = 8000,
) -> dict[str, Any]:
    """Build a pure JSON inference bundle from pre-collected context fields."""
    source = copy.deepcopy(snapshot or {})
    if not isinstance(source, dict):
        source = {}

    clean_trigger = str(trigger or source.get("trigger") or "")
    safe_one_off = sanitize_one_off(one_off_prompt or str(source.get("one_off_prompt") or ""))
    trigger_room = str(source.get("trigger_room") or extract_trigger_room(clean_trigger))

    bundle: dict[str, Any] = {
        "bundle_version": BUNDLE_VERSION,
        "trigger": clean_trigger,
        "trigger_room": trigger_room,
        "one_off_prompt": safe_one_off,
        "is_voice": bool(is_voice or source.get("is_voice", False)),
    }
    for key, value in source.items():
        if key not in bundle:
            bundle[key] = value

    fields = [
        ContextBudgetField(
            name=name,
            text=_string_value(bundle, name),
            priority=priority,
            trim_step=trim_step,
            min_ratio=min_ratio,
            hard_min_chars=hard_min_chars,
        )
        for name, priority, trim_step, min_ratio, hard_min_chars in TEXT_FIELD_PRIORITIES
        if _string_value(bundle, name)
    ]
    clipped, total_tokens, logs = enforce_context_bundle_budget(fields, int(context_budget or 8000))
    bundle.update(clipped)
    bundle["context_budget"] = {
        "limit": int(context_budget or 8000),
        "estimated_tokens": total_tokens,
        "clipped": logs,
    }
    return bundle
