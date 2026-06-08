# backend/app/modules/data_entry_workspace/constants.py

"""
Phase 30 - Data Entry Workspace
Module Constants

This module acts as an aggregation layer that provides
a unified operational view across:

- Requests
- Workflow
- Assignment
- SLA
- Escalation
- Approval
- History

No domain ownership exists within this module.
"""

from enum import Enum


MODULE_NAME = "data_entry_workspace"

API_PREFIX = "/workspace/data-entry"

API_TAG = "Data Entry Workspace"


class WorkspaceRequestStatus(str, Enum):
    """
    High-level request states displayed within
    the Data Entry Workspace.
    """

    DRAFT = "DRAFT"
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class WorkspaceSLAStatus(str, Enum):
    """
    SLA status displayed in workspace summaries.
    """

    ON_TRACK = "ON_TRACK"
    AT_RISK = "AT_RISK"
    BREACHED = "BREACHED"
    UNKNOWN = "UNKNOWN"


class WorkspaceTimelineEventType(str, Enum):
    """
    Supported timeline event categories.
    """

    REQUEST_CREATED = "REQUEST_CREATED"
    REQUEST_UPDATED = "REQUEST_UPDATED"

    WORKFLOW_STARTED = "WORKFLOW_STARTED"
    WORKFLOW_COMPLETED = "WORKFLOW_COMPLETED"

    ASSIGNMENT_CREATED = "ASSIGNMENT_CREATED"
    ASSIGNMENT_CHANGED = "ASSIGNMENT_CHANGED"

    SLA_STARTED = "SLA_STARTED"
    SLA_UPDATED = "SLA_UPDATED"
    SLA_BREACHED = "SLA_BREACHED"

    ESCALATION_CREATED = "ESCALATION_CREATED"
    ESCALATION_RESOLVED = "ESCALATION_RESOLVED"

    APPROVAL_REQUESTED = "APPROVAL_REQUESTED"
    APPROVAL_APPROVED = "APPROVAL_APPROVED"
    APPROVAL_REJECTED = "APPROVAL_REJECTED"

    COMMENT_ADDED = "COMMENT_ADDED"

    COMPLETED = "COMPLETED"


DEFAULT_PAGE_NUMBER = 1
DEFAULT_PAGE_SIZE = 25
MAX_PAGE_SIZE = 100


DASHBOARD_CARD_DRAFT = "draft_requests"
DASHBOARD_CARD_OPEN = "open_requests"
DASHBOARD_CARD_IN_PROGRESS = "in_progress_requests"
DASHBOARD_CARD_COMPLETED = "completed_requests"