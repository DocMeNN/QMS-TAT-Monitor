# backend/app/modules/data_entry_workspace/metrics_service.py

"""
Phase 30 - Data Entry Workspace
Metrics Service

Workspace operational metrics engine.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Analytics-ready
- Reporting-ready
"""

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
    get_sla_metrics,
)

from .metrics_schemas import (
    ApprovalMetricsResponse,
    EscalationMetricsResponse,
    SLAMetricsResponse,
    StatusCountResponse,
    WorkQueueMetricsResponse,
    WorkspaceMetricsResponse,
)


class WorkspaceMetricsService:
    """
    Metrics engine.
    """

    def build_workspace_metrics(
        self,
    ) -> WorkspaceMetricsResponse:
        """
        Build complete metrics view.
        """

        requests = get_requests()

        open_requests = len(
            [
                x
                for x in requests
                if str(x.status).upper()
                not in [
                    "COMPLETED",
                    "CLOSED",
                ]
            ]
        )

        completed_requests = len(
            [
                x
                for x in requests
                if str(x.status).upper()
                in [
                    "COMPLETED",
                    "CLOSED",
                ]
            ]
        )

        assigned_requests = len(
            [
                x
                for x in requests
                if x.assigned_to
            ]
        )

        unassigned_requests = (
            len(requests)
            - assigned_requests
        )

        sla_metrics = (
            get_sla_metrics()
        )

        return WorkspaceMetricsResponse(
            status_counts=StatusCountResponse(
                open_requests=open_requests,
                in_progress_requests=0,
                completed_requests=completed_requests,
            ),
            work_queue=WorkQueueMetricsResponse(
                total_requests=len(
                    requests
                ),
                assigned_requests=(
                    assigned_requests
                ),
                unassigned_requests=(
                    unassigned_requests
                ),
            ),
            sla=SLAMetricsResponse(
                active=sla_metrics.active,
                at_risk=sla_metrics.at_risk,
                breached=sla_metrics.breached,
                completed=sla_metrics.completed,
            ),
            approvals=ApprovalMetricsResponse(
                total_approvals=len(
                    approval_service
                    .list_approvals()
                ),
                pending_approvals=0,
            ),
            escalations=EscalationMetricsResponse(
                total_escalations=len(
                    escalation_service
                    .list_escalations()
                ),
                open_escalations=0,
            ),
        )


metrics_service = (
    WorkspaceMetricsService()
)