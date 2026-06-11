# backend/app/modules/alerts/routes.py

"""
Alerts Routes
-------------
Operational alert endpoints.

Phase 18 Foundation
Alerts Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Dashboard-ready
"""

from fastapi import APIRouter

from backend.app.modules.alerts.schemas import (
    AlertResponse,
)
from backend.app.modules.alerts.service import (
    get_alert_summary,
)

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


@router.get(
    "/",
    response_model=AlertResponse,
)
def alerts():
    """
    Returns alert summary.
    """

    return get_alert_summary()