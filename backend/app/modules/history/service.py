# backend/app/modules/history/service.py

"""
History Service
---------------
Phase 30 Wave 6B
History Timeline Engine

Aggregates historical activity from:

- workflow
- assignment
- escalation
- approval

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Audit-ready
- Validation-governed
"""

from __future__ import annotations

from typing import List

from backend.app.modules.approval.service import (
    approval_service,
)

from backend.app.modules.assignment.service import (
    get_assignment_history,
)

from backend.app.modules.escalation.service import (
    escalation_service,
)

from backend.app.modules.history.constants import (
    HISTORY_EVENT_APPROVAL,
    HISTORY_EVENT_ASSIGNMENT,
    HISTORY_EVENT_ESCALATION,
    HISTORY_EVENT_WORKFLOW,
)

from backend.app.modules.history.schemas import (
    HistoryEventResponse,
    HistoryResponse,
)

from backend.app.modules.requests.validators import (
    validate_request_id,
)

from backend.app.modules.workflow.service import (
    get_request_workflow_history,
)


class HistoryService:
    """
    Aggregates historical records into
    a unified timeline.
    """

    def get_request_history(
        self,
        request_id: str,
    ) -> HistoryResponse:
        """
        Returns chronological request history.
        """

        validate_request_id(
            request_id
        )

        events: List[
            HistoryEventResponse
        ] = []

        events.extend(
            self._build_workflow_events(
                request_id
            )
        )

        events.extend(
            self._build_assignment_events(
                request_id
            )
        )

        events.extend(
            self._build_escalation_events(
                request_id
            )
        )

        events.extend(
            self._build_approval_events(
                request_id
            )
        )

        events.sort(
            key=lambda event: (
                event.timestamp
            )
        )

        return HistoryResponse(
            request_id=request_id,
            events=events,
        )

    def _build_workflow_events(
        self,
        request_id: str,
    ) -> List[
        HistoryEventResponse
    ]:
        """
        Build workflow history events.
        """

        events: List[
            HistoryEventResponse
        ] = []

        history = (
            get_request_workflow_history(
                request_id
            )
        )

        for item in history:

            if (
                item.transitioned_at
                is None
            ):
                continue

            events.append(
                HistoryEventResponse(
                    event_type=(
                        HISTORY_EVENT_WORKFLOW
                    ),
                    title=(
                        f"{item.from_status.value}"
                        f" → "
                        f"{item.to_status.value}"
                    ),
                    actor=item.performed_by,
                    description=(
                        item.transition_reason
                    ),
                    timestamp=(
                        item.transitioned_at
                    ),
                )
            )

        return events

    def _build_assignment_events(
        self,
        request_id: str,
    ) -> List[
        HistoryEventResponse
    ]:
        """
        Build assignment history events.
        """

        events: List[
            HistoryEventResponse
        ] = []

        history = (
            get_assignment_history(
                request_id
            )
        )

        for item in history:

            if (
                item.performed_at
                is None
            ):
                continue

            events.append(
                HistoryEventResponse(
                    event_type=(
                        HISTORY_EVENT_ASSIGNMENT
                    ),
                    title=item.action,
                    actor=item.performed_by,
                    description=(
                        f"Assigned to "
                        f"{item.new_assignee}"
                    ),
                    timestamp=(
                        item.performed_at
                    ),
                )
            )

        return events

    def _build_escalation_events(
        self,
        request_id: str,
    ) -> List[
        HistoryEventResponse
    ]:
        """
        Build escalation history events.
        """

        events: List[
            HistoryEventResponse
        ] = []

        escalations = [
            escalation
            for escalation
            in escalation_service.list_escalations()
            if escalation.request_id
            == request_id
        ]

        for escalation in escalations:

            events.append(
                HistoryEventResponse(
                    event_type=(
                        HISTORY_EVENT_ESCALATION
                    ),
                    title=(
                        "Escalation Created"
                    ),
                    actor=(
                        escalation.created_by
                    ),
                    description=(
                        escalation.reason
                    ),
                    timestamp=(
                        escalation.created_at
                    ),
                )
            )

        return events

    def _build_approval_events(
        self,
        request_id: str,
    ) -> List[
        HistoryEventResponse
    ]:
        """
        Build approval history events.
        """

        events: List[
            HistoryEventResponse
        ] = []

        approvals = [
            approval
            for approval
            in approval_service.list_approvals()
            if approval.request_id
            == request_id
        ]

        for approval in approvals:

            events.append(
                HistoryEventResponse(
                    event_type=(
                        HISTORY_EVENT_APPROVAL
                    ),
                    title=(
                        approval.status
                    ),
                    actor=(
                        approval.requested_by
                    ),
                    description=(
                        approval.comments
                    ),
                    timestamp=(
                        approval.created_at
                    ),
                )
            )

        return events


history_service = HistoryService()