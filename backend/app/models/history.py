# backend/app/models/history

"""
History Domain Model
--------------------
Represents unified historical activity
within the laboratory workflow platform.

Phase 30 Wave 6B
History Timeline Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Audit-ready
- Workflow-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class HistoryEvent:
    """
    Represents a single historical event
    within a request lifecycle.
    """

    event_type: str

    title: str

    actor: Optional[str] = None

    description: Optional[str] = None

    timestamp: Optional[datetime] = None


@dataclass
class RequestHistory:
    """
    Represents complete historical
    activity for a request.
    """

    request_id: str

    events: list[HistoryEvent]