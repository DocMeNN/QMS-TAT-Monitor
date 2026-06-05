// src/modules/dashboard/hooks/useDashboard.ts

import { useEffect, useState } from "react";

import type { DashboardAnalytics } from "../types/dashboard.types";

import { fetchDashboardData } from "../api/dashboardApi";

import {
  createEvent,
  eventBus,
} from "../../intelligence-bus";

const REFRESH_INTERVAL = 30000;

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardAnalytics>({
    metrics: {
      total_requests: 0,
      avg_tat_hours: 0,
      completed: 0,
      breached_sla: 0,
    },
    throughput: [],
    compliance_trend: [],
    completion_trend: [],
    completion_rate: 0,
    sla_compliance: 0,
    system_health: "healthy",
    last_updated: "",
  });

  const [loading, setLoading] = useState(true);

  async function refreshDashboard() {
    try {
      const data = await fetchDashboardData();

      setMetrics(data);

      eventBus.emit(
        createEvent("METRICS_UPDATED", data)
      );
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshDashboard();

    const interval = setInterval(
      refreshDashboard,
      REFRESH_INTERVAL
    );

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    loading,
  };
}