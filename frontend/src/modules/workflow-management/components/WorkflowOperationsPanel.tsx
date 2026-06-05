// src/modules/workflow-management/components/WorkflowOperationsPanel.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowOperationsPanel() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const bottlenecks =
    useWorkflowStore(
      (state) => state.bottlenecks
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Operations
        </h2>

        <p className="text-sm text-gray-500">
          Operational execution
          visibility across
          laboratory workflows.
        </p>
      </div>

      <div className="space-y-3">
        {workflowInstances.map(
          (instance) => {
            const instanceBottlenecks =
              bottlenecks.filter(
                (
                  bottleneck
                ) =>
                  bottleneck.workflowInstanceId ===
                  instance.id
              );

            return (
              <div
                key={instance.id}
                className="rounded border p-3"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">
                      Request #
                      {
                        instance.requestId
                      }
                    </div>

                    <div className="text-sm text-gray-500">
                      Current Stage:{" "}
                      {
                        instance.currentStageId
                      }
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
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

                <div className="mt-2 text-xs text-gray-500">
                  Bottlenecks:{" "}
                  {
                    instanceBottlenecks.length
                  }
                </div>
              </div>
            );
          }
        )}

        {workflowInstances.length ===
          0 && (
          <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
            No active workflow
            operations available.
          </div>
        )}
      </div>
    </div>
  );
}