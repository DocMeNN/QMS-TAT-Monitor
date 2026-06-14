# backend/app/modules/requests/service.py

"""
Request Service
---------------
Handles request lifecycle operations.

Phase 15 Foundation
Request Intake Engine

Phase 30
Request Domain Refactoring

Sprint 2
Patient Demographics & Multi-Department Support

Mountain 7
Wave 7B

Request Ownership Synchronization

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Workflow-ready
"""

from datetime import (
    datetime,
    UTC,
)

from typing import (
    List,
    Optional,
)

from backend.app.models.request import (
    Request,
)

from backend.app.modules.requests.constants import (
    Department,
    RequestType,
)

from backend.app.modules.workflow.constants import (
    PriorityLevel,
    RequestStatus,
)

_requests_store: List[
    Request
] = []


def get_requests() -> List[Request]:

    return _requests_store


def get_request_by_id(
    request_id: str,
) -> Optional[Request]:

    for request in (
        _requests_store
    ):

        if (
            request.request_id
            == request_id
        ):
            return request

    return None


def request_exists(
    request_id: str,
) -> bool:

    return (
        get_request_by_id(
            request_id
        )
        is not None
    )


def is_duplicate_request(
    request: Request,
) -> bool:

    for existing_request in (
        _requests_store
    ):

        if (
            existing_request.test_request.strip().upper()
            == request.test_request.strip().upper()
            and
            existing_request.clinical_information.strip().upper()
            == request.clinical_information.strip().upper()
            and
            existing_request.request_type
            == request.request_type
            and
            existing_request.referring_medical_practitioner.strip().upper()
            ==
            request.referring_medical_practitioner.strip().upper()
        ):
            return True

    return False


def create_request(
    request: Request,
) -> Request:

    _requests_store.append(
        request
    )

    return request


def assign_request_owner(
    request_id: str,
    assignee_id: str,
    assigned_department: Optional[
        str
    ] = None,
) -> Optional[Request]:
    """
    Synchronizes request ownership
    with assignment governance.

    System-managed operation.
    """

    request = (
        get_request_by_id(
            request_id
        )
    )

    if request is None:
        return None

    request.assigned_to = (
        assignee_id
    )

    request.assigned_department = (
        assigned_department
    )

    request.status = (
        RequestStatus.ASSIGNED
    )

    request.updated_at = (
        datetime.now(
            UTC
        )
    )

    return request


def update_request(
    request_id: str,
    test_request: Optional[
        str
    ] = None,
    clinical_information: Optional[
        str
    ] = None,
    referring_medical_practitioner: Optional[
        str
    ] = None,
    request_type: Optional[
        RequestType
    ] = None,
    departments: Optional[
        list[Department]
    ] = None,
    priority: Optional[
        PriorityLevel
    ] = None,
    status: Optional[
        RequestStatus
    ] = None,
) -> Optional[Request]:

    request = (
        get_request_by_id(
            request_id
        )
    )

    if request is None:
        return None

    if test_request is not None:
        request.test_request = (
            test_request
        )

    if clinical_information is not None:
        request.clinical_information = (
            clinical_information
        )

    if (
        referring_medical_practitioner
        is not None
    ):
        request.referring_medical_practitioner = (
            referring_medical_practitioner
        )

    if request_type is not None:
        request.request_type = (
            request_type
        )

    if departments is not None:
        request.departments = (
            departments
        )

    if priority is not None:
        request.priority = (
            priority
        )

    if status is not None:
        request.status = (
            status
        )

    request.updated_at = (
        datetime.now(
            UTC
        )
    )

    return request