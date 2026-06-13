# backend/app/modules/data_entry_workspace/alerts_service.py

"""
Phase 30 - Data Entry Workspace
Workspace Alerts Engine

Provides operational alert generation for:

- SLA Breaches
- SLA Risks
- Unassigned Requests
- Escalations
- Approval Backlogs

This module generates alerts only.

Notification delivery is intentionally out of scope
and will be implemented in future phases.
"""

from __future__ import annotations

from datetime import (datetime, UTC,), timedelta
from typing import List
from uuid import uuid4

from backend.app.modules.approval.service import (
    approval_service,
)
from backend.app.modules.escalation.service import (
    escalation_service,
)
from backend.app.modules.requests.service import (
    get_requests,
)

from .alerts_schemas import (
    WorkspaceAlert,
    WorkspaceAlertFeed,
    WorkspaceAlertSeverity,
    WorkspaceAlertType,
)
from .constants import (
    WorkspaceSLAStatus,
)
from .service import (
    WorkspaceSecurityContext,
    workspace_service,
)


SLA_RISK_THRESHOLD_MINUTES = 30

APPROVAL_BACKLOG_HOURS = 24


class WorkspaceAlertsService:
    """
    Workspace alert generation service.
    """

    def generate_sla_alerts(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceAlert]:
        """
        Generate SLA breach and SLA risk alerts.
        """

        alerts: List[WorkspaceAlert] = []

        requests = get_requests()

        for request in requests:

            sla = (
                workspace_service._build_sla_snapshot(
                    request.request_id
                )
            )

            if (
                sla.status
                == WorkspaceSLAStatus.BREACHED
            ):
                alerts.append(
                    WorkspaceAlert(
                        id=str(uuid4()),
                        type=(
                            WorkspaceAlertType.SLA_BREACH
                        ),
                        severity=(
                            WorkspaceAlertSeverity.CRITICAL
                        ),
                        request_id=request.request_id,
                        title="SLA Breached",
                        message=(
                            "Request exceeded SLA target."
                        ),
                        created_at=datetime.now(UTC),
                    )
                )

                continue

            if (
                sla.remaining_minutes
                is not None
                and sla.remaining_minutes
                <= SLA_RISK_THRESHOLD_MINUTES
            ):
                alerts.append(
                    WorkspaceAlert(
                        id=str(uuid4()),
                        type=(
                            WorkspaceAlertType.SLA_RISK
                        ),
                        severity=(
                            WorkspaceAlertSeverity.HIGH
                        ),
                        request_id=request.request_id,
                        title="SLA At Risk",
                        message=(
                            "Request approaching SLA breach."
                        ),
                        created_at=datetime.now(UTC),
                    )
                )

        return alerts

    def generate_assignment_alerts(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceAlert]:
        """
        Generate unassigned request alerts.
        """

        alerts: List[WorkspaceAlert] = []

        requests = get_requests()

        for request in requests:

            if getattr(
                request,
                "assigned_to",
                None,
            ):
                continue

            alerts.append(
                WorkspaceAlert(
                    id=str(uuid4()),
                    type=WorkspaceAlertType.UNASSIGNED,
                    severity=(
                        WorkspaceAlertSeverity.MEDIUM
                    ),
                    request_id=request.request_id,
                    title="Unassigned Request",
                    message=(
                        "Request has not been assigned."
                    ),
                    created_at=datetime.now(UTC),
                )
            )

        return alerts

    def generate_escalation_alerts(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceAlert]:
        """
        Generate escalation alerts.
        """

        alerts: List[WorkspaceAlert] = []

        escalations = (
            escalation_service.list_escalations()
        )

        for escalation in escalations:

            if (
                str(
                    escalation.status
                ).upper()
                != "ACTIVE"
            ):
                continue

            alerts.append(
                WorkspaceAlert(
                    id=str(uuid4()),
                    type=WorkspaceAlertType.ESCALATED,
                    severity=(
                        WorkspaceAlertSeverity.HIGH
                    ),
                    request_id=(
                        escalation.request_id
                    ),
                    title="Escalated Request",
                    message=(
                        "Request currently under escalation."
                    ),
                    created_at=datetime.now(UTC),
                )
            )

        return alerts

    def generate_approval_alerts(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> List[WorkspaceAlert]:
        """
        Generate approval backlog alerts.
        """

        alerts: List[WorkspaceAlert] = []

        approvals = (
            approval_service.list_approvals()
        )

        threshold = (
            datetime.now(UTC)
            - timedelta(
                hours=APPROVAL_BACKLOG_HOURS
            )
        )

        for approval in approvals:

            if (
                str(
                    approval.status
                ).upper()
                != "PENDING"
            ):
                continue

            if (
                approval.created_at
                > threshold
            ):
                continue

            alerts.append(
                WorkspaceAlert(
                    id=str(uuid4()),
                    type=(
                        WorkspaceAlertType.APPROVAL_BACKLOG
                    ),
                    severity=(
                        WorkspaceAlertSeverity.MEDIUM
                    ),
                    request_id=approval.request_id,
                    title="Approval Backlog",
                    message=(
                        "Approval awaiting action."
                    ),
                    created_at=datetime.now(UTC),
                )
            )

        return alerts

    def generate_alert_feed(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceAlertFeed:
        """
        Generate consolidated alert feed.
        """

        alerts: List[WorkspaceAlert] = []

        alerts.extend(
            self.generate_sla_alerts(
                security_context
            )
        )

        alerts.extend(
            self.generate_assignment_alerts(
                security_context
            )
        )

        alerts.extend(
            self.generate_escalation_alerts(
                security_context
            )
        )

        alerts.extend(
            self.generate_approval_alerts(
                security_context
            )
        )

        alerts.sort(
            key=lambda x: x.created_at,
            reverse=True,
        )

        return WorkspaceAlertFeed(
            alerts=alerts,
            total=len(alerts),
            critical_count=len(
                [
                    a
                    for a in alerts
                    if a.severity
                    == WorkspaceAlertSeverity.CRITICAL
                ]
            ),
            high_count=len(
                [
                    a
                    for a in alerts
                    if a.severity
                    == WorkspaceAlertSeverity.HIGH
                ]
            ),
            medium_count=len(
                [
                    a
                    for a in alerts
                    if a.severity
                    == WorkspaceAlertSeverity.MEDIUM
                ]
            ),
            low_count=len(
                [
                    a
                    for a in alerts
                    if a.severity
                    == WorkspaceAlertSeverity.LOW
                ]
            ),
        )


workspace_alerts_service = (
    WorkspaceAlertsService()
)