# backend/app/schemas/workflow.py

"""
Workflow API Schemas
--------------------
Workflow transition contracts used by the
workflow processing engine.

Phase 19 Foundation
Workflow Runtime Preparation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- Audit-ready
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class WorkflowTransitionCreate(BaseModel):
    request_id: str
    from_status: str
    to_status: str
    performed_by: str
    transition_reason: Optional[str] = None


class WorkflowTransitionResponse(BaseModel):
    request_id: str

    from_status: str
    to_status: str

    performed_by: str

    transition_reason: Optional[str] = None

    transitioned_at: Optional[datetime] = None