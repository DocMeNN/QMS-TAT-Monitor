# backend/app/modules/workflow/service.py

"""
Workflow Service
----------------
Workflow runtime engine.

Phase 19 Foundation
Workflow Runtime Engine

Phase 30
Runtime Validation Hardening

Mountain 7
Wave 7D

Workflow Runtime State Verification

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
- Validation-governed
"""

from datetime import (
    datetime,
    UTC,
)

from typing import Dict
from typing import List

from backend.app.models.workflow import (
    WorkflowTransition,
)

from backend.app.modules.requests.validators import (
    get_request_or_raise,
    validate_request_id,
)

from backend.app.modules.workflow.constants import (
    RequestStatus,
)

from backend.app.modules.workflow.validators import (
    validate_runtime_request_state,
)

# ------------------------------------------------------------------
# Workflow History Store
# ------------------------------------------------------------------

_workflow_history: List[
    WorkflowTransition
] = []

# ------------------------------------------------------------------
# Allowed Workflow Transitions
# ------------------------------------------------------------------

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
        RequestStatus.ESCALATED,
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
        RequestStatus.APPROVED,
    ],
    RequestStatus.CANCELLED: [],
    RequestStatus.CLOSED: [],
}

# ------------------------------------------------------------------
# Query Functions
# ------------------------------------------------------------------


def get_workflow_history(
) -> List[WorkflowTransition]:
    """
    Returns complete workflow history.
    """

    return _workflow_history


def get_request_workflow_history(
    request_id: str,
) -> List[WorkflowTransition]:
    """
    Returns workflow history
    for a specific request.
    """

    validate_request_id(
        request_id
    )

    return [
        transition
        for transition
        in _workflow_history
        if transition.request_id
        == request_id
    ]


# ------------------------------------------------------------------
# Validation Functions
# ------------------------------------------------------------------


def is_valid_transition(
    from_status: RequestStatus,
    to_status: RequestStatus,
) -> bool:
    """
    Validates workflow transition.
    """

    return (
        to_status
        in _ALLOWED_TRANSITIONS.get(
            from_status,
            [],
        )
    )


# ------------------------------------------------------------------
# Transition Engine
# ------------------------------------------------------------------


def create_transition(
    request_id: str,
    from_status: RequestStatus,
    to_status: RequestStatus,
    performed_by: str,
    transition_reason: str | None = None,
) -> WorkflowTransition:
    """
    Creates workflow transition.

    Governance Rules
    ----------------
    - Request must exist
    - Runtime state must match
      transition source state
    - Transition must be valid
    """

    request = (
        get_request_or_raise(
            request_id
        )
    )

    validate_runtime_request_state(
        request=request,
        expected_status=(
            from_status
        ),
    )

    if not is_valid_transition(
        from_status=from_status,
        to_status=to_status,
    ):
        raise ValueError(
            (
                "Invalid workflow "
                "transition."
            )
        )

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
                datetime.now(
                    UTC
                )
            ),
        )
    )

    request.status = (
        to_status
    )

    request.updated_at = (
        datetime.now(
            UTC
        )
    )

    _workflow_history.append(
        transition
    )

    return transition