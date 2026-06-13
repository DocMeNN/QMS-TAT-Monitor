# backend/app/modules/data_entry_workspace/activity_schemas.py

"""
Phase 30 - Data Entry Workspace
Workspace Activity Center Schemas
"""

from __future__ import annotations

from datetime import (datetime, UTC,)
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class ActivityType(str, Enum):
    """
    Unified activity stream types.
    """

    TIMELINE = "TIMELINE"

    ALERT = "ALERT"

    NOTIFICATION = "NOTIFICATION"


class WorkspaceActivity(BaseModel):
    """
    Unified activity record.
    """

    id: str

    request_id: Optional[str] = None

    activity_type: ActivityType

    title: str

    description: Optional[str] = None

    actor: Optional[str] = None

    timestamp: datetime


class WorkspaceActivityFeed(BaseModel):
    """
    Consolidated activity stream.
    """

    activities: List[
        WorkspaceActivity
    ] = Field(default_factory=list)

    total: int = 0