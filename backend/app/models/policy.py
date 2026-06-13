# backend/app/models/policy.py

"""
Policy Domain Models
--------------------
Represents access control policies
for the Laboratory QMS Platform.

Phase 29
Access Policy Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- Security-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import (datetime, UTC,)
from enum import Enum


class PolicyType(str, Enum):
    ROLE_POLICY = "ROLE_POLICY"
    WORKSPACE_POLICY = "WORKSPACE_POLICY"
    OWNERSHIP_POLICY = "OWNERSHIP_POLICY"
    SLA_POLICY = "SLA_POLICY"
    APPROVAL_POLICY = "APPROVAL_POLICY"
    ESCALATION_POLICY = "ESCALATION_POLICY"


class PolicyStatus(str, Enum):
    ACTIVE = "ACTIVE"
    DISABLED = "DISABLED"


class PolicyDecision(str, Enum):
    ALLOW = "ALLOW"
    DENY = "DENY"


@dataclass
class PolicyRecord:
    """
    Represents a policy definition.
    """

    policy_id: str

    name: str

    description: str

    policy_type: str

    status: str

    created_by: str

    created_at: datetime


@dataclass
class PolicyEvaluationResult:
    """
    Result of policy evaluation.
    """

    allowed: bool

    decision: str

    policy_name: str

    reason: str