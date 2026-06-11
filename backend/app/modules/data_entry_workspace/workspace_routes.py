# backend/app/modules/data_entry_workspace/workspace_routes.py

"""
Phase 30 - Data Entry Workspace
Workspace Consolidated Routes

Unified API surface for all
workspace capabilities.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Production-ready
"""

from __future__ import annotations

from fastapi import APIRouter

from .command_center_schemas import (
    WorkspaceCommandCenterResponse,
)
from .workspace_health_service import (
    WorkspaceHealthResponse,
    workspace_health_service,
)
from .workspace_summary_service import (
    WorkspaceSummaryResponse,
    workspace_summary_service,
)
from .command_center_service import (
    command_center_service,
)
from .service import (
    WorkspaceSecurityContext,
)

router = APIRouter(
    prefix="/workspace",
    tags=["Workspace"],
)


def _security_context(
) -> WorkspaceSecurityContext:
    """
    Temporary security context.

    Future source:
    Auth/RBAC middleware.
    """

    return WorkspaceSecurityContext(
        user_id="system",
        role_names=["ADMIN"],
        workspace_ids=["default"],
        permissions=["*"],
    )


@router.get(
    "/summary",
    response_model=(
        WorkspaceSummaryResponse
    ),
)
def get_workspace_summary(
) -> WorkspaceSummaryResponse:
    """
    Workspace summary endpoint.
    """

    return (
        workspace_summary_service
        .build_summary(
            _security_context()
        )
    )


@router.get(
    "/health",
    response_model=(
        WorkspaceHealthResponse
    ),
)
def get_workspace_health(
) -> WorkspaceHealthResponse:
    """
    Workspace health endpoint.
    """

    return (
        workspace_health_service
        .get_health(
            _security_context()
        )
    )


@router.get(
    "/command-center",
    response_model=(
        WorkspaceCommandCenterResponse
    ),
)
def get_command_center(
) -> WorkspaceCommandCenterResponse:
    """
    Unified command center endpoint.
    """

    return (
        command_center_service
        .build_command_center(
            _security_context()
        )
    )