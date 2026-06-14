# backend/app/modules/queue/constants.py

"""
Queue Constants
---------------
Centralized queue governance constants.

Mountain 7
Wave 7C

Queue Governance Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Single source of truth
- Workflow-ready
- Audit-ready
"""

from enum import Enum


class QueuePriority(
    str,
    Enum,
):
    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    URGENT = "URGENT"


class QueueStatus(
    str,
    Enum,
):
    QUEUED = "QUEUED"

    IN_PROGRESS = (
        "IN_PROGRESS"
    )

    COMPLETED = (
        "COMPLETED"
    )

    ESCALATED = (
        "ESCALATED"
    )

    CANCELLED = (
        "CANCELLED"
    )


__all__ = [
    "QueuePriority",
    "QueueStatus",
]