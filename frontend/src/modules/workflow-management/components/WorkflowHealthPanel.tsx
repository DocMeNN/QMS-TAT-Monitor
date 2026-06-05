// src/modules/workflow-management/components/WorkflowHealthPanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowHealthPanel() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const bottlenecks =
    useWorkflowStore(
      (state) => state.bottlenecks
    );

  const health = useMemo(() => {
    const total =
      workflowInstances.length;

    const healthy =
      workflowInstances.filter(
        (instance) =>
          !instance.metrics.breached
      ).length;

    const breached =
      workflowInstances.filter(
        (instance) =>
          instance.metrics.breached
      ).length;

    const score =
      total === 0
        ? 100
        : Math.round(
            (healthy / total) *
              100
          );

    return {
      total,
      healthy,
      breached,
      score,
      bottlenecks:
        bottlenecks.length,
    };
  }, [
    workflowInstances,
    bottlenecks,
  ]);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Health
        </h2>

        <p className="text-sm text-gray-500">
          Executive workflow
          health overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Metric
          title="Health Score"
          value={`${health.score}%`}
        />

        <Metric
          title="Instances"
          value={health.total}
        />

        <Metric
          title="Healthy"
          value={health.healthy}
        />

        <Metric
          title="Breached"
          value={health.breached}
        />

        <Metric
          title="Bottlenecks"
          value={
            health.bottlenecks
          }
        />
      </div>
    </div>
  );
}

interface MetricProps {
  title: string;
  value: string | number;
}

function Metric({
  title,
  value,
}: MetricProps) {
  return (
    <div className="rounded border p-3">
      <div className="text-xs uppercase text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}