# backend/app/modules/workflow_rules/constants.py

"""
Workflow Rules Constants
------------------------
Centralized workflow state transitions
and role permissions.

Phase 22 Foundation
Task Transition Rules Engine
"""

WORKFLOW_TRANSITIONS = {
    "SUBMITTED": [
        "VALIDATED",
        "CANCELLED",
    ],
    "VALIDATED": [
        "ASSIGNED",
        "CANCELLED",
    ],
    "ASSIGNED": [
        "IN_PROGRESS",
        "ON_HOLD",
    ],
    "IN_PROGRESS": [
        "PENDING_REVIEW",
        "ESCALATED",
        "ON_HOLD",
    ],
    "PENDING_REVIEW": [
        "APPROVED",
        "RETURNED",
    ],
    "RETURNED": [
        "IN_PROGRESS",
    ],
    "APPROVED": [
        "COMPLETED",
    ],
    "COMPLETED": [
        "CLOSED",
    ],
    "ON_HOLD": [
        "IN_PROGRESS",
        "CANCELLED",
    ],
    "ESCALATED": [
        "IN_PROGRESS",
        "PENDING_REVIEW",
    ],
}

ROLE_PERMISSIONS = {
    "DATA_ENTRY": [
        "SUBMITTED",
        "VALIDATED",
    ],
    "PROCESSOR": [
        "ASSIGNED",
        "IN_PROGRESS",
        "RETURNED",
    ],
    "REVIEWER": [
        "PENDING_REVIEW",
        "APPROVED",
    ],
    "SUPERVISOR": [
        "ESCALATED",
        "ON_HOLD",
        "CLOSED",
    ],
    "ADMIN": [
        "*",
    ],
}