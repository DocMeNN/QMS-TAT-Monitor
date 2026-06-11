# backend/app/modules/requests/routes.py

"""
Request Routes
--------------
Request intake endpoints.

Phase 15 Foundation
Request Intake Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Workflow-ready
"""

from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from backend.app.models.request import Request

from backend.app.schemas.request import (
    RequestCreate,
    RequestUpdate,
    RequestResponse,
)

from backend.app.modules.requests.service import (
    get_requests,
    get_request_by_id,
    create_request,
    update_request,
)

router = APIRouter(
    prefix="/requests",
    tags=["Requests"],
)


@router.get(
    "/",
    response_model=list[RequestResponse],
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

    now = datetime.utcnow()

    request = Request(
        request_id=(
            f"REQ-{uuid4().hex[:8].upper()}"
        ),
        title=payload.title,
        description=payload.description,
        request_type=payload.request_type,
        priority=payload.priority,
        status="SUBMITTED",
        sla_hours=payload.sla_hours,
        created_by=payload.created_by,
        created_at=now,
        updated_at=now,
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
    """

    request = update_request(
        request_id=request_id,
        title=payload.title,
        description=payload.description,
        priority=payload.priority,
        status=payload.status,
    )

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found",
        )

    return request