# backend/app/modules/workflow/constants.py

"""
Workflow Constants
------------------
Centralized workflow governance constants.

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Single source of truth
- Workflow-ready
- SLA-ready
- Audit-ready
"""

from enum import Enum
import re

REQUEST_ID_PATTERN = r"^REQ-[A-F0-9]{8}$"


class PriorityLevel(str, Enum):
    """
    Approved platform priority levels.
    """

    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    URGENT = "URGENT"


class RequestStatus(str, Enum):
    """
    Approved workflow statuses.
    """

    SUBMITTED = "SUBMITTED"

    VALIDATED = "VALIDATED"

    ASSIGNED = "ASSIGNED"

    IN_PROGRESS = "IN_PROGRESS"

    PENDING_REVIEW = "PENDING_REVIEW"

    RETURNED = "RETURNED"

    APPROVED = "APPROVED"

    COMPLETED = "COMPLETED"

    CLOSED = "CLOSED"

    ON_HOLD = "ON_HOLD"

    ESCALATED = "ESCALATED"

    CANCELLED = "CANCELLED"


WORKFLOW_STATES = [
    status.value
    for status
    in RequestStatus
]


def is_valid_request_id(
    request_id: str,
) -> bool:
    """
    Validates request identifier format.
    """

    return bool(
        re.fullmatch(
            REQUEST_ID_PATTERN,
            request_id,
        )
    )


__all__ = [
    "PriorityLevel",
    "RequestStatus",
    "WORKFLOW_STATES",
    "REQUEST_ID_PATTERN",
    "is_valid_request_id",
]