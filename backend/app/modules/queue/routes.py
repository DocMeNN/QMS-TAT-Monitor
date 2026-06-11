# backend/app/modules/queue/routes.py

"""
Queue Routes
------------
Queue registration and workload endpoints.

Phase 17 Foundation
Queue Registration Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workflow-ready
"""

from fastapi import APIRouter

from backend.app.modules.queue.schemas import (
    QueueItemCreate,
    QueueItemResponse,
)

from backend.app.modules.queue.service import (
    get_queue_items,
    register_queue_item,
    get_queue_metrics,
)

router = APIRouter(
    prefix="/queue",
    tags=["Queue"],
)


@router.get("/")
def queue_metrics():
    """
    Returns queue summary metrics.
    """

    return get_queue_metrics()


@router.get(
    "/items",
    response_model=list[QueueItemResponse],
)
def list_queue_items():
    """
    Returns all queue items.
    """

    return get_queue_items()


@router.post(
    "/register",
    response_model=QueueItemResponse,
)
def register_item(
    payload: QueueItemCreate,
):
    """
    Registers a request into the queue.
    """

    return register_queue_item(
        request_id=payload.request_id,
        priority=payload.priority,
        assigned_department=payload.assigned_department,
    )