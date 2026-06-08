// src/modules/data-entry-workspace/pages/DataEntryWorkspacePage.tsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useWorkspace,
} from "../hooks/useWorkspace";

import WorkspaceHeader from "../components/WorkspaceHeader";

import RequestSummaryCards from "../components/RequestSummaryCards";

import RequestSearchPanel, {
  RequestSearchFilters,
} from "../components/RequestSearchPanel";

import MyRequestsTable from "../components/MyRequestsTable";

import RequestDetailsPanel from "../components/RequestDetailsPanel";

import RequestTimelineDrawer from "../components/RequestTimelineDrawer";

export const DataEntryWorkspacePage: React.FC =
  () => {
    const {
      dashboard,
      requests,
      selectedRequest,
      timeline,

      loading,
      error,

      loadDashboard,
      loadRequests,
      loadRequestDetails,
      loadTimeline,
    } = useWorkspace();

    const [
      activeFilters,
      setActiveFilters,
    ] =
      useState<RequestSearchFilters>(
        {}
      );

    useEffect(() => {
      void loadDashboard();

      void loadRequests();
    }, [
      loadDashboard,
      loadRequests,
    ]);

    const handleSearch = (
      filters: RequestSearchFilters
    ) => {
      setActiveFilters(filters);

      /**
       * Search integration will be
       * connected during Smart Form /
       * Advanced Search phases.
       */

      void loadRequests();
    };

    const handleRequestSelect =
      async (
        requestId: string
      ) => {
        await loadRequestDetails(
          requestId
        );

        await loadTimeline(
          requestId
        );
      };

    return (
      <div
        className="data-entry-workspace-page"
      >
        <WorkspaceHeader />

        <RequestSummaryCards
          summary={dashboard}
        />

        <RequestSearchPanel
          onSearch={handleSearch}
        />

        {loading && (
          <p>
            Loading workspace...
          </p>
        )}

        {error && (
          <p>
            Workspace Error: {error}
          </p>
        )}

        <MyRequestsTable
          requests={
            requests?.items ?? []
          }
          onSelectRequest={
            handleRequestSelect
          }
        />

        <RequestDetailsPanel
          request={selectedRequest}
        />

        <RequestTimelineDrawer
          timeline={timeline}
        />
      </div>
    );
  };

export default DataEntryWorkspacePage;