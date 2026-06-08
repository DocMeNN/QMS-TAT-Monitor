# backend/app/models/request.py

"""
Request Domain Model
--------------------
Represents a laboratory request moving through
the operational workflow lifecycle.

Phase 15.1
Request Intake Foundation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Assignment-ready
- SLA-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Request:
    request_id: str
    title: str
    description: str
    request_type: str
    priority: str
    status: str

    assigned_to: Optional[str] = None
    assigned_department: Optional[str] = None

    sla_hours: int = 24

    created_by: str = ""
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None