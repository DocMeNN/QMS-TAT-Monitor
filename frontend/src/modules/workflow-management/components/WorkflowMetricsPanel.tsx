// src/modules/workflow-management/components/WorkflowMetricsPanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowMetricsPanel() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const metrics = useMemo(() => {
    const totalInstances =
      workflowInstances.length;

    const completedInstances =
      workflowInstances.filter(
        (instance) =>
          instance.status ===
          "COMPLETED"
      ).length;

    const activeInstances =
      workflowInstances.filter(
        (instance) =>
          instance.status === "ACTIVE"
      ).length;

    const pausedInstances =
      workflowInstances.filter(
        (instance) =>
          instance.status === "PAUSED"
      ).length;

    const breachedInstances =
      workflowInstances.filter(
        (instance) =>
          instance.metrics.breached
      ).length;

    const totalCompletion =
      workflowInstances.reduce(
        (total, instance) =>
          total +
          instance.metrics
            .completionPercentage,
        0
      );

    const averageCompletion =
      totalInstances > 0
        ? Math.round(
            totalCompletion /
              totalInstances
          )
        : 0;

    return {
      totalInstances,
      completedInstances,
      activeInstances,
      pausedInstances,
      breachedInstances,
      averageCompletion,
    };
  }, [workflowInstances]);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Metrics
        </h2>

        <p className="text-sm text-gray-500">
          Real-time workflow
          execution performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Instances"
          value={
            metrics.totalInstances
          }
        />

        <MetricCard
          title="Completed"
          value={
            metrics.completedInstances
          }
        />

        <MetricCard
          title="Active"
          value={metrics.activeInstances}
        />

        <MetricCard
          title="Paused"
          value={metrics.pausedInstances}
        />

        <MetricCard
          title="Breached"
          value={
            metrics.breachedInstances
          }
        />

        <MetricCard
          title="Completion %"
          value={`${metrics.averageCompletion}%`}
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;

  value: string | number;
}

function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded border p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}