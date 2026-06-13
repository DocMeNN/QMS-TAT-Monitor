# backend/app/modules/approval/service.py

"""
Approval Service
----------------
Core approval workflow logic.

Phase 24
Approval Workflow Layer

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
"""

from datetime import (datetime, UTC,)
from uuid import uuid4

from backend.app.models.approval import ApprovalRecord
from backend.app.modules.approval.constants import (
    APPROVAL_STATUS_APPROVED,
    APPROVAL_STATUS_IN_REVIEW,
    APPROVAL_STATUS_OPEN,
    APPROVAL_STATUS_REJECTED,
    APPROVAL_STATUS_RETURNED,
    DEFAULT_APPROVAL_DECISION,
)


class ApprovalService:
    """
    Manages approval lifecycle.
    """

    def __init__(self) -> None:
        self._approvals: dict[str, ApprovalRecord] = {}

    def create_approval(
        self,
        request_id: str,
        workflow_id: str,
        approval_type: str,
        approval_level: str,
        requested_by: str,
        assigned_to: str,
        comments: str | None = None,
    ) -> ApprovalRecord:

        approval = ApprovalRecord(
            approval_id=str(uuid4()),
            request_id=request_id,
            workflow_id=workflow_id,
            approval_type=approval_type,
            approval_level=approval_level,
            status=APPROVAL_STATUS_OPEN,
            decision=DEFAULT_APPROVAL_DECISION,
            requested_by=requested_by,
            assigned_to=assigned_to,
            created_at=datetime.now(UTC),
            comments=comments,
        )

        self._approvals[approval.approval_id] = approval

        return approval

    def get_approval(
        self,
        approval_id: str,
    ) -> ApprovalRecord | None:

        return self._approvals.get(approval_id)

    def list_approvals(
        self,
    ) -> list[ApprovalRecord]:

        return list(self._approvals.values())

    def start_review(
        self,
        approval_id: str,
    ) -> ApprovalRecord | None:

        approval = self.get_approval(approval_id)

        if approval is None:
            return None

        approval.status = APPROVAL_STATUS_IN_REVIEW

        return approval

    def approve(
        self,
        approval_id: str,
        reviewed_by: str,
        comments: str | None = None,
    ) -> ApprovalRecord | None:

        approval = self.get_approval(approval_id)

        if approval is None:
            return None

        approval.status = APPROVAL_STATUS_APPROVED
        approval.decision = APPROVAL_STATUS_APPROVED
        approval.reviewed_by = reviewed_by
        approval.reviewed_at = datetime.now(UTC)

        if comments:
            approval.comments = comments

        return approval

    def reject(
        self,
        approval_id: str,
        reviewed_by: str,
        comments: str | None = None,
    ) -> ApprovalRecord | None:

        approval = self.get_approval(approval_id)

        if approval is None:
            return None

        approval.status = APPROVAL_STATUS_REJECTED
        approval.decision = APPROVAL_STATUS_REJECTED
        approval.reviewed_by = reviewed_by
        approval.reviewed_at = datetime.now(UTC)

        if comments:
            approval.comments = comments

        return approval

    def return_for_rework(
        self,
        approval_id: str,
        reviewed_by: str,
        comments: str | None = None,
    ) -> ApprovalRecord | None:

        approval = self.get_approval(approval_id)

        if approval is None:
            return None

        approval.status = APPROVAL_STATUS_RETURNED
        approval.decision = APPROVAL_STATUS_RETURNED
        approval.reviewed_by = reviewed_by
        approval.reviewed_at = datetime.now(UTC)

        if comments:
            approval.comments = comments

        return approval


approval_service = ApprovalService()