// src/modules/executive-command-center/components/ExecutionControlCenter.tsx

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export default function ExecutionControlCenter() {
  const executions = useDashboardStore(
    (state) => state.executions
  );

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Execution Control Center
        </h2>

        <p className="text-sm text-gray-500">
          Autonomous execution monitoring
        </p>
      </div>

      <div className="space-y-3">
        {(executions ?? []).map(
          (
            execution: any,
            index: number
          ) => (
            <div
              key={
                execution.id ??
                `${execution.actionType}-${index}`
              }
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {execution.actionType ??
                    "Execution"}
                </span>

                <span className="text-xs text-gray-500">
                  {execution.timestamp ??
                    "-"}
                </span>
              </div>

              <div className="mt-2 text-sm">
                Severity:{" "}
                {execution.severity ??
                  0}
              </div>

              <div className="text-sm">
                Status:{" "}
                {execution.status ??
                  "unknown"}
              </div>
            </div>
          )
        )}

        {(executions?.length ?? 0) ===
          0 && (
          <div className="text-sm text-gray-500">
            No executions recorded.
          </div>
        )}
      </div>
    </div>
  );
}