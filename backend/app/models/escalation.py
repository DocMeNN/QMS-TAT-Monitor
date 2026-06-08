# backend/app/models/escalation.py

"""
Escalation Domain Models
------------------------
Represents escalation workflows triggered
by SLA breaches, stalled requests, and
workflow exceptions.

Phase 23
Escalation Workflow Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class EscalationLevel(str, Enum):
    LEVEL_1 = "LEVEL_1"
    LEVEL_2 = "LEVEL_2"
    LEVEL_3 = "LEVEL_3"
    CRITICAL = "CRITICAL"


class EscalationTrigger(str, Enum):
    AT_RISK = "AT_RISK"
    BREACHED = "BREACHED"
    UNASSIGNED = "UNASSIGNED"
    STALLED = "STALLED"
    MANUAL = "MANUAL"


class EscalationStatus(str, Enum):
    OPEN = "OPEN"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"
    CANCELLED = "CANCELLED"


@dataclass
class EscalationRecord:
    escalation_id: str

    request_id: str

    workflow_id: str

    trigger_type: str

    escalation_level: str

    reason: str

    status: str

    created_by: str

    created_at: datetime

    acknowledged_by: Optional[str] = None
    acknowledged_at: Optional[datetime] = None

    resolved_by: Optional[str] = None
    resolved_at: Optional[datetime] = None

    resolution_notes: Optional[str] = None