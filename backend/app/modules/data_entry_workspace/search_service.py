# backend/app/modules/data_entry_workspace/search_service.py

"""
Phase 30 - Data Entry Workspace
Search Service

Provides request searching,
filtering, sorting and pagination.

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Workspace-ready
- Request-ready
"""

from __future__ import annotations

from typing import List

from backend.app.modules.requests.service import (
    get_requests,
)

from .constants import (
    WorkspaceRequestStatus,
    WorkspaceSLAStatus,
)
from .search_schemas import (
    SearchRequest,
    SearchResponse,
    SearchResultItem,
)


class WorkspaceSearchService:
    """
    Workspace search engine.
    """

    def search_requests(
        self,
        request: SearchRequest,
    ) -> SearchResponse:
        """
        Execute workspace search.
        """

        results = self._build_results()

        results = self._apply_filters(
            results=results,
            request=request,
        )

        results = self._sort_results(
            results=results,
            request=request,
        )

        total_records = len(results)

        results = self._paginate_results(
            results=results,
            request=request,
        )

        return SearchResponse(
            total_records=total_records,
            page=request.page,
            page_size=request.page_size,
            items=results,
        )

    def _build_results(
        self,
    ) -> List[SearchResultItem]:
        """
        Build search dataset.
        """

        results: List[
            SearchResultItem
        ] = []

        for item in get_requests():

            results.append(
                SearchResultItem(
                    request_id=item.request_id,
                    title=item.title,
                    status=WorkspaceRequestStatus.OPEN,
                    workflow_stage=None,
                    assigned_to=item.assigned_to,
                    sla_status=(
                        WorkspaceSLAStatus.UNKNOWN
                    ),
                    created_at=item.created_at,
                    updated_at=item.updated_at,
                )
            )

        return results

    def _apply_filters(
        self,
        results: List[
            SearchResultItem
        ],
        request: SearchRequest,
    ) -> List[SearchResultItem]:
        """
        Apply filters.
        """

        filters = request.filters

        filtered = results

        if filters.request_id:

            filtered = [
                item
                for item in filtered
                if filters.request_id.lower()
                in item.request_id.lower()
            ]

        if filters.title:

            filtered = [
                item
                for item in filtered
                if filters.title.lower()
                in item.title.lower()
            ]

        if filters.assigned_to:

            filtered = [
                item
                for item in filtered
                if item.assigned_to
                and filters.assigned_to.lower()
                in item.assigned_to.lower()
            ]

        return filtered

    def _sort_results(
        self,
        results: List[
            SearchResultItem
        ],
        request: SearchRequest,
    ) -> List[SearchResultItem]:
        """
        Sort results.
        """

        reverse = (
            request.sort_direction.lower()
            == "desc"
        )

        if request.sort_by == "title":

            return sorted(
                results,
                key=lambda x: x.title,
                reverse=reverse,
            )

        return sorted(
            results,
            key=lambda x: (
                x.created_at is None,
                x.created_at,
            ),
            reverse=reverse,
        )

    def _paginate_results(
        self,
        results: List[
            SearchResultItem
        ],
        request: SearchRequest,
    ) -> List[SearchResultItem]:
        """
        Apply pagination.
        """

        start = (
            request.page - 1
        ) * request.page_size

        end = (
            start
            + request.page_size
        )

        return results[start:end]


search_service = (
    WorkspaceSearchService()
)