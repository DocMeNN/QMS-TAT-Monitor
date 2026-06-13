# backend/app/modules/assignment/constants.py

"""
Assignment Constants
--------------------
Assignment governance constants.

Sprint 3
Wave 3B
Assignment Governance Hardening
"""

from enum import Enum


class AssignmentStrategy(
    str,
    Enum,
):
    MANUAL = "MANUAL"

    DEPARTMENT = (
        "DEPARTMENT"
    )

    SKILL = "SKILL"

    CAPACITY = (
        "CAPACITY"
    )

    HYBRID = "HYBRID"


ASSIGNMENT_STATUS_ASSIGNED = (
    "ASSIGNED"
)

ASSIGNMENT_STATUS_REASSIGNED = (
    "REASSIGNED"
)


__all__ = [
    "AssignmentStrategy",
    "ASSIGNMENT_STATUS_ASSIGNED",
    "ASSIGNMENT_STATUS_REASSIGNED",
]