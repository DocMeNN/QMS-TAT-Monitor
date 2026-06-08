# backend/app/modules/escalation/routes.py

"""
Escalation Routes
-----------------
API endpoints for escalation workflows.

Phase 23
Escalation Workflow Engine
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.escalation.schemas import (
    AcknowledgeEscalationRequest,
    CreateEscalationRequest,
    ResolveEscalationRequest,
)
from backend.app.modules.escalation.service import escalation_service

router = APIRouter(
    prefix="/escalations",
    tags=["Escalations"],
)


@router.post("/")
def create_escalation(
    payload: CreateEscalationRequest,
):

    return escalation_service.create_escalation(
        request_id=payload.request_id,
        workflow_id=payload.workflow_id,
        trigger_type=payload.trigger_type,
        escalation_level=payload.escalation_level,
        reason=payload.reason,
        created_by=payload.created_by,
    )


@router.get("/")
def list_escalations():

    return escalation_service.list_escalations()


@router.get("/{escalation_id}")
def get_escalation(
    escalation_id: str,
):

    escalation = escalation_service.get_escalation(escalation_id)

    if escalation is None:
        raise HTTPException(
            status_code=404,
            detail="Escalation not found",
        )

    return escalation


@router.post("/{escalation_id}/acknowledge")
def acknowledge_escalation(
    escalation_id: str,
    payload: AcknowledgeEscalationRequest,
):

    escalation = escalation_service.acknowledge_escalation(
        escalation_id,
        payload.acknowledged_by,
    )

    if escalation is None:
        raise HTTPException(
            status_code=404,
            detail="Escalation not found",
        )

    return escalation


@router.post("/{escalation_id}/resolve")
def resolve_escalation(
    escalation_id: str,
    payload: ResolveEscalationRequest,
):

    escalation = escalation_service.resolve_escalation(
        escalation_id,
        payload.resolved_by,
        payload.resolution_notes,
    )

    if escalation is None:
        raise HTTPException(
            status_code=404,
            detail="Escalation not found",
        )

    return escalation