# backend/app/models/workflow.py

"""
Workflow Domain Model
---------------------
Represents workflow state transitions
for laboratory requests.

Phase 19 Foundation
Workflow Runtime Preparation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class WorkflowTransition:
    """
    Represents a workflow state change
    for a laboratory request.
    """

    request_id: str

    from_status: str
    to_status: str

    performed_by: str

    transition_reason: Optional[str] = None

    transitioned_at: Optional[datetime] = None