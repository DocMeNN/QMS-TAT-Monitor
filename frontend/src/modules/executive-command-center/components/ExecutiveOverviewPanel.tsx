// src/modules/executive-command-center/components/ExecutiveOverviewPanel.tsx

import { useMemo } from "react";

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export default function ExecutiveOverviewPanel() {
  const dashboard =
    useDashboardStore();

  const overview = useMemo(() => {
    return {
      totalRequests:
        dashboard.data?.metrics
          .total_requests ?? 0,

      activeAlerts:
        dashboard.alertState.score,

      predictedIncidents:
        dashboard.incidentPrediction
          .probability,

      executions:
        dashboard.executions.length,
    };
  }, [dashboard]);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Executive Overview
      </h2>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Requests"
          value={overview.totalRequests}
        />

        <MetricCard
          label="Alert Score"
          value={overview.activeAlerts}
        />

        <MetricCard
          label="Incident Risk"
          value={
            overview.predictedIncidents
          }
        />

        <MetricCard
          label="Executions"
          value={overview.executions}
        />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}