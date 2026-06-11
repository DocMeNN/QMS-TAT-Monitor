# backend/app/schemas/queue.py

"""
Queue API Schemas
-----------------
Queue registration and workload tracking
contracts.

Phase 17 Foundation
Queue Registration Engine Preparation

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
- Validation-governed
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import Field

from backend.app.modules.workflow.constants import (
    PriorityLevel,
    RequestStatus,
    REQUEST_ID_PATTERN,
)


class QueueItemCreate(BaseModel):
    """
    Queue registration contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    priority: PriorityLevel

    assigned_department: Optional[
        str
    ] = None


class QueueItemResponse(BaseModel):
    """
    Queue response contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    priority: PriorityLevel

    queue_position: int

    status: RequestStatus

    queued_at: Optional[
        datetime
    ] = None

    assigned_department: Optional[
        str
    ] = None

    estimated_wait_hours: Optional[
        float
    ] = None

    class Config:
        from_attributes = True