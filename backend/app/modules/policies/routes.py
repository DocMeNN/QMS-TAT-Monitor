# backend/app/modules/policies/routes.py

"""
Policy Routes
-------------
API endpoints for policy management.

Phase 29
Access Policy Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.policies.schemas import (
    CreatePolicyRequest,
    PolicyEvaluationRequest,
)
from backend.app.modules.policies.service import (
    policy_service,
)

router = APIRouter(
    prefix="/policies",
    tags=["Policies"],
)


@router.post("/")
def create_policy(
    payload: CreatePolicyRequest,
):

    return policy_service.create_policy(
        name=payload.name,
        description=payload.description,
        policy_type=payload.policy_type,
        created_by=payload.created_by,
    )


@router.get("/")
def list_policies():

    return policy_service.list_policies()


@router.get("/{policy_id}")
def get_policy(
    policy_id: str,
):

    policy = (
        policy_service.get_policy(
            policy_id
        )
    )

    if policy is None:
        raise HTTPException(
            status_code=404,
            detail="Policy not found",
        )

    return policy


@router.post("/evaluate")
def evaluate_access(
    payload: PolicyEvaluationRequest,
):

    return policy_service.evaluate_access(
        user_id=payload.user_id,
        role=payload.role,
        workspace_id=payload.workspace_id,
        resource_type=payload.resource_type,
        resource_id=payload.resource_id,
        action=payload.action,
    )


@router.post(
    "/{policy_id}/enable"
)
def enable_policy(
    policy_id: str,
):

    policy = (
        policy_service.enable_policy(
            policy_id
        )
    )

    if policy is None:
        raise HTTPException(
            status_code=404,
            detail="Policy not found",
        )

    return policy


@router.post(
    "/{policy_id}/disable"
)
def disable_policy(
    policy_id: str,
):

    policy = (
        policy_service.disable_policy(
            policy_id
        )
    )

    if policy is None:
        raise HTTPException(
            status_code=404,
            detail="Policy not found",
        )

    return policy