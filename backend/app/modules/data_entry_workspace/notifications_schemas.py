# backend/app/modules/data_entry_workspace/notifications_schemas.py

"""
Phase 30 - Data Entry Workspace
Workspace Notification Schemas
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, Field

from .alerts_schemas import (
    WorkspaceAlertType,
)


class NotificationPriority(str, Enum):
    """
    Notification priority levels.
    """

    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    CRITICAL = "CRITICAL"


class WorkspaceNotification(BaseModel):
    """
    User-facing operational notification.
    """

    id: str

    request_id: str

    title: str

    message: str

    priority: NotificationPriority

    source_alert_type: WorkspaceAlertType

    created_at: datetime

    acknowledged: bool = False


class WorkspaceNotificationFeed(BaseModel):
    """
    Notification feed response.
    """

    notifications: List[
        WorkspaceNotification
    ] = Field(default_factory=list)

    total: int = 0

    unread_count: int = 0