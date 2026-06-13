# backend/app/modules/data_entry_workspace/alerts_schemas.py

"""
Phase 30 - Data Entry Workspace
Workspace Alerts Schemas
"""

from __future__ import annotations

from datetime import (datetime, UTC,)
from enum import Enum
from typing import List

from pydantic import BaseModel, Field


class WorkspaceAlertSeverity(str, Enum):
    """
    Alert severity levels.
    """

    INFO = "INFO"

    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    CRITICAL = "CRITICAL"


class WorkspaceAlertType(str, Enum):
    """
    Supported workspace alert categories.
    """

    SLA_BREACH = "SLA_BREACH"

    SLA_RISK = "SLA_RISK"

    UNASSIGNED = "UNASSIGNED"

    ESCALATED = "ESCALATED"

    APPROVAL_BACKLOG = "APPROVAL_BACKLOG"


class WorkspaceAlert(BaseModel):
    """
    Single operational alert.
    """

    id: str

    type: WorkspaceAlertType

    severity: WorkspaceAlertSeverity

    request_id: str

    title: str

    message: str

    created_at: datetime


class WorkspaceAlertFeed(BaseModel):
    """
    Consolidated workspace alert feed.
    """

    alerts: List[WorkspaceAlert] = Field(
        default_factory=list
    )

    total: int = 0

    critical_count: int = 0

    high_count: int = 0

    medium_count: int = 0

    low_count: int = 0