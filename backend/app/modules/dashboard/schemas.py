# backend/app/modules/dashboard/schemas.py

"""
Dashboard schemas
-----------------
Response contracts for live dashboard analytics.

Phase 10 Enhancements
---------------------
- Unified chart trend schema
- Throughput analytics support
- Compliance trend support
- Completion trend support
- Production-grade response validation

MeRulz Compliance
-----------------
- Full schema isolation
- Fully documented
- Modular response contracts
"""

from pydantic import BaseModel


# ============================================================
# Core Metrics Schema
# ============================================================

class DashboardMetrics(BaseModel):
    """
    Primary dashboard KPI metrics.
    """

    total_requests: int
    avg_tat_hours: float
    completed: int
    breached_sla: int


# ============================================================
# Generic Trend Point Schema
# ============================================================

class TrendPoint(BaseModel):
    """
    Standardized chart data point
    for analytics visualization.
    """

    label: str
    value: float


# ============================================================
# Dashboard Analytics Response
# ============================================================

class DashboardAnalytics(BaseModel):
    """
    Complete dashboard response payload.
    """

    metrics: DashboardMetrics
    throughput: list[TrendPoint]
    compliance_trend: list[TrendPoint]
    completion_trend: list[TrendPoint]
    completion_rate: float
    sla_compliance: float
    system_health: str
    last_updated: str