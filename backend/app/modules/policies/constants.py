# backend/app/modules/policies/constants.py

"""
Policy Constants
----------------
Central policy configuration.

Phase 29
Access Policy Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
"""

from backend.app.models.policy import (
    PolicyDecision,
    PolicyStatus,
    PolicyType,
)


POLICIES_MODULE_NAME = "policies"


DEFAULT_POLICY_STATUS = (
    PolicyStatus.ACTIVE
)


ACTIVE_POLICY_STATUSES = {
    PolicyStatus.ACTIVE,
}


INACTIVE_POLICY_STATUSES = {
    PolicyStatus.DISABLED,
}


SUPPORTED_POLICY_TYPES = {
    PolicyType.ROLE_POLICY,
    PolicyType.WORKSPACE_POLICY,
    PolicyType.OWNERSHIP_POLICY,
    PolicyType.SLA_POLICY,
    PolicyType.APPROVAL_POLICY,
    PolicyType.ESCALATION_POLICY,
}


DEFAULT_ALLOW_DECISION = (
    PolicyDecision.ALLOW.value
)

DEFAULT_DENY_DECISION = (
    PolicyDecision.DENY.value
)