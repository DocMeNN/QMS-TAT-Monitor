# backend/app/modules/data_entry_workspace/analytics_schemas.py

"""
Phase 30 - Data Entry Workspace
Analytics Schemas

Provides operational intelligence DTOs
for dashboard analytics, trend analysis,
workload visibility, approval analytics,
and escalation analytics.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Analytics-ready
- Dashboard-ready
- Reporting-ready
"""

from typing import List

from pydantic import BaseModel, Field


class RequestTrendPoint(BaseModel):
    """
    Request volume trend point.
    """

    period: str

    request_count: int


class RequestTrendResponse(BaseModel):
    """
    Request trend analytics.
    """

    trends: List[
        RequestTrendPoint
    ] = Field(
        default_factory=list
    )


class SLATrendPoint(BaseModel):
    """
    SLA trend point.
    """

    period: str

    active: int

    at_risk: int

    breached: int

    completed: int


class SLATrendResponse(BaseModel):
    """
    SLA trend analytics.
    """

    trends: List[
        SLATrendPoint
    ] = Field(
        default_factory=list
    )


class WorkloadDistributionItem(
    BaseModel
):
    """
    Workload distribution entry.
    """

    assignee: str

    active_requests: int


class WorkloadDistributionResponse(
    BaseModel
):
    """
    Workload distribution analytics.
    """

    workloads: List[
        WorkloadDistributionItem
    ] = Field(
        default_factory=list
    )


class ApprovalAnalyticsResponse(
    BaseModel
):
    """
    Approval analytics summary.
    """

    total_approvals: int

    approved: int

    rejected: int

    returned: int

    pending: int


class EscalationAnalyticsResponse(
    BaseModel
):
    """
    Escalation analytics summary.
    """

    total_escalations: int

    open: int

    acknowledged: int

    resolved: int


class WorkspaceAnalyticsResponse(
    BaseModel
):
    """
    Master analytics payload.
    """

    request_trends: (
        RequestTrendResponse
    )

    sla_trends: (
        SLATrendResponse
    )

    workload_distribution: (
        WorkloadDistributionResponse
    )

    approval_analytics: (
        ApprovalAnalyticsResponse
    )

    escalation_analytics: (
        EscalationAnalyticsResponse
    )