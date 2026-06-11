# backend/app/modules/workflow/routes.py

"""
Workflow Routes
---------------
Workflow runtime endpoints.

Phase 19 Foundation
Workflow Runtime Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
"""

from fastapi import (
    APIRouter,
    HTTPException,
)

from backend.app.schemas.workflow import (
    WorkflowTransitionCreate,
    WorkflowTransitionResponse,
)

from backend.app.modules.workflow.service import (
    get_workflow_history,
    get_request_workflow_history,
    is_valid_transition,
    create_transition,
)

router = APIRouter(
    prefix="/workflow",
    tags=["Workflow"],
)


@router.get(
    "/history",
    response_model=list[
        WorkflowTransitionResponse
    ],
)
def list_workflow_history():
    """
    Returns all workflow transitions.
    """

    return get_workflow_history()


@router.get(
    "/history/{request_id}",
    response_model=list[
        WorkflowTransitionResponse
    ],
)
def request_workflow_history(
    request_id: str,
):
    """
    Returns workflow history
    for a request.
    """

    return (
        get_request_workflow_history(
            request_id=request_id,
        )
    )


@router.post(
    "/transition",
    response_model=(
        WorkflowTransitionResponse
    ),
)
def transition_request(
    payload: WorkflowTransitionCreate,
):
    """
    Creates workflow transition.
    """

    if not is_valid_transition(
        payload.from_status,
        payload.to_status,
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                f"Invalid transition: "
                f"{payload.from_status} -> "
                f"{payload.to_status}"
            ),
        )

    return create_transition(
        request_id=payload.request_id,
        from_status=payload.from_status,
        to_status=payload.to_status,
        performed_by=payload.performed_by,
        transition_reason=(
            payload.transition_reason
        ),
    )