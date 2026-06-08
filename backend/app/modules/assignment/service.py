# backend/app/modules/assignment/service.py

"""
Assignment Service
------------------
Handles assignment ownership and history.

Phase 20 Foundation
Assignment Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
"""

from datetime import datetime
from typing import List, Optional

from app.models.assignment import (
    Assignment,
    AssignmentHistory,
)


_assignment_store: List[Assignment] = []
_assignment_history_store: List[AssignmentHistory] = []


def get_assignments() -> List[Assignment]:
    """
    Returns all assignments.
    """

    return _assignment_store


def get_assignment(
    request_id: str,
) -> Optional[Assignment]:
    """
    Returns assignment by request ID.
    """

    for assignment in _assignment_store:
        if assignment.request_id == request_id:
            return assignment

    return None


def get_assignment_history(
    request_id: str,
) -> List[AssignmentHistory]:
    """
    Returns assignment history.
    """

    return [
        item
        for item in _assignment_history_store
        if item.request_id == request_id
    ]


def create_assignment(
    request_id: str,
    assignee_id: str,
    assignment_strategy: str,
    assigned_by: str,
    department: str | None = None,
    assignment_notes: str | None = None,
) -> Assignment:
    """
    Creates assignment record.
    """

    assignment = Assignment(
        request_id=request_id,
        assignee_id=assignee_id,
        assignment_strategy=assignment_strategy,
        assigned_by=assigned_by,
        assigned_at=datetime.utcnow(),
        department=department,
        assignment_notes=assignment_notes,
    )

    _assignment_store.append(assignment)

    history = AssignmentHistory(
        request_id=request_id,
        previous_assignee=None,
        new_assignee=assignee_id,
        action="ASSIGNED",
        performed_by=assigned_by,
        performed_at=datetime.utcnow(),
        strategy=assignment_strategy,
    )

    _assignment_history_store.append(history)

    return assignment


def reassign_request(
    request_id: str,
    new_assignee: str,
    performed_by: str,
    reason: str | None = None,
) -> Optional[Assignment]:
    """
    Reassigns an existing request.
    """

    assignment = get_assignment(request_id)

    if assignment is None:
        return None

    previous_assignee = assignment.assignee_id

    assignment.assignee_id = new_assignee

    history = AssignmentHistory(
        request_id=request_id,
        previous_assignee=previous_assignee,
        new_assignee=new_assignee,
        action="REASSIGNED",
        performed_by=performed_by,
        performed_at=datetime.utcnow(),
        reason=reason,
        strategy=assignment.assignment_strategy,
    )

    _assignment_history_store.append(history)

    return assignment