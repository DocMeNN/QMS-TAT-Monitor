# backend/app/models/tat.py

"""
TAT Domain Model
----------------
Represents turnaround-time dashboard metrics.
"""

from dataclasses import dataclass


@dataclass
class TATMetrics:
    total_requests: int
    avg_tat_hours: float
    completed: int
    breached_sla: int