// src/modules/dashboard/components/MetricsGrid.tsx

/**
 * Metrics grid
 * ----------------
 * Renders dashboard KPI cards
 */

import type {
  ReactNode,
} from "react";

import MetricCard from "./MetricCard";

import {
  dashboardStats,
} from "../constants/dashboardStats";

import type {
  DashboardMetrics,
} from "../types/dashboard.types";

import {
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

const icons: Record<
  keyof DashboardMetrics,
  ReactNode
> = {
  total_requests: (
    <Activity size={18} />
  ),
  avg_tat_hours: (
    <Clock size={18} />
  ),
  completed: (
    <CheckCircle size={18} />
  ),
  breached_sla: (
    <AlertTriangle size={18} />
  ),
};

export default function MetricsGrid({
  metrics,
}: MetricsGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {dashboardStats.map(
        (stat) => (
          <div
            key={
              stat.metricKey
            }
            className="space-y-2"
          >
            <div className="text-slate-400">
              {
                icons[
                  stat.metricKey
                ]
              }
            </div>

            <MetricCard
              title={
                stat.title
              }
              value={
                metrics[
                  stat.metricKey
                ]
              }
            />
          </div>
        )
      )}
    </section>
  );
}