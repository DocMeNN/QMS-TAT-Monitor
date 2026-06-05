# backend/app/schemas/tat.py

"""
TAT Response Schemas
--------------------
Defines API response contracts.
"""

from pydantic import BaseModel


class TATMetricsResponse(BaseModel):
    total_requests: int
    avg_tat_hours: float
    completed: int
    breached_sla: int