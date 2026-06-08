# backend/app/schemas/sla.py

"""
SLA API Schemas
---------------
Shared SLA contracts used throughout
the operational workflow platform.

Phase 21 Foundation
SLA Clock Engine
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SLACreate(BaseModel):
    request_id: str
    sla_hours: int


class SLAResponse(BaseModel):
    request_id: str

    sla_hours: int

    started_at: datetime

    due_at: datetime

    completed_at: Optional[datetime]

    status: str


class SLAMetricsResponse(BaseModel):
    total_tracked: int

    active: int

    completed: int

    breached: int

    at_risk: int

    compliance_percentage: float