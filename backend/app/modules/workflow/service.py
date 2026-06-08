# backend/app/modules/workflow/service.py

"""
Workflow Service
----------------
Handles workflow state transitions
for laboratory requests.

Phase 19 Foundation
Workflow Runtime Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Audit-ready
"""

from datetime import datetime
from typing import List

from app.models.workflow import WorkflowTransition


WORKFLOW_STATES = [
    "SUBMITTED",
    "VALIDATED",
    "ASSIGNED",
    "IN_PROGRESS",
    "PENDING_REVIEW",
    "APPROVED",
    "COMPLETED",
    "CLOSED",
    "ON_HOLD",
    "ESCALATED",
    "CANCELLED",
]


_workflow_history: List[WorkflowTransition] = []


def get_workflow_history() -> List[WorkflowTransition]:
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
        for transition in _workflow_history
        if transition.request_id == request_id
    ]


def is_valid_transition(
    from_status: str,
    to_status: str,
) -> bool:
    """
    Validates workflow transition.
    """

    allowed_transitions = {
        "SUBMITTED": ["VALIDATED", "CANCELLED"],
        "VALIDATED": ["ASSIGNED", "CANCELLED"],
        "ASSIGNED": ["IN_PROGRESS", "ON_HOLD"],
        "IN_PROGRESS": [
            "PENDING_REVIEW",
            "ON_HOLD",
            "ESCALATED",
        ],
        "PENDING_REVIEW": [
            "APPROVED",
            "RETURNED",
        ],
        "APPROVED": ["COMPLETED"],
        "COMPLETED": ["CLOSED"],
        "ON_HOLD": [
            "IN_PROGRESS",
            "CANCELLED",
        ],
        "ESCALATED": [
            "IN_PROGRESS",
            "PENDING_REVIEW",
        ],
    }

    return (
        from_status in allowed_transitions
        and to_status in allowed_transitions[from_status]
    )


def create_transition(
    request_id: str,
    from_status: str,
    to_status: str,
    performed_by: str,
    transition_reason: str | None = None,
) -> WorkflowTransition:
    """
    Creates workflow transition record.
    """

    transition = WorkflowTransition(
        request_id=request_id,
        from_status=from_status,
        to_status=to_status,
        performed_by=performed_by,
        transition_reason=transition_reason,
        transitioned_at=datetime.utcnow(),
    )

    _workflow_history.append(transition)

    return transition