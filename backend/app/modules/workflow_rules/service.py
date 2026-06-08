# backend/app/modules/workflow_rules/service.py

"""
Workflow Rules Service
----------------------
Workflow governance and validation engine.

Phase 22 Foundation
Task Transition Rules Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
- Escalation-ready
- RBAC-ready
"""

from app.modules.workflow_rules.constants import (
    WORKFLOW_TRANSITIONS,
    ROLE_PERMISSIONS,
)


def is_valid_transition(
    from_status: str,
    to_status: str,
) -> bool:
    """
    Validates state transition.
    """

    allowed = WORKFLOW_TRANSITIONS.get(
        from_status,
        [],
    )

    return to_status in allowed


def role_can_transition(
    role: str,
    target_status: str,
) -> bool:
    """
    Validates role authority.
    """

    permissions = ROLE_PERMISSIONS.get(
        role.upper(),
        [],
    )

    if "*" in permissions:
        return True

    return target_status in permissions


def validate_transition(
    from_status: str,
    to_status: str,
    role: str,
) -> tuple[bool, str]:
    """
    Full governance validation.
    """

    if not is_valid_transition(
        from_status,
        to_status,
    ):
        return (
            False,
            f"Invalid transition: {from_status} -> {to_status}",
        )

    if not role_can_transition(
        role,
        to_status,
    ):
        return (
            False,
            f"Role '{role}' cannot transition to '{to_status}'",
        )

    return (
        True,
        "Transition approved",
    )