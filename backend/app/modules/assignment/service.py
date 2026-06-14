# backend/app/modules/assignment/service.py

"""
Assignment Service
------------------
Assignment governance hardened.

Mountain 7
Wave 7A + Wave 7B + Wave 7E

Assignment Ownership Integrity
Request Ownership Synchronization
Service Layer Type Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- Workflow-ready
- Audit-ready
"""

from datetime import (
    UTC,
    datetime,
)

from typing import (
    List,
    Optional,
)

from backend.app.models.assignment import (
    Assignment,
    AssignmentHistory,
)

from backend.app.modules.assignment.constants import (
    AssignmentAction,
    AssignmentStatus,
    AssignmentStrategy,
)

from backend.app.modules.assignment.validators import (
    ensure_request_assignable,
    get_active_assignment,
)

from backend.app.modules.requests.constants import (
    Department,
)

from backend.app.modules.requests.service import (
    assign_request_owner,
)

from backend.app.modules.requests.validators import (
    get_request_or_raise,
)

_assignment_store: List[
    Assignment
] = []

_assignment_history_store: List[
    AssignmentHistory
] = []


def get_assignments() -> List[
    Assignment
]:
    """
    Returns all assignments.
    """

    return _assignment_store


def get_assignment(
    request_id: str,
) -> Optional[Assignment]:
    """
    Returns the active
    assignment for a request.
    """

    return get_active_assignment(
        request_id=request_id,
        assignments=(
            _assignment_store
        ),
    )


def get_assignment_history(
    request_id: str,
) -> List[
    AssignmentHistory
]:
    """
    Returns assignment audit
    history for a request.
    """

    return [
        item
        for item in (
            _assignment_history_store
        )
        if (
            item.request_id
            == request_id
        )
    ]


def create_assignment(
    request_id: str,
    assignee_id: str,
    assignment_strategy: (
        AssignmentStrategy
    ),
    assigned_by: str,
    department: Optional[
        Department
    ] = None,
    assignment_notes: Optional[
        str
    ] = None,
) -> Assignment:
    """
    Creates a new assignment.

    Governance Rules
    ----------------
    - Request must exist
    - Only one active assignment
      may exist per request
    - Previous assignment is
      reassigned, never deleted
    - Request ownership is
      synchronized automatically
    """

    get_request_or_raise(
        request_id
    )

    ensure_request_assignable(
        request_id=request_id,
        assignments=(
            _assignment_store
        ),
    )

    existing_assignment = (
        get_active_assignment(
            request_id=request_id,
            assignments=(
                _assignment_store
            ),
        )
    )

    if existing_assignment:

        existing_assignment.status = (
            AssignmentStatus.REASSIGNED.value
        )

        _assignment_history_store.append(
            AssignmentHistory(
                request_id=request_id,
                previous_assignee=(
                    existing_assignment.assignee_id
                ),
                new_assignee=(
                    assignee_id
                ),
                action=(
                    AssignmentAction.REASSIGNED.value
                ),
                performed_by=(
                    assigned_by
                ),
                performed_at=(
                    datetime.now(
                        UTC
                    )
                ),
                strategy=(
                    assignment_strategy.value
                ),
            )
        )

    assignment = Assignment(
        request_id=request_id,
        assignee_id=assignee_id,
        assignment_strategy=(
            assignment_strategy.value
        ),
        assigned_by=assigned_by,
        status=(
            AssignmentStatus.ACTIVE.value
        ),
        assigned_at=(
            datetime.now(
                UTC
            )
        ),
        department=(
            department.value
            if department
            else None
        ),
        assignment_notes=(
            assignment_notes
        ),
    )

    _assignment_store.append(
        assignment
    )

    _assignment_history_store.append(
        AssignmentHistory(
            request_id=request_id,
            previous_assignee=None,
            new_assignee=assignee_id,
            action=(
                AssignmentAction.ASSIGNED.value
            ),
            performed_by=assigned_by,
            performed_at=(
                datetime.now(
                    UTC
                )
            ),
            strategy=(
                assignment_strategy.value
            ),
        )
    )

    assign_request_owner(
        request_id=request_id,
        assignee_id=assignee_id,
        assigned_department=(
            department.value
            if department
            else None
        ),
    )

    return assignment