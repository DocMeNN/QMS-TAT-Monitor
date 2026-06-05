//src/modules/dashboard/components/DependencyIntelligencePanel.tsx

import { dependencyIntelligence }
  from "../services/dependencyIntelligence";

import PanelShell from "./PanelShell";

export default function DependencyIntelligencePanel() {
  const insight =
    dependencyIntelligence.analyze(4);

  return (
    <div className="dashboard-card rounded-xl shadow p-5">
      <h2 className="font-semibold text-lg mb-4">
        Dependency Intelligence
      </h2>

      <div className="space-y-2">
        <p>Affected Systems: {insight.affectedSystems}</p>
        <p>Propagation Risk: {insight.propagationRisk}%</p>
        <p>Health: {insight.dependencyHealth}</p>
      </div>
    </div>
  );
}