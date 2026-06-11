# backend/app/schemas/request.py

"""
Request API Schemas
-------------------
Shared request contracts used throughout
the operational workflow platform.

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Validation-governed
- Workflow-ready
- Audit-ready
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


class RequestCreate(BaseModel):
    """
    Request creation contract.
    """

    title: str

    description: str

    request_type: str

    priority: PriorityLevel

    sla_hours: int = Field(
        default=24,
        ge=1,
    )

    created_by: str


class RequestUpdate(BaseModel):
    """
    Request update contract.
    """

    title: Optional[str] = None

    description: Optional[str] = None

    priority: Optional[
        PriorityLevel
    ] = None

    status: Optional[
        RequestStatus
    ] = None


class RequestResponse(BaseModel):
    """
    Request response contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    title: str

    description: str

    request_type: str

    priority: PriorityLevel

    status: RequestStatus

    assigned_to: Optional[str] = None

    assigned_department: Optional[
        str
    ] = None

    sla_hours: int

    created_by: str

    created_at: Optional[
        datetime
    ] = None

    updated_at: Optional[
        datetime
    ] = None

    class Config:
        from_attributes = True