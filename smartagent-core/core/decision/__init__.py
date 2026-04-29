"""Decision core modules for SmartAgent add-on.

These modules are intentionally independent from Home Assistant runtime objects.
HA-side adapters must pass plain snapshots such as device_info, occupancy maps,
state maps, and room topology.
"""

from .decision_pipeline import DecisionPipeline, FastPathDecisionPipeline
from .fast_brain import FastBrainEngine
from .feature_encoder import FeatureEncoder, SnapshotFeatureEncoder
from .intent_verifier import (
    CMD_SOURCE_SCHEDULE,
    CMD_SOURCE_SENSOR,
    CMD_SOURCE_USER_EXPLICIT,
    SAFETY_LEVEL_CRITICAL,
    SAFETY_LEVEL_HIGH_COST,
    SAFETY_LEVEL_SAFE,
    IntentVerifier,
)
from .protection import PriorityArbiter, PriorityRecord

__all__ = [
    "CMD_SOURCE_SCHEDULE",
    "CMD_SOURCE_SENSOR",
    "CMD_SOURCE_USER_EXPLICIT",
    "DecisionPipeline",
    "SAFETY_LEVEL_CRITICAL",
    "SAFETY_LEVEL_HIGH_COST",
    "SAFETY_LEVEL_SAFE",
    "FastBrainEngine",
    "FastPathDecisionPipeline",
    "FeatureEncoder",
    "IntentVerifier",
    "PriorityArbiter",
    "PriorityRecord",
    "SnapshotFeatureEncoder",
]
