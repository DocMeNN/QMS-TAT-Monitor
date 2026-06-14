# backend/app/schemas/assignment.py

"""
Assignment API Schemas
----------------------
Assignment ownership and routing contracts.

Mountain 7
Wave 7A

Assignment Ownership Integrity
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AssignmentCreate(
    BaseModel
):
    request_id: str

    assignee_id: str

    assignment_strategy: str

    assigned_by: str

    department: Optional[
        str
    ] = None

    assignment_notes: Optional[
        str
    ] = None


class AssignmentResponse(
    BaseModel
):
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


class AssignmentHistoryResponse(
    BaseModel
):
    request_id: str

    previous_assignee: Optional[
        str
    ] = None

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