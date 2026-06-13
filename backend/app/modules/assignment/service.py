# backend/app/modules/assignment/service.py

"""
Assignment Service
------------------
Assignment governance hardened.

Sprint 3
Wave 3A + 3B
"""

from datetime import (
    datetime,
    UTC,
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
    AssignmentStrategy,
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


def get_assignments():
    return _assignment_store


def get_assignment(
    request_id: str,
) -> Optional[Assignment]:

    for assignment in (
        _assignment_store
    ):
        if (
            assignment.request_id
            == request_id
        ):
            return assignment

    return None


def get_assignment_history(
    request_id: str,
):
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
    department=None,
    assignment_notes=None,
) -> Assignment:

    request = (
        get_request_or_raise(
            request_id
        )
    )

    assignment = Assignment(
        request_id=request_id,
        assignee_id=assignee_id,
        assignment_strategy=(
            assignment_strategy.value
        ),
        assigned_by=assigned_by,
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

    history = (
        AssignmentHistory(
            request_id=request_id,
            previous_assignee=None,
            new_assignee=assignee_id,
            action="ASSIGNED",
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

    _assignment_history_store.append(
        history
    )

    return assignment