# backend/app/models/queue.py

"""
Queue Domain Model
------------------
Represents operational queue registration
and workload tracking for laboratory requests.

Phase 17 Foundation
Queue Registration Engine Preparation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
"""

from dataclasses import dataclass
from datetime import (datetime, UTC,)
from typing import Optional


@dataclass
class QueueItem:
    """
    Represents a request registered
    within the operational queue.
    """

    request_id: str

    priority: str

    queue_position: int

    status: str

    queued_at: Optional[datetime] = None

    assigned_department: Optional[str] = None

    estimated_wait_hours: Optional[float] = None