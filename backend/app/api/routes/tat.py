# backend/app/api/routes/tat.py

"""
TAT API Routes
--------------
Exposes dashboard metric endpoints.
"""

from fastapi import APIRouter

from app.schemas.tat import TATMetricsResponse
from app.services.tat_service import TATService

router = APIRouter(prefix="/tat", tags=["TAT"])


@router.get("/metrics", response_model=TATMetricsResponse)
def get_metrics():
    """
    Fetch dashboard metrics.
    """

    metrics = TATService.get_dashboard_metrics()

    return TATMetricsResponse(
        total_requests=metrics.total_requests,
        avg_tat_hours=metrics.avg_tat_hours,
        completed=metrics.completed,
        breached_sla=metrics.breached_sla,
    )