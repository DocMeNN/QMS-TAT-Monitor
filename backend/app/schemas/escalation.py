# backend/app/schemas/escalation.py

from __future__ import annotations

from datetime import (datetime, UTC,)

from pydantic import BaseModel
from pydantic import ConfigDict

from backend.app.models.escalation import EscalationLevel
from backend.app.models.escalation import EscalationStatus
from backend.app.models.escalation import EscalationTrigger


class EscalationBaseSchema(BaseModel):
    request_id: int
    workflow_id: int
    sla_id: int | None = None

    level: EscalationLevel
    trigger_type: EscalationTrigger

    reason: str

    created_by: str | None = None
    assigned_to: str | None = None


class EscalationCreateSchema(EscalationBaseSchema):
    pass


class EscalationUpdateSchema(BaseModel):
    assigned_to: str | None = None
    reason: str | None = None


class EscalationAcknowledgeSchema(BaseModel):
    acknowledged_by: str


class EscalationResolveSchema(BaseModel):
    resolved_by: str


class EscalationResponseSchema(EscalationBaseSchema):
    model_config = ConfigDict(from_attributes=True)

    id: int

    status: EscalationStatus

    acknowledged_by: str | None = None
    resolved_by: str | None = None

    acknowledged_at: datetime | None = None
    resolved_at: datetime | None = None

    created_at: datetime
    updated_at: datetime