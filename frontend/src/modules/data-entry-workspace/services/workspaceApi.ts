// src/modules/data-entry-workspace/services/workspaceApi.ts

import type {
  DashboardSummary,
  TimelineResponse,
  WorkspaceRequestDetails,
  WorkspaceRequestListResponse,
} from "../types/workspace";

const API_BASE = "/api/workspace/data-entry";

export class WorkspaceApi {
  async getDashboard(): Promise<DashboardSummary> {
    const response = await fetch(
      `${API_BASE}/dashboard`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load dashboard summary"
      );
    }

    return response.json();
  }

  async getRequests(
    page = 1,
    pageSize = 25
  ): Promise<WorkspaceRequestListResponse> {
    const response = await fetch(
      `${API_BASE}/requests?page=${page}&page_size=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load requests"
      );
    }

    return response.json();
  }

  async getRequestDetails(
    requestId: string
  ): Promise<WorkspaceRequestDetails> {
    const response = await fetch(
      `${API_BASE}/requests/${requestId}`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load request details"
      );
    }

    return response.json();
  }

  async getRequestTimeline(
    requestId: string
  ): Promise<TimelineResponse> {
    const response = await fetch(
      `${API_BASE}/requests/${requestId}/timeline`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load request timeline"
      );
    }

    return response.json();
  }
}

export const workspaceApi =
  new WorkspaceApi();