# backend/app/modules/requests/constants.py

"""
Request Constants
-----------------
Centralized request governance constants.

Phase 30
Request Domain Refactoring

Sprint 2
Patient Demographics & Multi-Department Support

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Single source of truth
- Workflow-ready
- Validation-governed
"""

from enum import Enum


class RequestType(str, Enum):
    """
    Operational request classifications.
    """

    ROUTINE = "ROUTINE"

    URGENT = "URGENT"

    STAT = "STAT"

    REFERRAL = "REFERRAL"

    QUALITY_CONTROL = (
        "QUALITY_CONTROL"
    )

    REPEAT_TEST = (
        "REPEAT_TEST"
    )

    RESEARCH = "RESEARCH"

    VALIDATION = (
        "VALIDATION"
    )

    DIAGNOSTIC = (
        "DIAGNOSTIC"
    )

    SCREENING = (
        "SCREENING"
    )

    MONITORING = (
        "MONITORING"
    )

    CONFIRMATORY = (
        "CONFIRMATORY"
    )

    FOLLOW_UP = (
        "FOLLOW_UP"
    )


class Department(str, Enum):
    """
    Approved laboratory departments.
    """

    HEMATOLOGY = (
        "HEMATOLOGY"
    )

    CHEMICAL_PATHOLOGY = (
        "CHEMICAL_PATHOLOGY"
    )

    MICROBIOLOGY = (
        "MICROBIOLOGY"
    )

    HISTOPATHOLOGY = (
        "HISTOPATHOLOGY"
    )

    IMMUNOLOGY = (
        "IMMUNOLOGY"
    )

    MOLECULAR_DIAGNOSTICS = (
        "MOLECULAR_DIAGNOSTICS"
    )

    BLOOD_BANK = (
        "BLOOD_BANK"
    )


class Sex(str, Enum):
    """
    Patient sex.
    """

    MALE = "MALE"

    FEMALE = "FEMALE"

    OTHER = "OTHER"


__all__ = [
    "RequestType",
    "Department",
    "Sex",
]