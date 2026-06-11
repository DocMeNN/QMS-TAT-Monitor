# backend/app/modules/escalation/schemas.py

"""
Escalation Schemas
------------------
API schemas for escalation workflows.

Phase 23
Escalation Workflow Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
"""

from pydantic import BaseModel


class CreateEscalationRequest(BaseModel):
    request_id: str
    workflow_id: str
    trigger_type: str
    escalation_level: str
    reason: str
    created_by: str


class EscalationResponse(BaseModel):
    escalation_id: str
    request_id: str
    workflow_id: str
    trigger_type: str
    escalation_level: str
    status: str
    reason: str


class AcknowledgeEscalationRequest(BaseModel):
    acknowledged_by: str


class ResolveEscalationRequest(BaseModel):
    resolved_by: str
    resolution_notes: str | None = None


__all__ = [
    "CreateEscalationRequest",
    "EscalationResponse",
    "AcknowledgeEscalationRequest",
    "ResolveEscalationRequest",
]