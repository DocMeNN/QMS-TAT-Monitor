# backend/app/modules/data_entry_workspace/schemas.py

"""
Phase 30 - Data Entry Workspace
Response Schemas
"""

from datetime import (datetime, UTC,)
from typing import List, Optional

from pydantic import BaseModel, Field

from .constants import (
    WorkspaceRequestStatus,
    WorkspaceSLAStatus,
    WorkspaceTimelineEventType,
)


class DashboardSummaryResponse(BaseModel):
    """
    Workspace dashboard summary metrics.
    """

    user_id: str

    draft_requests: int = 0
    open_requests: int = 0
    in_progress_requests: int = 0
    completed_requests: int = 0


class WorkspaceRequestSummary(BaseModel):
    """
    Lightweight request representation
    displayed in workspace tables.
    """

    request_id: str

    status: WorkspaceRequestStatus

    workflow_stage: Optional[str] = None

    assigned_to: Optional[str] = None

    sla_status: WorkspaceSLAStatus = WorkspaceSLAStatus.UNKNOWN

    created_at: Optional[datetime] = None

    updated_at: Optional[datetime] = None


class WorkspaceRequestListResponse(BaseModel):
    """
    Paginated request listing.
    """

    total_records: int

    page: int

    page_size: int

    items: List[WorkspaceRequestSummary]


class ApprovalSnapshot(BaseModel):
    """
    Approval summary information.
    """

    approval_id: Optional[str] = None

    status: Optional[str] = None

    requested_by: Optional[str] = None

    requested_at: Optional[datetime] = None


class EscalationSnapshot(BaseModel):
    """
    Escalation summary information.
    """

    escalation_id: Optional[str] = None

    status: Optional[str] = None

    escalation_level: Optional[str] = None

    created_at: Optional[datetime] = None


class WorkflowSnapshot(BaseModel):
    """
    Workflow summary information.
    """

    workflow_id: Optional[str] = None

    current_stage: Optional[str] = None

    state: Optional[str] = None


class AssignmentSnapshot(BaseModel):
    """
    Assignment summary information.
    """

    assigned_to: Optional[str] = None

    assigned_at: Optional[datetime] = None


class SLASnapshot(BaseModel):
    """
    SLA summary information.
    """

    status: WorkspaceSLAStatus = WorkspaceSLAStatus.UNKNOWN

    target_due_date: Optional[datetime] = None

    remaining_minutes: Optional[int] = None


class WorkspaceRequestDetailsResponse(BaseModel):
    """
    Full operational request view.
    """

    request_id: str

    request_status: WorkspaceRequestStatus

    workflow: WorkflowSnapshot

    assignment: AssignmentSnapshot

    sla: SLASnapshot

    escalation: Optional[EscalationSnapshot] = None

    approval: Optional[ApprovalSnapshot] = None

    created_at: Optional[datetime] = None

    updated_at: Optional[datetime] = None


class TimelineEventResponse(BaseModel):
    """
    Single request lifecycle event.
    """

    event_id: str

    event_type: WorkspaceTimelineEventType

    title: str

    description: Optional[str] = None

    actor: Optional[str] = None

    timestamp: datetime


class TimelineResponse(BaseModel):
    """
    Request lifecycle timeline.
    """

    request_id: str

    events: List[TimelineEventResponse] = Field(default_factory=list)