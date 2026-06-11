# backend/app/modules/data_entry_workspace/command_center_service.py

"""
Phase 30 - Data Entry Workspace
Command Center Service

Unified operational workspace
aggregation layer.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Production-ready
- Dashboard-ready
- Executive-ready
"""

from __future__ import annotations

from .activity_service import (
    workspace_activity_service,
)
from .alerts_service import (
    workspace_alerts_service,
)
from .analytics_service import (
    analytics_service,
)
from .command_center_schemas import (
    WorkspaceCommandCenterResponse,
)
from .metrics_service import (
    metrics_service,
)
from .notifications_service import (
    workspace_notification_service,
)
from .search_schemas import (
    SearchRequest,
)
from .search_service import (
    search_service,
)
from .service import (
    WorkspaceSecurityContext,
    workspace_service,
)


class WorkspaceCommandCenterService:
    """
    Master operational workspace service.
    """

    def build_command_center(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceCommandCenterResponse:
        """
        Build complete command center.
        """

        dashboard = (
            workspace_service
            .get_dashboard(
                security_context
            )
        )

        metrics = (
            metrics_service
            .build_workspace_metrics()
        )

        analytics = (
            analytics_service
            .build_workspace_analytics()
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

        activity_feed = (
            workspace_activity_service
            .generate_activity_feed(
                security_context
            )
        )

        recent_requests = (
            search_service.search_requests(
                SearchRequest(
                    page=1,
                    page_size=10,
                )
            )
        )

        return (
            WorkspaceCommandCenterResponse(
                dashboard=dashboard,
                metrics=metrics,
                analytics=analytics,
                alerts=alerts,
                notifications=notifications,
                activity_feed=activity_feed,
                recent_requests=(
                    recent_requests
                ),
            )
        )


command_center_service = (
    WorkspaceCommandCenterService()
)