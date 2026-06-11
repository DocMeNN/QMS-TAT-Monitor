# backend/app/modules/queue/service.py

"""
Queue Service
-------------
Handles queue registration, retrieval,
and workload tracking.

Phase 17 Foundation
Queue Registration Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Modular architecture
- Workflow-ready
"""

from datetime import datetime
from typing import List, Optional

from backend.app.models.queue import (
    QueueItem,
)


_queue_store: List[QueueItem] = []


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
        if item.request_id == request_id:
            return item

    return None


def register_queue_item(
    request_id: str,
    priority: str,
    assigned_department: Optional[str] = None,
) -> QueueItem:
    """
    Registers a request in the queue.
    """

    queue_item = QueueItem(
        request_id=request_id,
        priority=priority,
        queue_position=len(_queue_store) + 1,
        status="QUEUED",
        queued_at=datetime.utcnow(),
        assigned_department=assigned_department,
        estimated_wait_hours=0.0,
    )

    _queue_store.append(queue_item)

    return queue_item


def get_queue_metrics() -> dict:
    """
    Returns queue summary metrics.
    """

    pending = len(
        [
            item
            for item in _queue_store
            if item.status == "QUEUED"
        ]
    )

    processing = len(
        [
            item
            for item in _queue_store
            if item.status == "PROCESSING"
        ]
    )

    completed = len(
        [
            item
            for item in _queue_store
            if item.status == "COMPLETED"
        ]
    )

    return {
        "pending": pending,
        "processing": processing,
        "completed": completed,
    }