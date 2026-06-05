//src/modules/dashboard/components/StrategyEvolutionPanel.tsx

import { strategyEvolutionEngine }
  from "../services/strategyEvolutionEngine";

export default function StrategyEvolutionPanel() {
  const decision =
    strategyEvolutionEngine.select(
      "node-1",
      90
    );

  return (
    <div className="dashboard-card">
      <h3>Strategy Evolution Intelligence</h3>

      <div>
        Preferred:
        {decision.selectedStrategy}
      </div>

      <div>
        Confidence:
        {decision.confidence.toFixed(1)}%
      </div>

      <div>
        Alternatives:
        {decision.alternatives.join(", ")}
      </div>
    </div>
  );
}