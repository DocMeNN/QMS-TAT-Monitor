# backend/app/modules/assignment/schemas.py

"""
Assignment Module Schemas
-------------------------
Assignment request and response contracts.

Sprint 3
Wave 3B
Assignment Governance Hardening
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from backend.app.modules.assignment.constants import (
    AssignmentStrategy,
)

from backend.app.modules.requests.constants import (
    Department,
)


class AssignmentCreate(
    BaseModel
):
    request_id: str

    assignee_id: str

    assignment_strategy: (
        AssignmentStrategy
    )

    assigned_by: str

    department: (
        Optional[
            Department
        ]
    ) = None

    assignment_notes: (
        Optional[str]
    ) = None


class AssignmentResponse(
    BaseModel
):
    request_id: str

    assignee_id: str

    assignment_strategy: str

    assigned_by: str

    assigned_at: (
        Optional[
            datetime
        ]
    ) = None

    department: (
        Optional[str]
    ) = None

    assignment_notes: (
        Optional[str]
    ) = None


class AssignmentHistoryResponse(
    BaseModel
):
    request_id: str

    previous_assignee: (
        Optional[str]
    ) = None

    new_assignee: str

    action: str

    performed_by: str

    performed_at: (
        Optional[
            datetime
        ]
    ) = None

    reason: (
        Optional[str]
    ) = None

    strategy: (
        Optional[str]
    ) = None