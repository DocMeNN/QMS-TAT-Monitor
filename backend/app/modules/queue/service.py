# backend/app/modules/queue/service.py

"""
Queue Service
-------------
Queue registration and workload tracking.

Phase 17 Foundation
Queue Registration Engine

Phase 30
Runtime Governance Hardening

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
- SLA-ready
- Audit-ready
"""

from datetime import (
    datetime,
    UTC,
)

from typing import (
    List,
    Optional,
)

from backend.app.models.queue import (
    QueueItem,
)

from backend.app.modules.requests.service import (
    get_request_by_id,
)

_queue_store: List[
    QueueItem
] = []


def get_queue_items() -> List[QueueItem]:
    """
    Returns all queue items.
    """

    return _queue_store


def get_queue_item_by_request_id(
    request_id: str,
) -> Optional[QueueItem]:
    """
    Returns queue item by request ID.
    """

    for item in _queue_store:

        if (
            item.request_id
            == request_id
        ):
            return item

    return None


def queue_item_exists(
    request_id: str,
) -> bool:
    """
    Returns True when queue item exists.
    """

    return (
        get_queue_item_by_request_id(
            request_id
        )
        is not None
    )


def register_queue_item(
    request_id: str,
    priority: str,
    assigned_department: Optional[str] = None,
) -> QueueItem:
    """
    Registers request into queue.
    """

    request = get_request_by_id(
        request_id
    )

    if request is None:
        raise ValueError(
            "Request not found"
        )

    if queue_item_exists(
        request_id
    ):
        raise ValueError(
            "Queue item already exists"
        )

    queue_item = QueueItem(
        request_id=request_id,
        priority=priority,
        queue_position=(
            len(_queue_store) + 1
        ),
        status="QUEUED",
        queued_at=datetime.now(
            UTC
        ),
        assigned_department=(
            assigned_department
        ),
        estimated_wait_hours=0.0,
    )

    _queue_store.append(
        queue_item
    )

    return queue_item


def get_queue_metrics() -> dict:
    """
    Returns queue summary metrics.
    """

    queued_items = len(
        _queue_store
    )

    departments = len(
        {
            item.assigned_department
            for item in _queue_store
            if item.assigned_department
        }
    )

    return {
        "total_items": queued_items,
        "active_departments": departments,
        "next_position": (
            queued_items + 1
        ),
    }