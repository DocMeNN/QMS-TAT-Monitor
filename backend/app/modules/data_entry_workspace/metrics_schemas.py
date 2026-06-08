# backend/app/modules/data_entry_workspace/metrics_schemas.py

"""
Phase 30 - Data Entry Workspace
Metrics Schemas

Workspace operational metrics DTOs.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Analytics-ready
"""

from pydantic import BaseModel


class StatusCountResponse(BaseModel):
    """
    Request status totals.
    """

    open_requests: int

    in_progress_requests: int

    completed_requests: int


class WorkQueueMetricsResponse(
    BaseModel
):
    """
    Work queue metrics.
    """

    total_requests: int

    assigned_requests: int

    unassigned_requests: int


class SLAMetricsResponse(
    BaseModel
):
    """
    SLA metrics.
    """

    active: int

    at_risk: int

    breached: int

    completed: int


class ApprovalMetricsResponse(
    BaseModel
):
    """
    Approval metrics.
    """

    total_approvals: int

    pending_approvals: int


class EscalationMetricsResponse(
    BaseModel
):
    """
    Escalation metrics.
    """

    total_escalations: int

    open_escalations: int


class WorkspaceMetricsResponse(
    BaseModel
):
    """
    Aggregated workspace metrics.
    """

    status_counts: (
        StatusCountResponse
    )

    work_queue: (
        WorkQueueMetricsResponse
    )

    sla: SLAMetricsResponse

    approvals: (
        ApprovalMetricsResponse
    )

    escalations: (
        EscalationMetricsResponse
    )