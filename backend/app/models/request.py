# backend/app/models/request.py

"""
Request Domain Model
--------------------
Represents a laboratory request moving through
the operational workflow lifecycle.

Phase 15.1
Request Intake Foundation

Phase 30
Request Domain Refactoring

Sprint 2
Patient Demographics & Multi-Department Support

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

from backend.app.modules.requests.constants import (
    Department,
    RequestType,
    Sex,
)

from backend.app.modules.workflow.constants import (
    PriorityLevel,
    RequestStatus,
)


@dataclass
class Request:
    """
    Operational laboratory request.
    """

    request_id: str

    test_request: str

    clinical_information: str

    # Clinician requesting
    # laboratory investigation.
    referring_medical_practitioner: str

    request_type: RequestType

    priority: PriorityLevel

    status: RequestStatus

    age: int

    sex: Sex

    departments: list[
        Department
    ]

    assigned_to: Optional[
        str
    ] = None

    assigned_department: Optional[
        str
    ] = None

    sla_hours: int = 24

    # Authenticated platform user
    # who entered the request.
    created_by: str = ""

    created_at: Optional[
        datetime
    ] = None

    updated_at: Optional[
        datetime
    ] = None