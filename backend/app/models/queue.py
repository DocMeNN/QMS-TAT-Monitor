# backend/app/models/queue.py

"""
Queue Domain Model
------------------
Represents operational queue registration
and workload tracking for laboratory requests.

Phase 17 Foundation
Queue Registration Engine Preparation

Mountain 7
Wave 7C

Queue Governance Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
- Governance-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from backend.app.modules.queue.constants import (
    QueuePriority,
    QueueStatus,
)


@dataclass
class QueueItem:
    """
    Represents a request registered
    within the operational queue.
    """

    request_id: str

    priority: QueuePriority

    queue_position: int

    status: QueueStatus

    queued_at: Optional[
        datetime
    ] = None

    assigned_department: Optional[
        str
    ] = None

    estimated_wait_hours: Optional[
        float
    ] = None