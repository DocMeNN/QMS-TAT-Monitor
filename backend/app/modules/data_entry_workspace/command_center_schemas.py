# backend/app/modules/data_entry_workspace/command_center_schemas.py

"""
Phase 30 - Data Entry Workspace
Command Center Schemas

Unified operational workspace payload.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Dashboard-ready
- Workspace-ready
- Executive-ready
"""

from __future__ import annotations

from pydantic import BaseModel

from .activity_schemas import (
    WorkspaceActivityFeed,
)
from .alerts_schemas import (
    WorkspaceAlertFeed,
)
from .analytics_schemas import (
    WorkspaceAnalyticsResponse,
)
from .metrics_schemas import (
    WorkspaceMetricsResponse,
)
from .notifications_schemas import (
    WorkspaceNotificationFeed,
)
from .schemas import (
    DashboardSummaryResponse,
)
from .search_schemas import (
    SearchResponse,
)


class WorkspaceCommandCenterResponse(
    BaseModel
):
    """
    Unified workspace operational view.
    """

    dashboard: (
        DashboardSummaryResponse
    )

    metrics: (
        WorkspaceMetricsResponse
    )

    analytics: (
        WorkspaceAnalyticsResponse
    )

    alerts: (
        WorkspaceAlertFeed
    )

    notifications: (
        WorkspaceNotificationFeed
    )

    activity_feed: (
        WorkspaceActivityFeed
    )

    recent_requests: (
        SearchResponse
    )