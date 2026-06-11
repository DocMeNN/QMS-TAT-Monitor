# backend/app/modules/workflow/service.py

"""
Workflow Service
----------------
Handles workflow state transitions
for laboratory requests.

Phase 19 Foundation
Workflow Runtime Engine

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Audit-ready
- Validation-governed
"""

from datetime import datetime
from typing import Dict
from typing import List

from backend.app.models.workflow import (
    WorkflowTransition,
)

from backend.app.modules.workflow.constants import (
    RequestStatus,
)

_workflow_history: List[
    WorkflowTransition
] = []


_ALLOWED_TRANSITIONS: Dict[
    RequestStatus,
    List[RequestStatus],
] = {
    RequestStatus.SUBMITTED: [
        RequestStatus.VALIDATED,
        RequestStatus.CANCELLED,
    ],
    RequestStatus.VALIDATED: [
        RequestStatus.ASSIGNED,
        RequestStatus.CANCELLED,
    ],
    RequestStatus.ASSIGNED: [
        RequestStatus.IN_PROGRESS,
        RequestStatus.ON_HOLD,
    ],
    RequestStatus.IN_PROGRESS: [
        RequestStatus.PENDING_REVIEW,
        RequestStatus.ON_HOLD,
        RequestStatus.ESCALATED,
    ],
    RequestStatus.PENDING_REVIEW: [
        RequestStatus.APPROVED,
        RequestStatus.RETURNED,
    ],
    RequestStatus.RETURNED: [
        RequestStatus.IN_PROGRESS,
        RequestStatus.PENDING_REVIEW,
    ],
    RequestStatus.APPROVED: [
        RequestStatus.COMPLETED,
    ],
    RequestStatus.COMPLETED: [
        RequestStatus.CLOSED,
    ],
    RequestStatus.ON_HOLD: [
        RequestStatus.IN_PROGRESS,
        RequestStatus.CANCELLED,
    ],
    RequestStatus.ESCALATED: [
        RequestStatus.IN_PROGRESS,
        RequestStatus.PENDING_REVIEW,
    ],
    RequestStatus.CANCELLED: [],
    RequestStatus.CLOSED: [],
}


def get_workflow_history(
) -> List[WorkflowTransition]:
    """
    Returns all workflow transitions.
    """

    return _workflow_history


def get_request_workflow_history(
    request_id: str,
) -> List[WorkflowTransition]:
    """
    Returns workflow history
    for a specific request.
    """

    return [
        transition
        for transition
        in _workflow_history
        if (
            transition.request_id
            == request_id
        )
    ]


def get_allowed_transitions(
    status: RequestStatus,
) -> List[RequestStatus]:
    """
    Returns allowed transitions
    for a workflow status.
    """

    return (
        _ALLOWED_TRANSITIONS.get(
            status,
            [],
        )
    )


def is_valid_transition(
    from_status: RequestStatus,
    to_status: RequestStatus,
) -> bool:
    """
    Validates workflow transition.
    """

    return (
        to_status
        in get_allowed_transitions(
            from_status
        )
    )


def create_transition(
    request_id: str,
    from_status: RequestStatus,
    to_status: RequestStatus,
    performed_by: str,
    transition_reason: str | None = None,
) -> WorkflowTransition:
    """
    Creates workflow transition record.
    """

    transition = (
        WorkflowTransition(
            request_id=request_id,
            from_status=from_status,
            to_status=to_status,
            performed_by=performed_by,
            transition_reason=(
                transition_reason
            ),
            transitioned_at=(
                datetime.utcnow()
            ),
        )
    )

    _workflow_history.append(
        transition
    )

    return transition