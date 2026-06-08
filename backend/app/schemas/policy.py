# backend/app/schemas/policy.py

"""
Policy Schemas
--------------
Shared policy schemas.

Phase 29
Access Policy Engine
"""

from dataclasses import dataclass


@dataclass
class PolicySummary:
    policy_id: str

    name: str

    policy_type: str

    status: str


@dataclass
class PolicyMetrics:
    total_policies: int

    active_policies: int

    disabled_policies: int