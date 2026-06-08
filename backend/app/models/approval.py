# backend/app/models/approval.py

"""
Approval Domain Models
----------------------
Represents approval workflows for
laboratory requests.

Phase 24
Approval Workflow Layer

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
- Approval-ready
"""

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class ApprovalLevel(str, Enum):
    LEVEL_1 = "LEVEL_1"
    LEVEL_2 = "LEVEL_2"
    LEVEL_3 = "LEVEL_3"
    FINAL = "FINAL"


class ApprovalType(str, Enum):
    TECHNICAL_REVIEW = "TECHNICAL_REVIEW"
    QUALITY_REVIEW = "QUALITY_REVIEW"
    SUPERVISOR_APPROVAL = "SUPERVISOR_APPROVAL"
    MANAGER_APPROVAL = "MANAGER_APPROVAL"
    FINAL_RELEASE = "FINAL_RELEASE"


class ApprovalStatus(str, Enum):
    OPEN = "OPEN"
    IN_REVIEW = "IN_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    RETURNED = "RETURNED"
    CANCELLED = "CANCELLED"


class ApprovalDecision(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    RETURNED = "RETURNED"


@dataclass
class ApprovalRecord:
    approval_id: str

    request_id: str

    workflow_id: str

    approval_type: str

    approval_level: str

    status: str

    decision: str

    requested_by: str

    assigned_to: str

    created_at: datetime

    comments: Optional[str] = None

    reviewed_by: Optional[str] = None

    reviewed_at: Optional[datetime] = None