// src/modules/dashboard/services/dashboardService.ts

/**
 * Dashboard service
 * -----------------
 * Handles dashboard API calls
 */

import http from "../../../core/config/services/http";

import type {
  DashboardAnalytics,
} from "../types/dashboard.types";

export async function fetchDashboardMetrics(): Promise<DashboardAnalytics> {
  const response =
    await http.get(
      "/dashboard/metrics"
    );

  return response.data;
}