# backend/app/modules/dashboard/routes.py

"""
Dashboard Routes
----------------
Analytics dashboard endpoints.

Phase 30 Foundation
Operational Intelligence Dashboard

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Swagger-ready
- Production-ready
"""

from fastapi import APIRouter

from backend.app.modules.dashboard.schemas import (
    DashboardAnalytics,
)
from backend.app.modules.dashboard.service import (
    get_dashboard_data,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/",
    response_model=DashboardAnalytics,
    summary="Retrieve dashboard analytics",
    description=(
        "Returns operational dashboard metrics, "
        "workflow statistics, queue visibility, "
        "and monitoring intelligence."
    ),
)
def dashboard() -> DashboardAnalytics:
    """
    Returns dashboard analytics.
    """

    return get_dashboard_data()