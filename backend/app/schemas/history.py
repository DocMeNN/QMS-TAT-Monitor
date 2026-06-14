# backend/app/shemas/history.py

"""
History API Schemas
-------------------
Shared history response contracts used by
the History Timeline Engine.

Phase 30 Wave 6B
History Timeline Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Audit-ready
- Validation-governed
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import Field

from backend.app.modules.workflow.constants import (
    REQUEST_ID_PATTERN,
)


class HistoryEventResponse(
    BaseModel
):
    """
    Unified historical event.
    """

    event_type: str

    title: str

    actor: Optional[str] = None

    description: Optional[str] = None

    timestamp: datetime


class HistoryResponse(
    BaseModel
):
    """
    Complete request history.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    events: list[
        HistoryEventResponse
    ]

    class Config:
        from_attributes = True