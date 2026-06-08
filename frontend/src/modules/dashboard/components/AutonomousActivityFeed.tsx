// src/modules/dashboard/components/AutonomousActivityFeed.tsx

import {
  useDashboardStore,
} from "../store/dashboardStore";

export function AutonomousActivityFeed() {
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
        Autonomous Activity Feed
      </h2>

      <div
        className="
          space-y-2
          max-h-[400px]
          overflow-auto
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
              <div>
                {
                  execution.title
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
                {
                  new Date(
                    execution.executedAt
                  ).toLocaleTimeString()
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default
  AutonomousActivityFeed;