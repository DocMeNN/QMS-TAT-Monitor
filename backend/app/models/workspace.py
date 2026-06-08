# backend/app/models/workspace.py

"""
Workspace Domain Models
-----------------------
Represents organizational boundaries
within the Laboratory QMS Platform.

Phase 28
Workspace Segmentation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- Multi-workspace ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class WorkspaceType(str, Enum):
    LABORATORY = "LABORATORY"
    DEPARTMENT = "DEPARTMENT"
    BUSINESS_UNIT = "BUSINESS_UNIT"
    REGION = "REGION"
    TENANT = "TENANT"


class WorkspaceStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ARCHIVED = "ARCHIVED"


@dataclass
class WorkspaceRecord:
    """
    Represents a workspace boundary.
    """

    workspace_id: str

    name: str

    workspace_type: str

    status: str

    description: str

    created_by: str

    created_at: datetime


@dataclass
class WorkspaceMembership:
    """
    Represents user membership
    within a workspace.
    """

    workspace_id: str

    user_id: str

    assigned_by: str

    assigned_at: datetime