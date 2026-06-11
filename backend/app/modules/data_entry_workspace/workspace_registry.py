# backend/app/modules/data_entry_workspace/workspace_registry.py

"""
Phase 30 - Data Entry Workspace
Workspace Registry

Central registry of workspace services.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Composition-ready
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
from .command_center_service import (
    command_center_service,
)
from .metrics_service import (
    metrics_service,
)
from .notifications_service import (
    workspace_notification_service,
)
from .search_service import (
    search_service,
)
from .service import (
    workspace_service,
)
from .workspace_health_service import (
    workspace_health_service,
)
from .workspace_summary_service import (
    workspace_summary_service,
)


class WorkspaceRegistry:
    """
    Central workspace registry.
    """

    workspace = workspace_service

    alerts = workspace_alerts_service

    notifications = (
        workspace_notification_service
    )

    activity = (
        workspace_activity_service
    )

    metrics = metrics_service

    analytics = analytics_service

    search = search_service

    command_center = (
        command_center_service
    )

    summary = (
        workspace_summary_service
    )

    health = (
        workspace_health_service
    )


workspace_registry = (
    WorkspaceRegistry()
)