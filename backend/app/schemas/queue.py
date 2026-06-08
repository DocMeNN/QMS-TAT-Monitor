# backend/app/schemas/queue.py

"""
Queue API Schemas
-----------------
Queue registration and workload tracking
contracts.

Phase 17 Foundation
Queue Registration Engine Preparation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class QueueItemCreate(BaseModel):
    request_id: str
    priority: str
    assigned_department: Optional[str] = None


class QueueItemResponse(BaseModel):
    request_id: str

    priority: str

    queue_position: int

    status: str

    queued_at: Optional[datetime] = None

    assigned_department: Optional[str] = None

    estimated_wait_hours: Optional[float] = None