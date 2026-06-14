# backend/app/modules/approval/schemas.py

"""
Approval API Schemas
--------------------
Request and response schemas for approval workflows.

Phase 24
Approval Workflow Layer

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
- Validation-governed
"""

from pydantic import BaseModel
from pydantic import Field

from backend.app.models.approval import (
    ApprovalDecision,
    ApprovalLevel,
    ApprovalStatus,
    ApprovalType,
)

from backend.app.modules.workflow.constants import (
    REQUEST_ID_PATTERN,
)


class CreateApprovalRequest(
    BaseModel
):
    """
    Approval creation contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    workflow_id: str

    approval_type: ApprovalType

    approval_level: ApprovalLevel

    requested_by: str

    assigned_to: str

    comments: str | None = None


class ApprovalResponse(
    BaseModel
):
    """
    Approval response contract.
    """

    approval_id: str

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    workflow_id: str

    approval_type: ApprovalType

    approval_level: ApprovalLevel

    status: ApprovalStatus

    decision: ApprovalDecision

    assigned_to: str

    class Config:
        from_attributes = True


class ApproveRequest(
    BaseModel
):
    """
    Approval action contract.
    """

    reviewed_by: str

    comments: str | None = None


class RejectRequest(
    BaseModel
):
    """
    Rejection action contract.
    """

    reviewed_by: str

    comments: str | None = None


class ReturnRequest(
    BaseModel
):
    """
    Return-for-rework contract.
    """

    reviewed_by: str

    comments: str | None = None


__all__ = [
    "CreateApprovalRequest",
    "ApprovalResponse",
    "ApproveRequest",
    "RejectRequest",
    "ReturnRequest",
]