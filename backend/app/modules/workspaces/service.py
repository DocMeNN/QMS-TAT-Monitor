# backend/app/modules/workspaces/service.py

"""
Workspace Service
-----------------
Core workspace segmentation logic.

Phase 28
Workspace Segmentation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- Multi-workspace ready
"""

from datetime import (datetime, UTC,)
from uuid import uuid4

from backend.app.models.workspace import (
    WorkspaceMembership,
    WorkspaceRecord,
)
from backend.app.modules.workspaces.constants import (
    DEFAULT_WORKSPACE_STATUS,
)


class WorkspaceService:
    """
    Manages workspace lifecycle
    and memberships.
    """

    def __init__(self) -> None:

        self._workspaces: dict[
            str,
            WorkspaceRecord,
        ] = {}

        self._memberships: list[
            WorkspaceMembership
        ] = []

    def create_workspace(
        self,
        name: str,
        workspace_type: str,
        description: str,
        created_by: str,
    ) -> WorkspaceRecord:

        workspace = WorkspaceRecord(
            workspace_id=str(uuid4()),
            name=name,
            workspace_type=workspace_type,
            status=DEFAULT_WORKSPACE_STATUS.value,
            description=description,
            created_by=created_by,
            created_at=datetime.now(UTC),
        )

        self._workspaces[
            workspace.workspace_id
        ] = workspace

        return workspace

    def get_workspace(
        self,
        workspace_id: str,
    ) -> WorkspaceRecord | None:

        return self._workspaces.get(
            workspace_id
        )

    def list_workspaces(
        self,
    ) -> list[WorkspaceRecord]:

        return list(
            self._workspaces.values()
        )

    def update_workspace(
        self,
        workspace_id: str,
        name: str | None = None,
        description: str | None = None,
        status: str | None = None,
    ) -> WorkspaceRecord | None:

        workspace = self.get_workspace(
            workspace_id
        )

        if workspace is None:
            return None

        if name is not None:
            workspace.name = name

        if description is not None:
            workspace.description = (
                description
            )

        if status is not None:
            workspace.status = status

        return workspace

    def assign_user(
        self,
        workspace_id: str,
        user_id: str,
        assigned_by: str,
    ) -> WorkspaceMembership:

        membership = WorkspaceMembership(
            workspace_id=workspace_id,
            user_id=user_id,
            assigned_by=assigned_by,
            assigned_at=datetime.now(UTC),
        )

        self._memberships.append(
            membership
        )

        return membership

    def remove_user(
        self,
        workspace_id: str,
        user_id: str,
    ) -> bool:

        for membership in (
            self._memberships
        ):

            if (
                membership.workspace_id
                == workspace_id
                and membership.user_id
                == user_id
            ):

                self._memberships.remove(
                    membership
                )

                return True

        return False

    def get_members(
        self,
        workspace_id: str,
    ) -> list[WorkspaceMembership]:

        return [
            membership
            for membership in (
                self._memberships
            )
            if membership.workspace_id
            == workspace_id
        ]


workspace_service = WorkspaceService()