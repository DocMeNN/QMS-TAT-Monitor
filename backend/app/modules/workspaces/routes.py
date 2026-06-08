# backend/app/modules/workspaces/routes.py

"""
Workspace Routes
----------------
API endpoints for workspace management.

Phase 28
Workspace Segmentation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.workspaces.schemas import (
    AssignMemberRequest,
    CreateWorkspaceRequest,
    UpdateWorkspaceRequest,
)
from backend.app.modules.workspaces.service import (
    workspace_service,
)

router = APIRouter(
    prefix="/workspaces",
    tags=["Workspaces"],
)


@router.post("/")
def create_workspace(
    payload: CreateWorkspaceRequest,
):

    return workspace_service.create_workspace(
        name=payload.name,
        workspace_type=payload.workspace_type,
        description=payload.description,
        created_by=payload.created_by,
    )


@router.get("/")
def list_workspaces():

    return (
        workspace_service.list_workspaces()
    )


@router.get("/{workspace_id}")
def get_workspace(
    workspace_id: str,
):

    workspace = (
        workspace_service.get_workspace(
            workspace_id
        )
    )

    if workspace is None:
        raise HTTPException(
            status_code=404,
            detail="Workspace not found",
        )

    return workspace


@router.put("/{workspace_id}")
def update_workspace(
    workspace_id: str,
    payload: UpdateWorkspaceRequest,
):

    workspace = (
        workspace_service.update_workspace(
            workspace_id=workspace_id,
            name=payload.name,
            description=payload.description,
            status=payload.status,
        )
    )

    if workspace is None:
        raise HTTPException(
            status_code=404,
            detail="Workspace not found",
        )

    return workspace


@router.post(
    "/{workspace_id}/members"
)
def assign_member(
    workspace_id: str,
    payload: AssignMemberRequest,
):

    return workspace_service.assign_user(
        workspace_id=workspace_id,
        user_id=payload.user_id,
        assigned_by=payload.assigned_by,
    )


@router.delete(
    "/{workspace_id}/members/{user_id}"
)
def remove_member(
    workspace_id: str,
    user_id: str,
):

    removed = (
        workspace_service.remove_user(
            workspace_id=workspace_id,
            user_id=user_id,
        )
    )

    if not removed:
        raise HTTPException(
            status_code=404,
            detail="Membership not found",
        )

    return {
        "success": True,
    }


@router.get(
    "/{workspace_id}/members"
)
def get_members(
    workspace_id: str,
):

    return (
        workspace_service.get_members(
            workspace_id
        )
    )