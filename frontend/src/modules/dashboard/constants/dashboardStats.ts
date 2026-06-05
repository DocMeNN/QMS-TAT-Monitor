// src/modules/dashboard/constants/dashboardStats.ts

/**
 * Dashboard stat definitions
 * --------------------------
 * Typed metric configuration
 */

import type { DashboardMetrics } from "../types/dashboard.types";

export interface DashboardStat {
  title: string;
  metricKey: keyof DashboardMetrics;
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Requests",
    metricKey: "total_requests",
  },
  {
    title: "Avg TAT (hrs)",
    metricKey: "avg_tat_hours",
  },
  {
    title: "Completed",
    metricKey: "completed",
  },
  {
    title: "Breached SLA",
    metricKey: "breached_sla",
  },
];