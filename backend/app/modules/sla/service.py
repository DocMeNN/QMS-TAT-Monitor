# backend/app/modules/sla/service.py

"""
SLA Service
-----------
Handles SLA lifecycle calculations,
breach detection, and compliance metrics.

Phase 21 Foundation
SLA Clock Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Alert-ready
- Reporting-ready
"""

from datetime import (
    datetime,
    timedelta,
)
from typing import (
    List,
    Optional,
)

from backend.app.models.sla import (
    SLARecord,
    SLAMetrics,
)

_sla_store: List[
    SLARecord
] = []


def create_sla(
    request_id: str,
    sla_hours: int,
) -> SLARecord:
    """
    Creates SLA tracking record.
    """

    started_at = (
        datetime.utcnow()
    )

    due_at = (
        started_at
        + timedelta(
            hours=sla_hours,
        )
    )

    sla = SLARecord(
        request_id=request_id,
        sla_hours=sla_hours,
        started_at=started_at,
        due_at=due_at,
    )

    _sla_store.append(
        sla
    )

    return sla


def get_slas() -> List[SLARecord]:
    """
    Returns all SLA records.
    """

    return _sla_store


def get_sla(
    request_id: str,
) -> Optional[SLARecord]:
    """
    Returns SLA record by request.
    """

    for sla in _sla_store:

        if (
            sla.request_id
            == request_id
        ):
            return sla

    return None


def complete_sla(
    request_id: str,
) -> Optional[SLARecord]:
    """
    Marks SLA as completed.
    """

    sla = get_sla(
        request_id
    )

    if sla is None:
        return None

    sla.completed_at = (
        datetime.utcnow()
    )

    if (
        sla.completed_at
        > sla.due_at
    ):
        sla.status = (
            "BREACHED"
        )
    else:
        sla.status = (
            "COMPLETED"
        )

    return sla


def update_sla_statuses() -> None:
    """
    Refreshes SLA statuses.
    """

    now = (
        datetime.utcnow()
    )

    for sla in _sla_store:

        if sla.status in [
            "COMPLETED",
            "BREACHED",
        ]:
            continue

        remaining = (
            sla.due_at
            - now
        ).total_seconds() / 3600

        if remaining <= 0:

            sla.status = (
                "BREACHED"
            )

        elif remaining <= 2:

            sla.status = (
                "AT_RISK"
            )

        else:

            sla.status = (
                "ACTIVE"
            )


def get_sla_metrics() -> SLAMetrics:
    """
    Generates SLA metrics.
    """

    update_sla_statuses()

    total = len(
        _sla_store
    )

    active = len(
        [
            item
            for item in _sla_store
            if item.status
            == "ACTIVE"
        ]
    )

    completed = len(
        [
            item
            for item in _sla_store
            if item.status
            == "COMPLETED"
        ]
    )

    breached = len(
        [
            item
            for item in _sla_store
            if item.status
            == "BREACHED"
        ]
    )

    at_risk = len(
        [
            item
            for item in _sla_store
            if item.status
            == "AT_RISK"
        ]
    )

    compliance = 100.0

    if total > 0:

        compliance = round(
            (
                (
                    total
                    - breached
                )
                / total
            )
            * 100,
            2,
        )

    return SLAMetrics(
        total_tracked=total,
        active=active,
        completed=completed,
        breached=breached,
        at_risk=at_risk,
        compliance_percentage=(
            compliance
        ),
    )