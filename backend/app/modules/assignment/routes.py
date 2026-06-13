# backend/app/modules/assignment/routes.py

"""
Assignment Routes
-----------------
Assignment governance endpoints.

Sprint 3
Wave 3B
"""

from fastapi import (
    APIRouter,
    HTTPException,
)

from backend.app.modules.assignment.schemas import (
    AssignmentCreate,
    AssignmentResponse,
    AssignmentHistoryResponse,
)

from backend.app.modules.assignment.service import (
    get_assignments,
    get_assignment,
    get_assignment_history,
    create_assignment,
)

router = APIRouter(
    prefix="/assignment",
    tags=["Assignment"],
)


@router.get(
    "/",
    response_model=list[
        AssignmentResponse
    ],
)
def list_assignments():

    return get_assignments()


@router.get(
    "/{request_id}",
    response_model=(
        AssignmentResponse
    ),
)
def get_request_assignment(
    request_id: str,
):

    assignment = (
        get_assignment(
            request_id
        )
    )

    if assignment is None:

        raise HTTPException(
            status_code=404,
            detail=(
                "Assignment not found"
            ),
        )

    return assignment


@router.get(
    "/history/{request_id}",
    response_model=list[
        AssignmentHistoryResponse
    ],
)
def assignment_history(
    request_id: str,
):

    return (
        get_assignment_history(
            request_id
        )
    )


@router.post(
    "/",
    response_model=(
        AssignmentResponse
    ),
)
def assign_request(
    payload: AssignmentCreate,
):

    try:

        return (
            create_assignment(
                request_id=(
                    payload.request_id
                ),
                assignee_id=(
                    payload.assignee_id
                ),
                assignment_strategy=(
                    payload.assignment_strategy
                ),
                assigned_by=(
                    payload.assigned_by
                ),
                department=(
                    payload.department
                ),
                assignment_notes=(
                    payload.assignment_notes
                ),
            )
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )