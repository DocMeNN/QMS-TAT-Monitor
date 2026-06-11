# backend/app/modules/data_entry_workspace/notifications_service.py

"""
Phase 30 - Data Entry Workspace
Workspace Notification Feed Service
"""

from __future__ import annotations

from typing import List

from .alerts_schemas import (
    WorkspaceAlert,
    WorkspaceAlertSeverity,
)
from .alerts_service import (
    workspace_alerts_service,
)
from .notifications_schemas import (
    NotificationPriority,
    WorkspaceNotification,
    WorkspaceNotificationFeed,
)
from .service import (
    WorkspaceSecurityContext,
)


class WorkspaceNotificationService:
    """
    Converts operational alerts into
    user-facing notifications.
    """

    def convert_alert_to_notification(
        self,
        alert: WorkspaceAlert,
    ) -> WorkspaceNotification:
        """
        Convert alert into notification.
        """

        priority = (
            self._map_priority(
                alert.severity
            )
        )

        return WorkspaceNotification(
            id=alert.id,
            request_id=alert.request_id,
            title=alert.title,
            message=alert.message,
            priority=priority,
            source_alert_type=alert.type,
            created_at=alert.created_at,
            acknowledged=False,
        )

    def generate_notification_feed(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceNotificationFeed:
        """
        Build notification feed.
        """

        alert_feed = (
            workspace_alerts_service
            .generate_alert_feed(
                security_context
            )
        )

        notifications: List[
            WorkspaceNotification
        ] = [
            self.convert_alert_to_notification(
                alert
            )
            for alert in alert_feed.alerts
        ]

        return WorkspaceNotificationFeed(
            notifications=notifications,
            total=len(notifications),
            unread_count=len(
                [
                    n
                    for n in notifications
                    if not n.acknowledged
                ]
            ),
        )

    def acknowledge_notification(
        self,
        notification_id: str,
    ) -> bool:
        """
        Future persistence hook.

        Current implementation provides
        contract only.
        """

        _ = notification_id

        return True

    def _map_priority(
        self,
        severity: WorkspaceAlertSeverity,
    ) -> NotificationPriority:
        """
        Convert alert severity into
        notification priority.
        """

        mapping = {
            WorkspaceAlertSeverity.CRITICAL:
                NotificationPriority.CRITICAL,
            WorkspaceAlertSeverity.HIGH:
                NotificationPriority.HIGH,
            WorkspaceAlertSeverity.MEDIUM:
                NotificationPriority.MEDIUM,
            WorkspaceAlertSeverity.LOW:
                NotificationPriority.LOW,
        }

        return mapping.get(
            severity,
            NotificationPriority.LOW,
        )


workspace_notification_service = (
    WorkspaceNotificationService()
)