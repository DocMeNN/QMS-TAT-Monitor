# backend/app/modules/sla/routes.py

"""
SLA Routes
----------
SLA monitoring endpoints.

Phase 21 Foundation
SLA Clock Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
"""

from fastapi import APIRouter, HTTPException

from app.schemas.sla import (
    SLACreate,
    SLAResponse,
    SLAMetricsResponse,
)

from app.modules.sla.service import (
    create_sla,
    get_slas,
    get_sla,
    complete_sla,
    get_sla_metrics,
)

router = APIRouter(
    prefix="/sla",
    tags=["SLA"],
)


@router.get(
    "/",
    response_model=list[SLAResponse],
)
def list_slas():
    """
    Returns all SLA records.
    """

    return get_slas()


@router.get(
    "/metrics",
    response_model=SLAMetricsResponse,
)
def sla_metrics():
    """
    Returns SLA metrics.
    """

    return get_sla_metrics()


@router.get(
    "/{request_id}",
    response_model=SLAResponse,
)
def get_request_sla(
    request_id: str,
):
    """
    Returns SLA by request.
    """

    sla = get_sla(request_id)

    if sla is None:
        raise HTTPException(
            status_code=404,
            detail="SLA not found",
        )

    return sla


@router.post(
    "/",
    response_model=SLAResponse,
)
def create_request_sla(
    payload: SLACreate,
):
    """
    Creates SLA record.
    """

    return create_sla(
        request_id=payload.request_id,
        sla_hours=payload.sla_hours,
    )


@router.post(
    "/complete/{request_id}",
    response_model=SLAResponse,
)
def complete_request_sla(
    request_id: str,
):
    """
    Completes SLA tracking.
    """

    sla = complete_sla(
        request_id=request_id,
    )

    if sla is None:
        raise HTTPException(
            status_code=404,
            detail="SLA not found",
        )

    return sla