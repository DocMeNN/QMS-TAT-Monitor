"""
Request Service
---------------
Handles request lifecycle operations.

Phase 15 Foundation
Request Intake Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Workflow-ready
"""

from datetime import datetime
from typing import List, Optional

from backend.app.models.request import (
    Request,
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
    title: Optional[str] = None,
    description: Optional[str] = None,
    priority: Optional[str] = None,
    status: Optional[str] = None,
) -> Optional[Request]:
    """
    Updates an existing request.
    """

    request = get_request_by_id(
        request_id
    )

    if request is None:
        return None

    if title is not None:
        request.title = title

    if description is not None:
        request.description = (
            description
        )

    if priority is not None:
        request.priority = (
            priority
        )

    if status is not None:
        request.status = status

    request.updated_at = (
        datetime.utcnow()
    )

    return request