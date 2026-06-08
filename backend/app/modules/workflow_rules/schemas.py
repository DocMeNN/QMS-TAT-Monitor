# backend/app/modules/workflow_rules/schemas.py

"""
Workflow Rules Schemas
----------------------
Rule evaluation contracts.

Phase 22 Foundation
Task Transition Rules Engine
"""

from pydantic import BaseModel


class TransitionValidationRequest(BaseModel):
    from_status: str
    to_status: str
    role: str


class TransitionValidationResponse(BaseModel):
    valid: bool
    reason: str