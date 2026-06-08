# backend/app/modules/assignment/constants.py

"""
Assignment Constants
--------------------
Assignment engine constants and supported
assignment strategies.

Phase 20 Foundation
Assignment Engine
"""

ASSIGNMENT_STATUS_ASSIGNED = "ASSIGNED"
ASSIGNMENT_STATUS_REASSIGNED = "REASSIGNED"

STRATEGY_MANUAL = "MANUAL"
STRATEGY_DEPARTMENT = "DEPARTMENT"
STRATEGY_SKILL = "SKILL"
STRATEGY_CAPACITY = "CAPACITY"
STRATEGY_HYBRID = "HYBRID"

SUPPORTED_STRATEGIES = [
    STRATEGY_MANUAL,
    STRATEGY_DEPARTMENT,
    STRATEGY_SKILL,
    STRATEGY_CAPACITY,
    STRATEGY_HYBRID,
]