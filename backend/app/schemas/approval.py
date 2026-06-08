# backend/app/schemas/approval.py

"""
Approval Schemas
----------------
Shared approval schemas.

Phase 24
Approval Workflow Layer
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class ApprovalSummary:
    approval_id: str

    request_id: str

    workflow_id: str

    approval_type: str

    approval_level: str

    status: str

    decision: str


@dataclass
class ApprovalMetrics:
    total_approvals: int

    open_approvals: int

    approved: int

    rejected: int

    returned: int