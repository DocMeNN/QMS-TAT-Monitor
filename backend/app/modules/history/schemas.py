# backend/app/modules/history/schemas.py

"""
History Schemas

Phase 30 - Wave 6B
History Timeline Engine
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class HistoryEventResponse(BaseModel):
    """
    Unified historical event.
    """

    event_type: str

    title: str

    actor: Optional[str] = None

    description: Optional[str] = None

    timestamp: datetime


class HistoryResponse(BaseModel):
    """
    Aggregated request history.
    """

    request_id: str

    events: List[HistoryEventResponse]