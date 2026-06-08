# backend/app/models/sla.py

"""
SLA Domain Models
-----------------
Represents SLA tracking and monitoring
for laboratory requests.

Phase 21 Foundation
SLA Clock Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Reporting-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class SLARecord:
    request_id: str

    sla_hours: int

    started_at: datetime

    due_at: datetime

    completed_at: Optional[datetime] = None

    status: str = "ACTIVE"


@dataclass
class SLAMetrics:
    total_tracked: int

    active: int

    completed: int

    breached: int

    at_risk: int

    compliance_percentage: float