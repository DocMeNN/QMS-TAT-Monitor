# backend/app/schemas/request.py

"""
Request API Schemas
-------------------
Shared request contracts used throughout
the operational workflow platform.

Phase 30
Request Domain Refactoring

Sprint 2
Patient Demographics & Multi-Department Support

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Validation-governed
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import Field

from backend.app.modules.requests.constants import (
    Department,
    RequestType,
    Sex,
)

from backend.app.modules.workflow.constants import (
    PriorityLevel,
    RequestStatus,
    REQUEST_ID_PATTERN,
)


class RequestCreate(BaseModel):
    """
    Request creation contract.
    """

    test_request: str

    clinical_information: str

    referring_medical_practitioner: str

    request_type: RequestType

    priority: PriorityLevel

    age: int = Field(
        ge=0,
        le=150,
    )

    sex: Sex

    departments: list[
        Department
    ]

    sla_hours: int = 24

    created_by: str


class RequestUpdate(BaseModel):
    """
    Request update contract.

    Immutable fields:
    - request_id
    - age
    - sex
    - created_by
    - created_at
    - referring_medical_practitioner

    Editable fields:
    - test_request
    - clinical_information
    - request_type
    - departments
    - priority
    - status
    """

    test_request: Optional[
        str
    ] = None

    clinical_information: Optional[
        str
    ] = None

    request_type: Optional[
        RequestType
    ] = None

    departments: Optional[
        list[Department]
    ] = None

    priority: Optional[
        PriorityLevel
    ] = None

    status: Optional[
        RequestStatus
    ] = None


class RequestResponse(BaseModel):
    """
    Request response contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    test_request: str

    clinical_information: str

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

    sla_hours: int

    created_by: str

    created_at: Optional[
        datetime
    ]

    updated_at: Optional[
        datetime
    ]

    class Config:
        from_attributes = True