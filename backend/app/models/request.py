# backend/app/models/request.py

"""
Request Domain Model
--------------------
Represents a laboratory request moving through
the operational workflow lifecycle.

Phase 15.1
Request Intake Foundation

Phase 30
Runtime Validation Hardening

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

from backend.app.modules.workflow.constants import (
    PriorityLevel,
    RequestStatus,
)


@dataclass
class Request:
    """
    Core request domain model.
    """

    request_id: str

    title: str

    description: str

    request_type: str

    priority: PriorityLevel

    status: RequestStatus

    assigned_to: Optional[str] = None

    assigned_department: Optional[str] = None

    sla_hours: int = 24

    created_by: str = ""

    created_at: Optional[datetime] = None

    updated_at: Optional[datetime] = None