# backend/app/schemas/workflow.py

"""
Workflow API Schemas
--------------------
Workflow transition contracts used by the
workflow processing engine.

Phase 19 Foundation
Workflow Runtime Preparation

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
- Validation-governed
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import Field

from backend.app.modules.workflow.constants import (
    RequestStatus,
    REQUEST_ID_PATTERN,
)


class WorkflowTransitionCreate(
    BaseModel
):
    """
    Workflow transition request.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    from_status: RequestStatus

    to_status: RequestStatus

    performed_by: str

    transition_reason: Optional[
        str
    ] = None


class WorkflowTransitionResponse(
    BaseModel
):
    """
    Workflow transition response.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    from_status: RequestStatus

    to_status: RequestStatus

    performed_by: str

    transition_reason: Optional[
        str
    ] = None

    transitioned_at: Optional[
        datetime
    ] = None

    class Config:
        from_attributes = True