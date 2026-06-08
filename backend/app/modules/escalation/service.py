# backend/app/modules/escalation/service.py

"""
Escalation Service
------------------
Core escalation workflow logic.

Phase 23
Escalation Workflow Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
"""

from datetime import datetime
from uuid import uuid4

from backend.app.models.escalation import EscalationRecord
from backend.app.modules.escalation.constants import (
    ESCALATION_STATUS_ACKNOWLEDGED,
    ESCALATION_STATUS_OPEN,
    ESCALATION_STATUS_RESOLVED,
)


class EscalationService:
    """
    Manages escalation lifecycle.
    """

    def __init__(self) -> None:
        self._escalations: dict[str, EscalationRecord] = {}

    def create_escalation(
        self,
        request_id: str,
        workflow_id: str,
        trigger_type: str,
        escalation_level: str,
        reason: str,
        created_by: str,
    ) -> EscalationRecord:

        escalation = EscalationRecord(
            escalation_id=str(uuid4()),
            request_id=request_id,
            workflow_id=workflow_id,
            trigger_type=trigger_type,
            escalation_level=escalation_level,
            reason=reason,
            status=ESCALATION_STATUS_OPEN,
            created_by=created_by,
            created_at=datetime.utcnow(),
        )

        self._escalations[escalation.escalation_id] = escalation

        return escalation

    def get_escalation(
        self,
        escalation_id: str,
    ) -> EscalationRecord | None:

        return self._escalations.get(escalation_id)

    def list_escalations(
        self,
    ) -> list[EscalationRecord]:

        return list(self._escalations.values())

    def acknowledge_escalation(
        self,
        escalation_id: str,
        acknowledged_by: str,
    ) -> EscalationRecord | None:

        escalation = self.get_escalation(escalation_id)

        if escalation is None:
            return None

        escalation.status = ESCALATION_STATUS_ACKNOWLEDGED
        escalation.acknowledged_by = acknowledged_by
        escalation.acknowledged_at = datetime.utcnow()

        return escalation

    def resolve_escalation(
        self,
        escalation_id: str,
        resolved_by: str,
        resolution_notes: str | None = None,
    ) -> EscalationRecord | None:

        escalation = self.get_escalation(escalation_id)

        if escalation is None:
            return None

        escalation.status = ESCALATION_STATUS_RESOLVED
        escalation.resolved_by = resolved_by
        escalation.resolved_at = datetime.utcnow()
        escalation.resolution_notes = resolution_notes

        return escalation


escalation_service = EscalationService()