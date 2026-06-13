# backend/app/modules/data_entry_workspace/workspace_health_service.py

"""
Phase 30 - Data Entry Workspace
Workspace Health Service

Provides operational health checks
for workspace subsystems.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Production-ready
"""

from __future__ import annotations

from datetime import (datetime, UTC,)

from pydantic import BaseModel

from .activity_service import (
    workspace_activity_service,
)
from .alerts_service import (
    workspace_alerts_service,
)
from .notifications_service import (
    workspace_notification_service,
)
from .service import (
    WorkspaceSecurityContext,
)


class WorkspaceHealthResponse(
    BaseModel
):
    """
    Workspace health snapshot.
    """

    status: str

    checked_at: datetime

    alerts_engine: bool

    notifications_engine: bool

    activity_engine: bool


class WorkspaceHealthService:
    """
    Workspace health engine.
    """

    def get_health(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceHealthResponse:
        """
        Evaluate workspace health.
        """

        workspace_alerts_service.generate_alert_feed(
            security_context
        )

        workspace_notification_service.generate_notification_feed(
            security_context
        )

        workspace_activity_service.generate_activity_feed(
            security_context
        )

        return WorkspaceHealthResponse(
            status="HEALTHY",
            checked_at=datetime.now(UTC),
            alerts_engine=True,
            notifications_engine=True,
            activity_engine=True,
        )


workspace_health_service = (
    WorkspaceHealthService()
)