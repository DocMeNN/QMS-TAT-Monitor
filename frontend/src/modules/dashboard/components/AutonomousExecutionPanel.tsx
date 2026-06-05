// src/modules/dashboard/components/AutonomousExecutionPanel.tsx

import PanelShell from "./PanelShell";

import {
  useDashboardStore,
} from "../store/dashboardStore";

export default function AutonomousExecutionPanel() {
  const executions =
    useDashboardStore(
      (state) => state.executions
    );

  return (
    <PanelShell
      title="Autonomous Execution History"
    >
      {executions.length === 0 ? (
        <div className="text-sm text-slate-400">
          No autonomous executions
          recorded.
        </div>
      ) : (
        <div className="space-y-3">
          {executions.map(
            (execution) => (
              <div
                key={execution.id}
                className="
                  rounded-lg
                  border
                  border-slate-700
                  p-3
                  bg-slate-900/40
                "
              >
                <div className="flex justify-between items-center">
                  <span
                    className="
                      font-semibold
                      text-cyan-300
                    "
                  >
                    {execution.title}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    {execution.status}
                  </span>
                </div>

                <div
                  className="
                    mt-2
                    text-sm
                    text-slate-300
                    space-y-1
                  "
                >
                  <div>
                    Action:
                    {" "}
                    {execution.actionType}
                  </div>

                  <div>
                    Severity:
                    {" "}
                    {execution.severity}
                  </div>

                  <div>
                    Executed:
                    {" "}
                    {new Date(
                      execution.executedAt
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </PanelShell>
  );
}