// src/modules/dashboard/components/LiveExecutionFeed.tsx

import {
  useDashboardStore,
} from "../store/dashboardStore";

export function LiveExecutionFeed() {
  const executions =
    useDashboardStore(
      (state) =>
        state.executions
    );

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
      "
    >
      <h2
        className="
          text-lg
          font-bold
          mb-4
        "
      >
        Live Execution Feed
      </h2>

      <div
        className="
          max-h-[400px]
          overflow-auto
          space-y-2
        "
      >
        {executions.map(
          (
            execution
          ) => (
            <div
              key={
                execution.id
              }
              className="
                border
                rounded-lg
                p-3
              "
            >
              <div
                className="
                  font-medium
                "
              >
                {
                  execution.title
                }
              </div>

              <div>
                Action:
                {" "}
                {
                  execution.actionType
                }
              </div>

              <div>
                Severity:
                {" "}
                {
                  execution.severity
                }
              </div>

              <div>
                Status:
                {" "}
                {
                  execution.status
                }
              </div>
            </div>
          )
        )}

        {executions.length ===
          0 && (
          <div>
            No execution activity
            available.
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveExecutionFeed;