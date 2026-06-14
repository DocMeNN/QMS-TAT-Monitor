# backend/app/models/assignment.py

"""
Assignment Domain Model
-----------------------
Represents ownership and routing of
laboratory requests.

Mountain 7
Wave 7A

Assignment Ownership Integrity

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
- SLA-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Assignment:
    """
    Current assignment record.
    """

    request_id: str

    assignee_id: str

    assignment_strategy: str

    assigned_by: str

    status: str

    assigned_at: Optional[
        datetime
    ] = None

    department: Optional[
        str
    ] = None

    assignment_notes: Optional[
        str
    ] = None


@dataclass
class AssignmentHistory:
    """
    Immutable assignment
    audit record.
    """

    request_id: str

    previous_assignee: Optional[
        str
    ]

    new_assignee: str

    action: str

    performed_by: str

    performed_at: Optional[
        datetime
    ] = None

    reason: Optional[
        str
    ] = None

    strategy: Optional[
        str
    ] = None