# backend/app/services/tat_service.py

"""
TAT Service Layer
-----------------
Contains dashboard metric business logic.
"""

from app.models.tat import TATMetrics


class TATService:
    @staticmethod
    def get_dashboard_metrics() -> TATMetrics:
        """
        Mock seed data for dashboard.
        Replace later with DB-backed metrics.
        """

        return TATMetrics(
            total_requests=1248,
            avg_tat_hours=4.2,
            completed=1103,
            breached_sla=27,
        )