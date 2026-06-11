# backend/app/modules/alerts/schemas.py

"""
Alerts Module Schemas
---------------------
Operational alert contracts.

Phase 18 Foundation
Alerts Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Alert-ready
- Dashboard-ready
"""

from pydantic import BaseModel


class AlertResponse(BaseModel):
    """
    Alert response payload.
    """

    status: str

    message: str


__all__ = [
    "AlertResponse",
]