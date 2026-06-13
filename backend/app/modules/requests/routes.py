# backend/app/modules/requests/routes.py

"""
Request Routes
--------------
Request intake endpoints.

Phase 15 Foundation
Request Intake Engine

Phase 30
Request Domain Refactoring

Sprint 2
Patient Demographics & Multi-Department Support

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Workflow-ready
"""

from datetime import (
    datetime,
    UTC,
)

from uuid import uuid4

from fastapi import (
    APIRouter,
    HTTPException,
)

from backend.app.models.request import (
    Request,
)

from backend.app.modules.workflow.constants import (
    RequestStatus,
)

from backend.app.schemas.request import (
    RequestCreate,
    RequestUpdate,
    RequestResponse,
)

from backend.app.modules.requests.service import (
    create_request,
    get_request_by_id,
    get_requests,
    is_duplicate_request,
    update_request,
)

router = APIRouter(
    prefix="/requests",
    tags=["Requests"],
)


@router.get(
    "/",
    response_model=list[
        RequestResponse
    ],
)
def list_requests():
    """
    Returns all requests.
    """

    return get_requests()


@router.get(
    "/{request_id}",
    response_model=RequestResponse,
)
def get_request(
    request_id: str,
):
    """
    Returns a request by ID.
    """

    request = get_request_by_id(
        request_id
    )

    if request is None:

        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    return request


@router.post(
    "/",
    response_model=RequestResponse,
)
def create_new_request(
    payload: RequestCreate,
):
    """
    Creates a new request.
    """

    now = datetime.now(
        UTC
    )

    request = Request(
        request_id=(
            f"REQ-{uuid4().hex[:8].upper()}"
        ),
        test_request=(
            payload.test_request
        ),
        clinical_information=(
            payload.clinical_information
        ),
        referring_medical_practitioner=(
            payload.referring_medical_practitioner
        ),
        request_type=(
            payload.request_type
        ),
        priority=payload.priority,
        status=(
            RequestStatus.SUBMITTED
        ),
        age=payload.age,
        sex=payload.sex,
        departments=(
            payload.departments
        ),
        sla_hours=payload.sla_hours,
        created_by=(
            payload.created_by
        ),
        created_at=now,
        updated_at=now,
    )

    if is_duplicate_request(
        request
    ):
        raise HTTPException(
            status_code=409,
            detail=(
                "Duplicate request detected"
            ),
        )

    return create_request(
        request
    )


@router.put(
    "/{request_id}",
    response_model=RequestResponse,
)
def update_existing_request(
    request_id: str,
    payload: RequestUpdate,
):
    """
    Updates an existing request.

    Immutable fields:
    - request_id
    - age
    - sex
    - created_by
    - created_at
    - referring_medical_practitioner

    Editable fields:
    - test_request
    - clinical_information
    - request_type
    - departments
    - priority
    - status
    """

    existing_request = (
        get_request_by_id(
            request_id
        )
    )

    if existing_request is None:

        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    request = update_request(
        request_id=request_id,
        test_request=(
            payload.test_request
        ),
        clinical_information=(
            payload.clinical_information
        ),
        request_type=(
            payload.request_type
        ),
        departments=(
            payload.departments
        ),
        priority=payload.priority,
        status=payload.status,
    )

    return request