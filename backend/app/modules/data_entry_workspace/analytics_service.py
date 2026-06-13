# backend/app/modules/data_entry_workspace/analytics_service.py

"""
Phase 30 - Data Entry Workspace
Analytics Service

Provides operational intelligence
calculations for workspace analytics.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Analytics-ready
- Dashboard-ready
- Reporting-ready
- Forward-compatible
"""

from __future__ import annotations

from collections import defaultdict
from datetime import (datetime, UTC,)
from typing import Dict

from backend.app.modules.approval.service import (
    approval_service,
)
from backend.app.modules.escalation.service import (
    escalation_service,
)
from backend.app.modules.requests.service import (
    get_requests,
)
from backend.app.modules.sla.service import (
    get_slas,
)

from .analytics_schemas import (
    ApprovalAnalyticsResponse,
    EscalationAnalyticsResponse,
    RequestTrendPoint,
    RequestTrendResponse,
    SLATrendPoint,
    SLATrendResponse,
    WorkloadDistributionItem,
    WorkloadDistributionResponse,
    WorkspaceAnalyticsResponse,
)


class WorkspaceAnalyticsService:
    """
    Workspace analytics engine.
    """

    def build_workspace_analytics(
        self,
    ) -> WorkspaceAnalyticsResponse:
        """
        Build complete analytics view.
        """

        return WorkspaceAnalyticsResponse(
            request_trends=(
                self.calculate_request_trends()
            ),
            sla_trends=(
                self.calculate_sla_trends()
            ),
            workload_distribution=(
                self.calculate_workload_distribution()
            ),
            approval_analytics=(
                self.calculate_approval_analytics()
            ),
            escalation_analytics=(
                self.calculate_escalation_analytics()
            ),
        )

    def calculate_request_trends(
        self,
    ) -> RequestTrendResponse:
        """
        Calculate request volume trends.
        """

        requests = get_requests()

        buckets: Dict[
            str,
            int,
        ] = defaultdict(int)

        for request in requests:

            created_at = (
                request.created_at
            )

            if created_at is None:
                continue

            period = (
                created_at.strftime(
                    "%Y-%m-%d"
                )
            )

            buckets[period] += 1

        trend_points = [
            RequestTrendPoint(
                period=period,
                request_count=count,
            )
            for period, count
            in sorted(
                buckets.items()
            )
        ]

        return RequestTrendResponse(
            trends=trend_points
        )

    def calculate_sla_trends(
        self,
    ) -> SLATrendResponse:
        """
        Calculate SLA trends.
        """

        slas = get_slas()

        buckets: Dict[
            str,
            dict[str, int]
        ] = defaultdict(
            lambda: {
                "ACTIVE": 0,
                "AT_RISK": 0,
                "BREACHED": 0,
                "COMPLETED": 0,
            }
        )

        for sla in slas:

            period = (
                sla.started_at.strftime(
                    "%Y-%m-%d"
                )
            )

            status = str(
                sla.status
            ).upper()

            if status in buckets[
                period
            ]:
                buckets[
                    period
                ][status] += 1

        trend_points = []

        for period in sorted(
            buckets.keys()
        ):

            values = buckets[
                period
            ]

            trend_points.append(
                SLATrendPoint(
                    period=period,
                    active=values[
                        "ACTIVE"
                    ],
                    at_risk=values[
                        "AT_RISK"
                    ],
                    breached=values[
                        "BREACHED"
                    ],
                    completed=values[
                        "COMPLETED"
                    ],
                )
            )

        return SLATrendResponse(
            trends=trend_points
        )

    def calculate_workload_distribution(
        self,
    ) -> WorkloadDistributionResponse:
        """
        Calculate workload allocation.
        """

        requests = get_requests()

        workload_map: Dict[
            str,
            int,
        ] = defaultdict(int)

        for request in requests:

            assignee = (
                request.assigned_to
            )

            if not assignee:
                continue

            workload_map[
                assignee
            ] += 1

        workloads = [
            WorkloadDistributionItem(
                assignee=assignee,
                active_requests=count,
            )
            for assignee, count
            in sorted(
                workload_map.items()
            )
        ]

        return (
            WorkloadDistributionResponse(
                workloads=workloads
            )
        )

    def calculate_approval_analytics(
        self,
    ) -> ApprovalAnalyticsResponse:
        """
        Calculate approval analytics.
        """

        approvals = (
            approval_service
            .list_approvals()
        )

        approved = 0
        rejected = 0
        returned = 0
        pending = 0

        for approval in approvals:

            status = str(
                approval.status
            ).upper()

            if status == "APPROVED":
                approved += 1

            elif status == "REJECTED":
                rejected += 1

            elif status == "RETURNED":
                returned += 1

            else:
                pending += 1

        return (
            ApprovalAnalyticsResponse(
                total_approvals=len(
                    approvals
                ),
                approved=approved,
                rejected=rejected,
                returned=returned,
                pending=pending,
            )
        )

    def calculate_escalation_analytics(
        self,
    ) -> EscalationAnalyticsResponse:
        """
        Calculate escalation analytics.
        """

        escalations = (
            escalation_service
            .list_escalations()
        )

        open_count = 0
        acknowledged = 0
        resolved = 0

        for escalation in escalations:

            status = str(
                escalation.status
            ).upper()

            if status == "OPEN":
                open_count += 1

            elif (
                status
                == "ACKNOWLEDGED"
            ):
                acknowledged += 1

            elif (
                status
                == "RESOLVED"
            ):
                resolved += 1

        return (
            EscalationAnalyticsResponse(
                total_escalations=len(
                    escalations
                ),
                open=open_count,
                acknowledged=acknowledged,
                resolved=resolved,
            )
        )


analytics_service = (
    WorkspaceAnalyticsService()
)