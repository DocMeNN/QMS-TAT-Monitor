# backend/app/modules/data_entry_workspace/command_center_routes.py

"""
Phase 30 - Data Entry Workspace
Command Center Routes

Provides a unified operational
workspace endpoint.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
- Dashboard-ready
"""

from __future__ import annotations

from fastapi import APIRouter

from .command_center_schemas import (
    WorkspaceCommandCenterResponse,
)
from .command_center_service import (
    command_center_service,
)
from .service import (
    WorkspaceSecurityContext,
)

router = APIRouter(
    prefix="/workspace/command-center",
    tags=["Workspace Command Center"],
)


@router.get(
    "",
    response_model=(
        WorkspaceCommandCenterResponse
    ),
)
def get_command_center(
) -> WorkspaceCommandCenterResponse:
    """
    Retrieve unified workspace
    command center view.
    """

    security_context = (
        WorkspaceSecurityContext(
            user_id="system",
            role_names=[
                "ADMIN"
            ],
            workspace_ids=[
                "default"
            ],
            permissions=[
                "*"
            ],
        )
    )

    return (
        command_center_service
        .build_command_center(
            security_context
        )
    )