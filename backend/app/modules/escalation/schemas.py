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

from dataclasses import dataclass
from typing import Optional


@dataclass
class CreateEscalationRequest:
    request_id: str

    workflow_id: str

    trigger_type: str

    escalation_level: str

    reason: str

    created_by: str


@dataclass
class EscalationResponse:
    escalation_id: str

    request_id: str

    workflow_id: str

    trigger_type: str

    escalation_level: str

    status: str

    reason: str


@dataclass
class AcknowledgeEscalationRequest:
    acknowledged_by: str


@dataclass
class ResolveEscalationRequest:
    resolved_by: str

    resolution_notes: Optional[str] = None