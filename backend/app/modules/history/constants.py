# backend/app/modules/history/constants.py

"""
History Constants
-----------------
Shared event types used by the
History Timeline Engine.

Phase 30 Wave 6B
History Timeline Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Audit-ready
"""

HISTORY_EVENT_WORKFLOW = "WORKFLOW"

HISTORY_EVENT_ASSIGNMENT = "ASSIGNMENT"

HISTORY_EVENT_ESCALATION = "ESCALATION"

HISTORY_EVENT_APPROVAL = "APPROVAL"


__all__ = [
    "HISTORY_EVENT_WORKFLOW",
    "HISTORY_EVENT_ASSIGNMENT",
    "HISTORY_EVENT_ESCALATION",
    "HISTORY_EVENT_APPROVAL",
]