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

from dataclasses import dataclass
from typing import Optional


@dataclass
class CreateApprovalRequest:
    request_id: str

    workflow_id: str

    approval_type: str

    approval_level: str

    requested_by: str

    assigned_to: str

    comments: Optional[str] = None


@dataclass
class ApprovalResponse:
    approval_id: str

    request_id: str

    workflow_id: str

    approval_type: str

    approval_level: str

    status: str

    decision: str

    assigned_to: str


@dataclass
class ApproveRequest:
    reviewed_by: str

    comments: Optional[str] = None


@dataclass
class RejectRequest:
    reviewed_by: str

    comments: Optional[str] = None


@dataclass
class ReturnRequest:
    reviewed_by: str

    comments: Optional[str] = None