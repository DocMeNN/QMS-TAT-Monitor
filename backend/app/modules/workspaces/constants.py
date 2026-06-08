# backend/app/modules/workspaces/constants.py

"""
Workspace Constants
-------------------
Central workspace configuration.

Phase 28
Workspace Segmentation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
"""

from backend.app.models.workspace import WorkspaceStatus
from backend.app.models.workspace import WorkspaceType


WORKSPACES_MODULE_NAME = "workspaces"


DEFAULT_WORKSPACE_TYPE = (
    WorkspaceType.DEPARTMENT
)

DEFAULT_WORKSPACE_STATUS = (
    WorkspaceStatus.ACTIVE
)


ACTIVE_WORKSPACE_STATUSES = {
    WorkspaceStatus.ACTIVE,
}


INACTIVE_WORKSPACE_STATUSES = {
    WorkspaceStatus.INACTIVE,
    WorkspaceStatus.ARCHIVED,
}


WORKSPACE_TYPE_HIERARCHY = {
    WorkspaceType.TENANT: 1,
    WorkspaceType.REGION: 2,
    WorkspaceType.BUSINESS_UNIT: 3,
    WorkspaceType.LABORATORY: 4,
    WorkspaceType.DEPARTMENT: 5,
}