// src/modules/workflow-management/components/WorkflowTimelinePanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowTimelinePanel() {
  const workflowInstances =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  const timelineEntries =
    useMemo(() => {
      return workflowInstances
        .flatMap((instance) =>
          instance.executions.map(
            (execution) => ({
              workflowInstanceId:
                instance.id,
              requestId:
                instance.requestId,
              stageId:
                execution.stageId,
              status:
                execution.status,
              startedAt:
                execution.startedAt,
              completedAt:
                execution.completedAt,
              durationMinutes:
                execution.durationMinutes,
            })
          )
        )
        .sort((a, b) => {
          const aTime =
            a.startedAt
              ? new Date(
                  a.startedAt
                ).getTime()
              : 0;

          const bTime =
            b.startedAt
              ? new Date(
                  b.startedAt
                ).getTime()
              : 0;

          return bTime - aTime;
        });
    }, [workflowInstances]);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Timeline
        </h2>

        <p className="text-sm text-gray-500">
          Historical stage
          progression across all
          workflow instances.
        </p>
      </div>

      <div className="space-y-3">
        {timelineEntries.length ===
        0 ? (
          <EmptyState />
        ) : (
          timelineEntries.map(
            (entry, index) => (
              <div
                key={`${entry.workflowInstanceId}-${entry.stageId}-${index}`}
                className="rounded border p-3"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">
                      Request #
                      {
                        entry.requestId
                      }
                    </div>

                    <div className="text-sm text-gray-500">
                      Stage:{" "}
                      {
                        entry.stageId
                      }
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
                      {
                        entry.status
                      }
                    </div>

                    <div className="text-xs text-gray-500">
                      {entry.startedAt
                        ? new Date(
                            entry.startedAt
                          ).toLocaleString()
                        : "Not Started"}
                    </div>
                  </div>
                </div>

                {entry.durationMinutes !==
                  undefined && (
                  <div className="mt-2 text-xs text-gray-500">
                    Duration:{" "}
                    {
                      entry.durationMinutes
                    }{" "}
                    mins
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
      No workflow timeline data
      available.
    </div>
  );
}