# backend/app/modules/data_entry_workspace/routes.py

"""
Phase 30 - Data Entry Workspace
API Routes
"""

from fastapi import APIRouter, Query

from .constants import (
    API_PREFIX,
    API_TAG,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
)
from .schemas import (
    DashboardSummaryResponse,
    TimelineResponse,
    WorkspaceRequestDetailsResponse,
    WorkspaceRequestListResponse,
)
from .service import (
    WorkspaceSecurityContext,
    workspace_service,
)

router = APIRouter(
    prefix=API_PREFIX,
    tags=[API_TAG],
)


def get_workspace_security_context() -> WorkspaceSecurityContext:
    """
    Temporary security-context provider.

    Future source:

    - auth session
    - JWT claims
    - user service
    - RBAC service
    - workspace service
    - policy service
    """

    return WorkspaceSecurityContext(
        user_id="current-user",
        role_names=[],
        workspace_ids=[],
        permissions=[],
    )


@router.get(
    "/dashboard",
    response_model=DashboardSummaryResponse,
)
async def get_dashboard() -> DashboardSummaryResponse:
    """
    Workspace dashboard metrics.
    """

    security_context = (
        get_workspace_security_context()
    )

    return workspace_service.get_dashboard(
        security_context=security_context,
    )


@router.get(
    "/requests",
    response_model=WorkspaceRequestListResponse,
)
async def get_my_requests(
    page: int = Query(
        default=DEFAULT_PAGE_NUMBER,
        ge=1,
    ),
    page_size: int = Query(
        default=DEFAULT_PAGE_SIZE,
        ge=1,
        le=100,
    ),
) -> WorkspaceRequestListResponse:
    """
    Workspace request listing.
    """

    security_context = (
        get_workspace_security_context()
    )

    return workspace_service.get_my_requests(
        security_context=security_context,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/requests/{request_id}",
    response_model=WorkspaceRequestDetailsResponse,
)
async def get_request_details(
    request_id: str,
) -> WorkspaceRequestDetailsResponse:
    """
    Request details aggregation.
    """

    security_context = (
        get_workspace_security_context()
    )

    return workspace_service.get_request_details(
        request_id=request_id,
        security_context=security_context,
    )


@router.get(
    "/requests/{request_id}/timeline",
    response_model=TimelineResponse,
)
async def get_request_timeline(
    request_id: str,
) -> TimelineResponse:
    """
    Request lifecycle timeline.
    """

    security_context = (
        get_workspace_security_context()
    )

    return workspace_service.get_request_timeline(
        request_id=request_id,
        security_context=security_context,
    )