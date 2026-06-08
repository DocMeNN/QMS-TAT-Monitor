# backend/app/modules/policies/schemas.py

"""
Policy API Schemas
------------------
Request and response schemas
for policy operations.

Phase 29
Access Policy Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- API-ready
"""

from dataclasses import dataclass


@dataclass
class CreatePolicyRequest:
    name: str

    description: str

    policy_type: str

    created_by: str


@dataclass
class PolicyEvaluationRequest:
    user_id: str

    role: str

    workspace_id: str

    resource_type: str

    resource_id: str

    action: str


@dataclass
class PolicyEvaluationResponse:
    allowed: bool

    decision: str

    policy_name: str

    reason: str