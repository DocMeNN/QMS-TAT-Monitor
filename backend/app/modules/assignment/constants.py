# backend/app/modules/assignment/constants.py

"""
Assignment Constants
--------------------
Assignment governance constants.

Sprint 3
Wave 3B + Mountain 7 Wave 7A

Assignment Governance Hardening
Assignment Ownership Integrity
"""

from enum import Enum


class AssignmentStrategy(
    str,
    Enum,
):
    MANUAL = "MANUAL"

    DEPARTMENT = "DEPARTMENT"

    SKILL = "SKILL"

    CAPACITY = "CAPACITY"

    HYBRID = "HYBRID"


class AssignmentStatus(
    str,
    Enum,
):
    ACTIVE = "ACTIVE"

    REASSIGNED = (
        "REASSIGNED"
    )

    COMPLETED = (
        "COMPLETED"
    )

    CANCELLED = (
        "CANCELLED"
    )


class AssignmentAction(
    str,
    Enum,
):
    ASSIGNED = "ASSIGNED"

    REASSIGNED = (
        "REASSIGNED"
    )

    COMPLETED = (
        "COMPLETED"
    )

    CANCELLED = (
        "CANCELLED"
    )


__all__ = [
    "AssignmentStrategy",
    "AssignmentStatus",
    "AssignmentAction",
]