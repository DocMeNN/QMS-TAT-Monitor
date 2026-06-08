# backend/app/modules/escalation/constants.py

"""
Escalation Constants
--------------------
Central escalation configuration.

Phase 23
Escalation Workflow Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
"""

from backend.app.models.escalation import EscalationLevel
from backend.app.models.escalation import EscalationStatus
from backend.app.models.escalation import EscalationTrigger


ESCALATION_MODULE_NAME = "escalation"


# ------------------------------------------------------------------
# Default Configuration
# ------------------------------------------------------------------

DEFAULT_ESCALATION_LEVEL = EscalationLevel.LEVEL_1


# ------------------------------------------------------------------
# Service Layer Status Constants
# ------------------------------------------------------------------

ESCALATION_STATUS_OPEN = EscalationStatus.OPEN.value

ESCALATION_STATUS_ACKNOWLEDGED = (
    EscalationStatus.ACKNOWLEDGED.value
)

ESCALATION_STATUS_RESOLVED = (
    EscalationStatus.RESOLVED.value
)

ESCALATION_STATUS_CANCELLED = (
    EscalationStatus.CANCELLED.value
)


# ------------------------------------------------------------------
# Escalation Priority Ranking
# ------------------------------------------------------------------

ESCALATION_LEVEL_PRIORITY = {
    EscalationLevel.LEVEL_1: 1,
    EscalationLevel.LEVEL_2: 2,
    EscalationLevel.LEVEL_3: 3,
    EscalationLevel.CRITICAL: 4,
}


# ------------------------------------------------------------------
# Automatic Escalation Triggers
# ------------------------------------------------------------------

AUTO_ESCALATION_TRIGGERS = {
    EscalationTrigger.AT_RISK,
    EscalationTrigger.BREACHED,
    EscalationTrigger.UNASSIGNED,
    EscalationTrigger.STALLED,
}


# ------------------------------------------------------------------
# Status Groups
# ------------------------------------------------------------------

TERMINAL_ESCALATION_STATUSES = {
    EscalationStatus.RESOLVED,
    EscalationStatus.CANCELLED,
}


ACTIVE_ESCALATION_STATUSES = {
    EscalationStatus.OPEN,
    EscalationStatus.ACKNOWLEDGED,
}


# ------------------------------------------------------------------
# Workflow Transition Rules
# ------------------------------------------------------------------

ESCALATION_STATUS_TRANSITIONS = {
    EscalationStatus.OPEN: [
        EscalationStatus.ACKNOWLEDGED,
        EscalationStatus.CANCELLED,
    ],
    EscalationStatus.ACKNOWLEDGED: [
        EscalationStatus.RESOLVED,
        EscalationStatus.CANCELLED,
    ],
    EscalationStatus.RESOLVED: [],
    EscalationStatus.CANCELLED: [],
}


# ------------------------------------------------------------------
# Escalation Ownership Levels
# ------------------------------------------------------------------

ESCALATION_OWNER_PROCESSOR = "PROCESSOR"

ESCALATION_OWNER_SUPERVISOR = "SUPERVISOR"

ESCALATION_OWNER_MANAGER = "MANAGER"

ESCALATION_OWNER_ADMINISTRATOR = "ADMINISTRATOR"


ESCALATION_OWNERSHIP_HIERARCHY = [
    ESCALATION_OWNER_PROCESSOR,
    ESCALATION_OWNER_SUPERVISOR,
    ESCALATION_OWNER_MANAGER,
    ESCALATION_OWNER_ADMINISTRATOR,
]