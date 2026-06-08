# backend/app/modules/workspaces/schemas.py

"""
Workspace API Schemas
---------------------
Request and response schemas for
workspace operations.

Phase 28
Workspace Segmentation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class CreateWorkspaceRequest:
    name: str

    workspace_type: str

    description: str

    created_by: str


@dataclass
class WorkspaceResponse:
    workspace_id: str

    name: str

    workspace_type: str

    status: str

    description: str


@dataclass
class AssignMemberRequest:
    user_id: str

    assigned_by: str


@dataclass
class MemberResponse:
    workspace_id: str

    user_id: str

    assigned_by: str

    assigned_at: str


@dataclass
class UpdateWorkspaceRequest:
    name: Optional[str] = None

    description: Optional[str] = None

    status: Optional[str] = None