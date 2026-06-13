# backend/app/models/workflow.py

"""
Workflow Domain Model
---------------------
Represents workflow state transitions
for laboratory requests.

Phase 19 Foundation
Workflow Runtime Preparation

Phase 30
Runtime Validation Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import (datetime, UTC,)
from typing import Optional

from backend.app.modules.workflow.constants import (
    RequestStatus,
)


@dataclass
class WorkflowTransition:
    """
    Represents a workflow state change
    for a laboratory request.
    """

    request_id: str

    from_status: RequestStatus

    to_status: RequestStatus

    performed_by: str

    transition_reason: Optional[str] = None

    transitioned_at: Optional[datetime] = None