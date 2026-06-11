# backend/app/modules/data_entry_workspace/activity_service.py

"""
Phase 30 - Data Entry Workspace
Workspace Activity Center
"""

from __future__ import annotations

from typing import List

from backend.app.modules.requests.service import (
    get_requests,
)

from .activity_schemas import (
    ActivityType,
    WorkspaceActivity,
    WorkspaceActivityFeed,
)
from .alerts_service import (
    workspace_alerts_service,
)
from .notifications_service import (
    workspace_notification_service,
)
from .service import (
    WorkspaceSecurityContext,
    workspace_service,
)


class WorkspaceActivityService:
    """
    Consolidates timeline,
    alerts and notifications
    into a unified activity feed.
    """

    def generate_activity_feed(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceActivityFeed:
        """
        Generate unified activity stream.
        """

        activities: List[
            WorkspaceActivity
        ] = []

        activities.extend(
            self._build_alert_activities(
                security_context
            )
        )

        activities.extend(
            self._build_notification_activities(
                security_context
            )
        )

        activities.extend(
            self._build_timeline_activities(
                security_context
            )
        )

        activities.sort(
            key=lambda x: x.timestamp,
            reverse=True,
        )

        return WorkspaceActivityFeed(
            activities=activities,
            total=len(activities),
        )

    def _build_alert_activities(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceActivity]:

        feed = (
            workspace_alerts_service
            .generate_alert_feed(
                security_context
            )
        )

        return [
            WorkspaceActivity(
                id=alert.id,
                request_id=alert.request_id,
                activity_type=ActivityType.ALERT,
                title=alert.title,
                description=alert.message,
                timestamp=alert.created_at,
            )
            for alert in feed.alerts
        ]

    def _build_notification_activities(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceActivity]:

        feed = (
            workspace_notification_service
            .generate_notification_feed(
                security_context
            )
        )

        return [
            WorkspaceActivity(
                id=notification.id,
                request_id=notification.request_id,
                activity_type=(
                    ActivityType.NOTIFICATION
                ),
                title=notification.title,
                description=(
                    notification.message
                ),
                timestamp=(
                    notification.created_at
                ),
            )
            for notification
            in feed.notifications
        ]

    def _build_timeline_activities(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceActivity]:

        activities: List[
            WorkspaceActivity
        ] = []

        requests = get_requests()

        for request in requests:

            timeline = (
                workspace_service
                .get_request_timeline(
                    request_id=(
                        request.request_id
                    ),
                    security_context=(
                        security_context
                    ),
                )
            )

            for event in timeline.events:

                activities.append(
                    WorkspaceActivity(
                        id=event.event_id,
                        request_id=(
                            request.request_id
                        ),
                        activity_type=(
                            ActivityType.TIMELINE
                        ),
                        title=event.title,
                        description=(
                            event.description
                        ),
                        actor=event.actor,
                        timestamp=(
                            event.timestamp
                        ),
                    )
                )

        return activities


workspace_activity_service = (
    WorkspaceActivityService()
)