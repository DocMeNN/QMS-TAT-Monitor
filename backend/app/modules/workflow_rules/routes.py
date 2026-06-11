# backend/app/modules/workflow_rules/routes.py

"""
Workflow Rules Routes
---------------------
Workflow governance endpoints.

Phase 22 Foundation
Task Transition Rules Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
"""

from fastapi import APIRouter

from backend.app.modules.workflow_rules.service import (
    validate_transition,
)

from backend.app.modules.workflow_rules.schemas import (
    TransitionValidationRequest,
    TransitionValidationResponse,
)

router = APIRouter(
    prefix="/workflow-rules",
    tags=["Workflow Rules"],
)


@router.post(
    "/validate",
    response_model=TransitionValidationResponse,
)
def validate_workflow_transition(
    payload: TransitionValidationRequest,
):
    """
    Validates workflow transition request.
    """

    valid, reason = validate_transition(
        from_status=payload.from_status,
        to_status=payload.to_status,
        role=payload.role,
    )

    return TransitionValidationResponse(
        valid=valid,
        reason=reason,
    )