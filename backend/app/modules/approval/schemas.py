# backend/app/modules/approval/schemas.py

"""
Approval API Schemas
--------------------
Request and response schemas for approval workflows.

Phase 24
Approval Workflow Layer

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
"""

from pydantic import BaseModel


class CreateApprovalRequest(BaseModel):
    request_id: str
    workflow_id: str
    approval_type: str
    approval_level: str
    requested_by: str
    assigned_to: str
    comments: str | None = None


class ApprovalResponse(BaseModel):
    approval_id: str
    request_id: str
    workflow_id: str
    approval_type: str
    approval_level: str
    status: str
    decision: str
    assigned_to: str


class ApproveRequest(BaseModel):
    reviewed_by: str
    comments: str | None = None


class RejectRequest(BaseModel):
    reviewed_by: str
    comments: str | None = None


class ReturnRequest(BaseModel):
    reviewed_by: str
    comments: str | None = None


__all__ = [
    "CreateApprovalRequest",
    "ApprovalResponse",
    "ApproveRequest",
    "RejectRequest",
    "ReturnRequest",
]