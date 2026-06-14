# backend/app/modules/escalation/schemas.py

"""
Escalation Schemas
------------------
API schemas for escalation workflows.

Phase 23
Escalation Workflow Engine

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
- Validation-governed
"""

from pydantic import BaseModel
from pydantic import Field

from backend.app.models.escalation import (
    EscalationLevel,
    EscalationStatus,
    EscalationTrigger,
)

from backend.app.modules.workflow.constants import (
    REQUEST_ID_PATTERN,
)


class CreateEscalationRequest(
    BaseModel
):
    """
    Escalation creation contract.
    """

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    workflow_id: str

    trigger_type: EscalationTrigger

    escalation_level: EscalationLevel

    reason: str

    created_by: str


class EscalationResponse(
    BaseModel
):
    """
    Escalation response contract.
    """

    escalation_id: str

    request_id: str = Field(
        pattern=REQUEST_ID_PATTERN,
    )

    workflow_id: str

    trigger_type: EscalationTrigger

    escalation_level: EscalationLevel

    status: EscalationStatus

    reason: str

    class Config:
        from_attributes = True


class AcknowledgeEscalationRequest(
    BaseModel
):
    """
    Escalation acknowledgement contract.
    """

    acknowledged_by: str


class ResolveEscalationRequest(
    BaseModel
):
    """
    Escalation resolution contract.
    """

    resolved_by: str

    resolution_notes: str | None = None


__all__ = [
    "CreateEscalationRequest",
    "EscalationResponse",
    "AcknowledgeEscalationRequest",
    "ResolveEscalationRequest",
]