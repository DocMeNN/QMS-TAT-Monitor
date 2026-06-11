# backend/app/modules/data_entry_workspace/workspace_summary_service.py

"""
Phase 30 - Data Entry Workspace
Workspace Summary Service

Provides a consolidated operational
summary across all workspace modules.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Production-ready
- Dashboard-ready
"""

from __future__ import annotations

from pydantic import BaseModel

from .activity_service import (
    workspace_activity_service,
)
from .alerts_service import (
    workspace_alerts_service,
)
from .analytics_service import (
    analytics_service,
)
from .metrics_service import (
    metrics_service,
)
from .notifications_service import (
    workspace_notification_service,
)
from .service import (
    WorkspaceSecurityContext,
    workspace_service,
)


class WorkspaceSummaryResponse(
    BaseModel
):
    """
    Consolidated workspace summary.
    """

    total_alerts: int

    total_notifications: int

    total_activities: int

    dashboard_open_requests: int

    dashboard_completed_requests: int


class WorkspaceSummaryService:
    """
    Workspace summary engine.
    """

    def build_summary(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceSummaryResponse:
        """
        Build workspace summary.
        """

        dashboard = (
            workspace_service
            .get_dashboard(
                security_context
            )
        )

        alerts = (
            workspace_alerts_service
            .generate_alert_feed(
                security_context
            )
        )

        notifications = (
            workspace_notification_service
            .generate_notification_feed(
                security_context
            )
        )

        activities = (
            workspace_activity_service
            .generate_activity_feed(
                security_context
            )
        )

        _ = (
            metrics_service
            .build_workspace_metrics()
        )

        _ = (
            analytics_service
            .build_workspace_analytics()
        )

        return WorkspaceSummaryResponse(
            total_alerts=alerts.total,
            total_notifications=(
                notifications.total
            ),
            total_activities=(
                activities.total
            ),
            dashboard_open_requests=(
                dashboard.open_requests
            ),
            dashboard_completed_requests=(
                dashboard.completed_requests
            ),
        )


workspace_summary_service = (
    WorkspaceSummaryService()
)