# backend/app/modules/approval/constants.py

"""
Approval Constants
------------------
Central approval configuration.

Phase 24
Approval Workflow Layer
"""

from backend.app.models.approval import ApprovalDecision
from backend.app.models.approval import ApprovalLevel
from backend.app.models.approval import ApprovalStatus
from backend.app.models.approval import ApprovalType


APPROVAL_MODULE_NAME = "approval"


DEFAULT_APPROVAL_LEVEL = ApprovalLevel.LEVEL_1


APPROVAL_STATUS_OPEN = ApprovalStatus.OPEN.value

APPROVAL_STATUS_IN_REVIEW = ApprovalStatus.IN_REVIEW.value

APPROVAL_STATUS_APPROVED = ApprovalStatus.APPROVED.value

APPROVAL_STATUS_REJECTED = ApprovalStatus.REJECTED.value

APPROVAL_STATUS_RETURNED = ApprovalStatus.RETURNED.value

APPROVAL_STATUS_CANCELLED = ApprovalStatus.CANCELLED.value


DEFAULT_APPROVAL_DECISION = ApprovalDecision.PENDING.value


TERMINAL_APPROVAL_STATUSES = {
    ApprovalStatus.APPROVED,
    ApprovalStatus.REJECTED,
    ApprovalStatus.RETURNED,
    ApprovalStatus.CANCELLED,
}


ACTIVE_APPROVAL_STATUSES = {
    ApprovalStatus.OPEN,
    ApprovalStatus.IN_REVIEW,
}


APPROVAL_STATUS_TRANSITIONS = {
    ApprovalStatus.OPEN: [
        ApprovalStatus.IN_REVIEW,
        ApprovalStatus.CANCELLED,
    ],
    ApprovalStatus.IN_REVIEW: [
        ApprovalStatus.APPROVED,
        ApprovalStatus.REJECTED,
        ApprovalStatus.RETURNED,
        ApprovalStatus.CANCELLED,
    ],
    ApprovalStatus.APPROVED: [],
    ApprovalStatus.REJECTED: [],
    ApprovalStatus.RETURNED: [],
    ApprovalStatus.CANCELLED: [],
}


APPROVAL_LEVEL_PRIORITY = {
    ApprovalLevel.LEVEL_1: 1,
    ApprovalLevel.LEVEL_2: 2,
    ApprovalLevel.LEVEL_3: 3,
    ApprovalLevel.FINAL: 4,
}


APPROVAL_TYPES = {
    ApprovalType.TECHNICAL_REVIEW,
    ApprovalType.QUALITY_REVIEW,
    ApprovalType.SUPERVISOR_APPROVAL,
    ApprovalType.MANAGER_APPROVAL,
    ApprovalType.FINAL_RELEASE,
}