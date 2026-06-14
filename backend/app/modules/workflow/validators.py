# backend/app/modules/workflow/validators.py

"""
Workflow Validators
-------------------
Workflow runtime governance validation.

Mountain 7
Wave 7D

Workflow Runtime State Verification

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Governance-ready
- Workflow-ready
- Audit-ready
"""

from backend.app.models.request import (
    Request,
)

from backend.app.modules.workflow.constants import (
    RequestStatus,
)


class WorkflowStateMismatchError(
    ValueError,
):
    """
    Raised when workflow payload state
    does not match actual request state.
    """


def validate_runtime_request_state(
    request: Request,
    expected_status: RequestStatus,
) -> None:
    """
    Ensures workflow transition begins
    from the actual runtime state.

    Governance Rule
    ---------------
    request.status
        ==
    payload.from_status
    """

    if (
        request.status
        != expected_status
    ):
        raise WorkflowStateMismatchError(
            (
                "Workflow state mismatch. "
                f"Request is currently "
                f"{request.status.value} "
                f"but transition expected "
                f"{expected_status.value}."
            )
        )