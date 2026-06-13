# backend/app/modules/data_entry_workspace/service.py

"""
Phase 30 - Data Entry Workspace
Aggregation Service

This module provides a unified operational view by
aggregating data from existing platform modules.

The service intentionally owns no domain entities.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import (datetime, UTC,)
from typing import List, Optional
from uuid import uuid4

from backend.app.modules.approval.service import (
    approval_service,
)
from backend.app.modules.assignment.service import (
    get_assignment,
)
from backend.app.modules.escalation.service import (
    escalation_service,
)
from backend.app.modules.history.service import (
    history_service,
)
from backend.app.modules.requests.service import (
    get_request_by_id,
    get_requests,
)
from backend.app.modules.sla.service import (
    get_sla,
)
from backend.app.modules.workflow.service import (
    get_request_workflow_history,
)

from .constants import (
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    WorkspaceRequestStatus,
    WorkspaceSLAStatus,
    WorkspaceTimelineEventType,
)
from .schemas import (
    ApprovalSnapshot,
    AssignmentSnapshot,
    DashboardSummaryResponse,
    EscalationSnapshot,
    SLASnapshot,
    TimelineEventResponse,
    TimelineResponse,
    WorkflowSnapshot,
    WorkspaceRequestDetailsResponse,
    WorkspaceRequestListResponse,
    WorkspaceRequestSummary,
)


@dataclass(slots=True)
class WorkspaceSecurityContext:
    """
    Security context propagated into all
    workspace operations.

    Future population source:

    - auth
    - users
    - rbac
    - workspaces
    - policies
    """

    user_id: str

    role_names: List[str] = field(default_factory=list)

    workspace_ids: List[str] = field(default_factory=list)

    permissions: List[str] = field(default_factory=list)


class DataEntryWorkspaceService:
    """
    Workspace aggregation service.

    Future implementations should integrate with:

    - requests
    - workflow
    - assignment
    - sla
    - escalation
    - approval
    - history

    modules through dependency injection or
    application service orchestration.
    """

    def get_dashboard(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> DashboardSummaryResponse:
        """
        Return workspace dashboard metrics.
        """

        self._validate_workspace_access(
            security_context
        )

        requests = get_requests()

        draft_requests = len(
            [
                r
                for r in requests
                if str(r.status).upper()
                in ["DRAFT"]
            ]
        )

        open_requests = len(
            [
                r
                for r in requests
                if str(r.status).upper()
                not in [
                    "COMPLETED",
                    "CLOSED",
                ]
            ]
        )

        in_progress_requests = len(
            [
                r
                for r in requests
                if str(r.status).upper()
                in [
                    "ASSIGNED",
                    "IN_PROGRESS",
                    "PENDING_REVIEW",
                    "ESCALATED",
                ]
            ]
        )

        completed_requests = len(
            [
                r
                for r in requests
                if str(r.status).upper()
                in [
                    "COMPLETED",
                    "CLOSED",
                ]
            ]
        )

        return DashboardSummaryResponse(
            user_id=security_context.user_id,
            draft_requests=draft_requests,
            open_requests=open_requests,
            in_progress_requests=in_progress_requests,
            completed_requests=completed_requests,
        )

    def get_my_requests(
        self,
        security_context: WorkspaceSecurityContext,
        page: int = DEFAULT_PAGE_NUMBER,
        page_size: int = DEFAULT_PAGE_SIZE,
    ) -> WorkspaceRequestListResponse:
        """
        Return workspace request listing.
        """

        self._validate_workspace_access(
            security_context
        )

        request_records = get_requests()

        items: List[
            WorkspaceRequestSummary
        ] = []

        for request in request_records:

            workflow_history = (
                get_request_workflow_history(
                    request.request_id
                )
            )

            workflow_stage = None

            if workflow_history:
                workflow_stage = (
                    workflow_history[-1]
                    .to_status
                )

            sla_snapshot = (
                self._build_sla_snapshot(
                    request.request_id
                )
            )

            items.append(
                WorkspaceRequestSummary(
                    request_id=request.request_id,
                    status=self._map_request_status(
                        request.status
                    ),
                    workflow_stage=workflow_stage,
                    assigned_to=request.assigned_to,
                    sla_status=sla_snapshot.status,
                    created_at=request.created_at,
                    updated_at=request.updated_at,
                )
            )

        start = (
            page - 1
        ) * page_size

        end = start + page_size

        paginated_items = items[
            start:end
        ]

        return WorkspaceRequestListResponse(
            total_records=len(items),
            page=page,
            page_size=page_size,
            items=paginated_items,
        )

    def get_request_details(
        self,
        request_id: str,
        security_context: WorkspaceSecurityContext,
    ) -> WorkspaceRequestDetailsResponse:
        """
        Return consolidated operational view.
        """

        self._validate_workspace_access(
            security_context
        )

        self._validate_request_access(
            request_id=request_id,
            security_context=security_context,
        )

        request = get_request_by_id(
            request_id
        )

        if request is None:
            raise ValueError(
                f"Request not found: {request_id}"
            )

        return WorkspaceRequestDetailsResponse(
            request_id=request.request_id,
            request_status=self._map_request_status(
                request.status
            ),
            workflow=self._build_workflow_snapshot(
                request_id
            ),
            assignment=self._build_assignment_snapshot(
                request_id
            ),
            sla=self._build_sla_snapshot(
                request_id
            ),
            escalation=self._build_escalation_snapshot(
                request_id
            ),
            approval=self._build_approval_snapshot(
                request_id
            ),
            created_at=request.created_at,
            updated_at=request.updated_at,
        )

    def get_request_timeline(
        self,
        request_id: str,
        security_context: WorkspaceSecurityContext,
    ) -> TimelineResponse:
        """
        Return request lifecycle timeline
        using the centralized History Engine.
        """

        self._validate_workspace_access(
            security_context
        )

        self._validate_request_access(
            request_id=request_id,
            security_context=security_context,
        )

        history = (
            history_service.get_request_history(
                request_id=request_id
            )
        )

        events: List[
            TimelineEventResponse
        ] = []

        for event in history.events:

            events.append(
                TimelineEventResponse(
                    event_id=str(uuid4()),
                    event_type=self._map_history_event_type(
                        event.event_type
                    ),
                    title=event.title,
                    description=event.description,
                    actor=event.actor,
                    timestamp=event.timestamp,
                )
            )

        return TimelineResponse(
            request_id=request_id,
            events=events,
        )

    def _validate_workspace_access(
        self,
        security_context: WorkspaceSecurityContext,
    ) -> None:
        """
        Validate workspace-level access.
        """

        if not security_context.user_id:
            raise PermissionError(
                "Authenticated user required."
            )

    def _validate_request_access(
        self,
        request_id: str,
        security_context: WorkspaceSecurityContext,
    ) -> None:
        """
        Future request-level authorization.
        """

        _ = request_id

        if not security_context.user_id:
            raise PermissionError(
                "Access denied."
            )

    def _validate_permission(
        self,
        permission_name: str,
        security_context: WorkspaceSecurityContext,
    ) -> bool:
        """
        Validate permission membership.
        """

        return (
            permission_name
            in security_context.permissions
        )

    def _evaluate_policy(
        self,
        policy_name: str,
        security_context: WorkspaceSecurityContext,
    ) -> bool:
        """
        Future policy integration.
        """

        _ = policy_name
        _ = security_context

        return True

    def _map_request_status(
        self,
        status: str,
    ) -> WorkspaceRequestStatus:
        """
        Normalizes request status.
        """

        status = str(status).upper()

        if status in [
            "COMPLETED",
            "CLOSED",
        ]:
            return (
                WorkspaceRequestStatus.COMPLETED
            )

        if status in [
            "IN_PROGRESS",
            "ASSIGNED",
            "PENDING_REVIEW",
            "ESCALATED",
        ]:
            return (
                WorkspaceRequestStatus.IN_PROGRESS
            )

        return (
            WorkspaceRequestStatus.OPEN
        )

    def _map_sla_status(
        self,
        status: str,
    ) -> WorkspaceSLAStatus:
        """
        Normalizes SLA status.
        """

        status = str(status).upper()

        if status == "ACTIVE":
            return WorkspaceSLAStatus.ACTIVE

        if status == "AT_RISK":
            return WorkspaceSLAStatus.AT_RISK

        if status == "BREACHED":
            return WorkspaceSLAStatus.BREACHED

        return WorkspaceSLAStatus.UNKNOWN

    def _map_history_event_type(
        self,
        history_event_type: str,
    ) -> WorkspaceTimelineEventType:
        """
        Maps history event types into
        workspace timeline event types.
        """

        history_event_type = (
            str(history_event_type)
            .upper()
            .strip()
        )

        mapping = {
            "WORKFLOW":
                WorkspaceTimelineEventType.WORKFLOW,
            "ASSIGNMENT":
                WorkspaceTimelineEventType.ASSIGNMENT,
            "ESCALATION":
                WorkspaceTimelineEventType.ESCALATION,
            "APPROVAL":
                WorkspaceTimelineEventType.APPROVAL,
        }

        return mapping.get(
            history_event_type,
            WorkspaceTimelineEventType.WORKFLOW,
        )

    def _build_workflow_snapshot(
        self,
        request_id: str,
    ) -> WorkflowSnapshot:
        """
        Build workflow summary.
        """

        history = (
            get_request_workflow_history(
                request_id
            )
        )

        if not history:
            return WorkflowSnapshot(
                workflow_id=None,
                current_stage=None,
                state=None,
            )

        latest = history[-1]

        return WorkflowSnapshot(
            workflow_id=request_id,
            current_stage=latest.to_status,
            state=latest.to_status,
        )

    def _build_assignment_snapshot(
        self,
        request_id: str,
    ) -> AssignmentSnapshot:
        """
        Build assignment summary.
        """

        assignment = get_assignment(
            request_id
        )

        if assignment is None:
            return AssignmentSnapshot(
                assigned_to=None,
                assigned_at=None,
            )

        return AssignmentSnapshot(
            assigned_to=assignment.assignee_id,
            assigned_at=assignment.assigned_at,
        )

    def _build_sla_snapshot(
        self,
        request_id: str,
    ) -> SLASnapshot:
        """
        Build SLA summary.
        """

        sla = get_sla(
            request_id
        )

        if sla is None:
            return SLASnapshot(
                status=WorkspaceSLAStatus.UNKNOWN,
                target_due_date=None,
                remaining_minutes=None,
            )

        remaining_minutes = int(
            (
                sla.due_at
                - datetime.now(UTC)
            ).total_seconds()
            / 60
        )

        return SLASnapshot(
            status=self._map_sla_status(
                sla.status
            ),
            target_due_date=sla.due_at,
            remaining_minutes=remaining_minutes,
        )

    def _build_escalation_snapshot(
        self,
        request_id: str,
    ) -> Optional[EscalationSnapshot]:
        """
        Build escalation summary.
        """

        escalations = [
            escalation
            for escalation
            in escalation_service.list_escalations()
            if escalation.request_id
            == request_id
        ]

        if not escalations:
            return None

        latest = max(
            escalations,
            key=lambda x: x.created_at,
        )

        return EscalationSnapshot(
            escalation_id=latest.escalation_id,
            status=latest.status,
            escalation_level=(
                latest.escalation_level
            ),
            created_at=latest.created_at,
        )

    def _build_approval_snapshot(
        self,
        request_id: str,
    ) -> Optional[ApprovalSnapshot]:
        """
        Build approval summary.
        """

        approvals = [
            approval
            for approval
            in approval_service.list_approvals()
            if approval.request_id
            == request_id
        ]

        if not approvals:
            return None

        latest = max(
            approvals,
            key=lambda x: x.created_at,
        )

        return ApprovalSnapshot(
            approval_id=latest.approval_id,
            status=latest.status,
            requested_by=(
                latest.requested_by
            ),
            requested_at=(
                latest.created_at
            ),
        )

    def create_timeline_event(
        self,
        event_id: str,
        title: str,
        event_type: WorkspaceTimelineEventType,
        actor: Optional[str] = None,
        description: Optional[str] = None,
    ) -> TimelineEventResponse:
        """
        Helper for future timeline generation.
        """

        return TimelineEventResponse(
            event_id=event_id,
            event_type=event_type,
            title=title,
            description=description,
            actor=actor,
            timestamp=datetime.now(UTC),
        )


workspace_service = DataEntryWorkspaceService()