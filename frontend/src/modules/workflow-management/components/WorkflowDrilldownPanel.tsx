// src/modules/workflow-management/components/WorkflowDrilldownPanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowDrilldownPanel() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const workflows =
    useWorkflowStore(
      (state) => state.workflows
    );

  const drilldownData =
    useMemo(
      () =>
        workflowInstances.map(
          (instance) => {
            const workflow =
              workflows.find(
                (
                  workflow
                ) =>
                  workflow.id ===
                  instance.workflowId
              );

            return {
              instance,
              workflow,
            };
          }
        ),
      [
        workflowInstances,
        workflows,
      ]
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Drilldown
        </h2>

        <p className="text-sm text-gray-500">
          Executive workflow
          inspection and
          analysis.
        </p>
      </div>

      <div className="space-y-4">
        {drilldownData.map(
          ({
            instance,
            workflow,
          }) => (
            <div
              key={instance.id}
              className="rounded border p-4"
            >
              <div className="mb-3 flex justify-between">
                <div>
                  <div className="font-semibold">
                    {workflow?.name ??
                      "Unknown Workflow"}
                  </div>

                  <div className="text-sm text-gray-500">
                    Request #
                    {
                      instance.requestId
                    }
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">
                    {
                      instance.status
                    }
                  </div>

                  <div className="text-xs text-gray-500">
                    {
                      instance.metrics
                        .completionPercentage
                    }
                    %
                  </div>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-4">
                <Detail
                  label="Current Stage"
                  value={
                    instance.currentStageId
                  }
                />

                <Detail
                  label="Completed Stages"
                  value={
                    instance.metrics
                      .completedStages
                  }
                />

                <Detail
                  label="Pending Stages"
                  value={
                    instance.metrics
                      .pendingStages
                  }
                />

                <Detail
                  label="Elapsed Hours"
                  value={
                    instance.metrics
                      .elapsedHours
                  }
                />
              </div>
            </div>
          )
        )}

        {drilldownData.length ===
          0 && (
          <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
            No workflow drilldown
            data available.
          </div>
        )}
      </div>
    </div>
  );
}

interface DetailProps {
  label: string;
  value: string | number;
}

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div className="rounded border p-2">
      <div className="text-xs uppercase text-gray-500">
        {label}
      </div>

      <div className="mt-1 font-medium">
        {value}
      </div>
    </div>
  );
}