// src/modules/workflow-management/components/WorkflowRuntimeMonitor.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowRuntimeMonitor() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const runtimeView = useMemo(
    () =>
      workflowInstances.map(
        (instance) => {
          const currentExecution =
            instance.executions.find(
              (execution) =>
                execution.stageId ===
                instance.currentStageId
            );

          return {
            id: instance.id,
            requestId:
              instance.requestId,
            status:
              instance.status,
            currentStage:
              instance.currentStageId,
            completion:
              instance.metrics
                .completionPercentage,
            assignedTo:
              currentExecution?.assignedTo ??
              "Unassigned",
          };
        }
      ),
    [workflowInstances]
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Runtime Monitor
        </h2>

        <p className="text-sm text-gray-500">
          Live workflow execution
          tracking.
        </p>
      </div>

      <div className="space-y-3">
        {runtimeView.length ===
        0 ? (
          <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
            No workflow instances
            currently running.
          </div>
        ) : (
          runtimeView.map(
            (runtime) => (
              <div
                key={runtime.id}
                className="rounded border p-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Request #
                      {
                        runtime.requestId
                      }
                    </div>

                    <div className="text-sm text-gray-500">
                      Stage:{" "}
                      {
                        runtime.currentStage
                      }
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
                      {
                        runtime.status
                      }
                    </div>

                    <div className="text-sm text-gray-500">
                      {
                        runtime.completion
                      }
                      %
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Assigned To:{" "}
                  {
                    runtime.assignedTo
                  }
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
