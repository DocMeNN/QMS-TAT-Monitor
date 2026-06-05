// src/modules/workflow-management/components/WorkflowExecutionPanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowExecutionPanel() {
  const executionEvents =
    useWorkflowStore(
      (state) =>
        state.executionEvents
    );

  const latestEvents = useMemo(
    () =>
      [...executionEvents]
        .sort(
          (a, b) =>
            new Date(
              b.timestamp
            ).getTime() -
            new Date(
              a.timestamp
            ).getTime()
        )
        .slice(0, 20),
    [executionEvents]
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Execution Activity
        </h2>

        <p className="text-sm text-gray-500">
          Recent workflow runtime
          events.
        </p>
      </div>

      <div className="space-y-2">
        {latestEvents.length ===
        0 ? (
          <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
            No execution events
            recorded.
          </div>
        ) : (
          latestEvents.map(
            (event) => (
              <div
                key={event.id}
                className="rounded border p-3"
              >
                <div className="flex justify-between">
                  <div className="font-medium">
                    {
                      event.eventType
                    }
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(
                      event.timestamp
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  Workflow:
                  {" "}
                  {
                    event.workflowId
                  }
                </div>

                <div className="text-sm text-gray-600">
                  Stage:{" "}
                  {
                    event.stageId
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