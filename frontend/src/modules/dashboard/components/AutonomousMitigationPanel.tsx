//src/modules/dashboard/components/AutonomousMitigationPanel.tsx

import { mitigationCoordinator }
  from "../services/mitigationCoordinator";

export default function AutonomousMitigationPanel() {
  const actions = mitigationCoordinator.getActions();

  return (
    <div className="bg-slate-900/85 rounded-xl shadow-lg p-5 border border-cyan-500/30 text-slate-100">
      <h3>Autonomous Mitigation Activity</h3>

      <div className="space-y-3">
        {actions.map(action => (
          <div
            key={action.id}
            className="border rounded-lg p-3"
          >
            <div>{action.type}</div>
            <div>{action.targetNode}</div>
            <div>{action.status}</div>
            <div>{action.reason}</div>
            <div>
              {action.executionTime
                ? `${action.executionTime}ms`
                : "Running..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}