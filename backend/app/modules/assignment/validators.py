# backend/app/modules/assignment/validators.py

"""
Assignment Validators
---------------------
Assignment governance validation layer.

Mountain 7
Wave 7A

Assignment Ownership Integrity
"""

from typing import List
from typing import Optional

from backend.app.models.assignment import (
    Assignment,
)

from backend.app.modules.assignment.constants import (
    AssignmentStatus,
)


class AssignmentConflictError(
    Exception,
):
    """
    Raised when assignment
    ownership integrity is violated.
    """


def get_active_assignment(
    request_id: str,
    assignments: List[Assignment],
) -> Optional[Assignment]:
    """
    Return the current active
    assignment for a request.
    """

    active = [
        item
        for item in assignments
        if (
            item.request_id
            == request_id
            and item.status
            == AssignmentStatus.ACTIVE.value
        )
    ]

    if len(active) > 1:
        raise AssignmentConflictError(
            (
                "Multiple active assignments "
                f"detected for {request_id}"
            )
        )

    return (
        active[0]
        if active
        else None
    )


def validate_single_active_assignment(
    request_id: str,
    assignments: List[Assignment],
) -> None:
    """
    Ensures only one active
    assignment exists.
    """

    active_count = sum(
        1
        for item in assignments
        if (
            item.request_id
            == request_id
            and item.status
            == AssignmentStatus.ACTIVE.value
        )
    )

    if active_count > 1:
        raise AssignmentConflictError(
            (
                "Assignment ownership "
                "integrity violation."
            )
        )


def ensure_request_assignable(
    request_id: str,
    assignments: List[Assignment],
) -> None:
    """
    Validates assignment integrity
    before new assignment creation.
    """

    validate_single_active_assignment(
        request_id=request_id,
        assignments=assignments,
    )