# backend/app/modules/history/routes.py

"""
History Routes
--------------
Unified request history endpoints.

Phase 30 Wave 6B
History Timeline Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Audit-ready
"""

from fastapi import APIRouter

from backend.app.modules.history.schemas import (
    HistoryResponse,
)

from backend.app.modules.history.service import (
    history_service,
)

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get(
    "/{request_id}",
    response_model=HistoryResponse,
)
def get_request_history(
    request_id: str,
):
    """
    Returns complete request history.
    """

    return history_service.get_request_history(
        request_id=request_id,
    )