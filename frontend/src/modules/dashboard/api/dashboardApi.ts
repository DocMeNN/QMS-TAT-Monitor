// src/modules/dashboard/api/dashboardApi.ts

/**
 * Dashboard API layer
 * -------------------
 * Encapsulates dashboard HTTP calls
 */

import { DASHBOARD_ENDPOINT } from "../constants/api";

import type { DashboardAnalytics } from "../types/dashboard.types";

export async function fetchDashboardData(): Promise<DashboardAnalytics> {
  const response = await fetch(DASHBOARD_ENDPOINT);

  if (!response.ok) {
    throw new Error("Dashboard API request failed");
  }

  return response.json();
}