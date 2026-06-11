# backend/app/modules/queue/schemas.py

"""
Queue Module Schemas
--------------------
Queue registration and operational
workload contracts.

Phase 17 Foundation
Queue Registration Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
"""

from backend.app.schemas.queue import (
    QueueItemCreate,
    QueueItemResponse,
)

__all__ = [
    "QueueItemCreate",
    "QueueItemResponse",
]