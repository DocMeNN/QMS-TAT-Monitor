# backend/app/schemas/workspace.py

"""
Workspace Schemas
-----------------
Shared workspace schemas.

Phase 28
Workspace Segmentation
"""

from dataclasses import dataclass


@dataclass
class WorkspaceSummary:
    workspace_id: str

    name: str

    workspace_type: str

    status: str


@dataclass
class WorkspaceMetrics:
    total_workspaces: int

    active_workspaces: int

    inactive_workspaces: int

    archived_workspaces: int