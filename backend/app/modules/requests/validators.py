# backend/app/modules/requests/validators.py

"""
Request Validators
------------------
Centralized request governance validation.

Sprint 3
Wave 3A
Request Governance Expansion

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Single source of truth
- Reusable across modules
"""

from backend.app.modules.requests.service import (
    get_request_by_id,
)

from backend.app.modules.workflow.constants import (
    is_valid_request_id,
)


def validate_request_id(
    request_id: str,
) -> None:
    """
    Validates request ID format.
    """

    if not is_valid_request_id(
        request_id
    ):
        raise ValueError(
            "Invalid request ID format"
        )


def get_request_or_raise(
    request_id: str,
):
    """
    Returns request or raises.
    """

    validate_request_id(
        request_id
    )

    request = get_request_by_id(
        request_id
    )

    if request is None:
        raise ValueError(
            "Request not found"
        )

    return request