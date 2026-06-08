# backend/app/modules/approval/routes.py

"""
Approval Routes
---------------
API endpoints for approval workflows.

Phase 24
Approval Workflow Layer
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.approval.schemas import (
    ApproveRequest,
    CreateApprovalRequest,
    RejectRequest,
    ReturnRequest,
)
from backend.app.modules.approval.service import approval_service

router = APIRouter(
    prefix="/approvals",
    tags=["Approvals"],
)


@router.post("/")
def create_approval(
    payload: CreateApprovalRequest,
):

    return approval_service.create_approval(
        request_id=payload.request_id,
        workflow_id=payload.workflow_id,
        approval_type=payload.approval_type,
        approval_level=payload.approval_level,
        requested_by=payload.requested_by,
        assigned_to=payload.assigned_to,
        comments=payload.comments,
    )


@router.get("/")
def list_approvals():

    return approval_service.list_approvals()


@router.get("/{approval_id}")
def get_approval(
    approval_id: str,
):

    approval = approval_service.get_approval(approval_id)

    if approval is None:
        raise HTTPException(
            status_code=404,
            detail="Approval not found",
        )

    return approval


@router.post("/{approval_id}/approve")
def approve(
    approval_id: str,
    payload: ApproveRequest,
):

    approval = approval_service.approve(
        approval_id=approval_id,
        reviewed_by=payload.reviewed_by,
        comments=payload.comments,
    )

    if approval is None:
        raise HTTPException(
            status_code=404,
            detail="Approval not found",
        )

    return approval


@router.post("/{approval_id}/reject")
def reject(
    approval_id: str,
    payload: RejectRequest,
):

    approval = approval_service.reject(
        approval_id=approval_id,
        reviewed_by=payload.reviewed_by,
        comments=payload.comments,
    )

    if approval is None:
        raise HTTPException(
            status_code=404,
            detail="Approval not found",
        )

    return approval


@router.post("/{approval_id}/return")
def return_for_rework(
    approval_id: str,
    payload: ReturnRequest,
):

    approval = approval_service.return_for_rework(
        approval_id=approval_id,
        reviewed_by=payload.reviewed_by,
        comments=payload.comments,
    )

    if approval is None:
        raise HTTPException(
            status_code=404,
            detail="Approval not found",
        )

    return approval