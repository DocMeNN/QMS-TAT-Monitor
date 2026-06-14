# backend/app/modules/requests/governance.py

"""
Request Governance
------------------
Centralized request governance helpers.

Sprint 3
Wave 3A

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Single source of truth
- Reusable across modules
"""

from backend.app.modules.requests.validators import (
    get_request_or_raise,
)


def validate_existing_request(
    request_id: str,
):
    """
    Validates request existence
    and returns request.

    Raises:
        ValueError
    """

    return get_request_or_raise(
        request_id
    )