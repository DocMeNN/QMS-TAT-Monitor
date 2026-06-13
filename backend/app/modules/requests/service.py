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

from typing import List
from typing import Optional

from backend.app.models.request import (
    Request,
)

from backend.app.modules.requests.constants import (
    Department,
    RequestType,
)

_requests_store: List[
    Request
] = []


def get_requests() -> List[Request]:
    """
    Returns all requests.
    """

    return _requests_store


def get_request_by_id(
    request_id: str,
) -> Optional[Request]:
    """
    Returns a request by ID.
    """

    for request in _requests_store:

        if (
            request.request_id
            == request_id
        ):
            return request

    return None


def request_exists(
    request_id: str,
) -> bool:
    """
    Returns True if request exists.
    """

    return (
        get_request_by_id(
            request_id
        )
        is not None
    )


def is_duplicate_request(
    request: Request,
) -> bool:
    """
    Detects duplicate requests.

    Duplicate detection is based on
    clinical context rather than the
    platform user performing data entry.
    """

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
    """
    Creates a new request.
    """

    _requests_store.append(
        request
    )

    return request


def update_request(
    request_id: str,
    test_request: Optional[str] = None,
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
    priority=None,
    status=None,
) -> Optional[Request]:
    """
    Updates an existing request.

    Age and sex remain immutable.
    """

    request = get_request_by_id(
        request_id
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
        request.status = status

    request.updated_at = (
        datetime.now(UTC)
    )

    return request