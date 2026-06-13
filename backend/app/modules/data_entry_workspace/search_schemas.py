# backend/app/modules/data_entry_workspace/search_schemas.py

"""
Phase 30 - Data Entry Workspace
Search Schemas

Provides request search, filtering,
sorting, and pagination DTOs.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Search-ready
- Filtering-ready
- Workspace-ready
"""

from datetime import (datetime, UTC,)
from typing import List, Optional

from pydantic import BaseModel, Field

from .constants import (
    WorkspaceRequestStatus,
    WorkspaceSLAStatus,
)


class SearchFilter(BaseModel):
    """
    Search filter definition.
    """

    request_id: Optional[str] = None

    title: Optional[str] = None

    status: Optional[
        WorkspaceRequestStatus
    ] = None

    assigned_to: Optional[str] = None

    workflow_stage: Optional[str] = None

    sla_status: Optional[
        WorkspaceSLAStatus
    ] = None

    created_from: Optional[
        datetime
    ] = None

    created_to: Optional[
        datetime
    ] = None


class SearchRequest(BaseModel):
    """
    Search request payload.
    """

    page: int = 1

    page_size: int = 25

    sort_by: str = "created_at"

    sort_direction: str = "desc"

    filters: SearchFilter = Field(
        default_factory=SearchFilter
    )


class SearchResultItem(BaseModel):
    """
    Search result row.
    """

    request_id: str

    title: str

    status: WorkspaceRequestStatus

    workflow_stage: Optional[str] = None

    assigned_to: Optional[str] = None

    sla_status: WorkspaceSLAStatus

    created_at: Optional[
        datetime
    ] = None

    updated_at: Optional[
        datetime
    ] = None


class SearchResponse(BaseModel):
    """
    Paginated search results.
    """

    total_records: int

    page: int

    page_size: int

    items: List[
        SearchResultItem
    ] = Field(
        default_factory=list
    )