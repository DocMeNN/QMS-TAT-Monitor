// src/modules/data-entry-workspace/hooks/useWorkspace.ts

import { useCallback, useState } from "react";

import { workspaceApi } from "../services/workspaceApi";

import type {
  DashboardSummary,
  TimelineResponse,
  WorkspaceRequestDetails,
  WorkspaceRequestListResponse,
} from "../types/workspace";

export const useWorkspace = () => {
  const [dashboard, setDashboard] =
    useState<DashboardSummary | null>(null);

  const [requests, setRequests] =
    useState<WorkspaceRequestListResponse | null>(
      null
    );

  const [selectedRequest, setSelectedRequest] =
    useState<WorkspaceRequestDetails | null>(
      null
    );

  const [timeline, setTimeline] =
    useState<TimelineResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await workspaceApi.getDashboard();

        setDashboard(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadRequests = useCallback(
    async (
      page = 1,
      pageSize = 25
    ) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await workspaceApi.getRequests(
            page,
            pageSize
          );

        setRequests(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadRequestDetails =
    useCallback(
      async (requestId: string) => {
        try {
          setLoading(true);
          setError(null);

          const data =
            await workspaceApi.getRequestDetails(
              requestId
            );

          setSelectedRequest(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unknown error"
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  const loadTimeline = useCallback(
    async (requestId: string) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await workspaceApi.getRequestTimeline(
            requestId
          );

        setTimeline(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
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
  };
};