# backend/app/modules/dashboard/routes.py

"""
Dashboard routes
-----------------
Analytics dashboard endpoints
"""

from fastapi import APIRouter
from .service import get_dashboard_data
from .schemas import DashboardAnalytics

router = APIRouter()


@router.get("/dashboard", response_model=DashboardAnalytics)
def dashboard():
    return get_dashboard_data()