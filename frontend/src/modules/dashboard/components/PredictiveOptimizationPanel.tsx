// src/modules/dashboard/components/PredictiveOptimizationPanel.tsx

import {
  getPredictiveOptimizationMetrics
} from "../services/predictiveOptimizationService";

import PanelShell from "./PanelShell";

export default function PredictiveOptimizationPanel() {
  const metrics = getPredictiveOptimizationMetrics();

  return (
    <PanelShell title="Predictive Optimization">

      <div className="space-y-2 text-sm">
        <p>Overload Risk: {metrics.overloadProbability}%</p>
        <p>Breach Forecast: {metrics.breachForecast}%</p>
        <p>Optimization Score: {metrics.optimizationScore}%</p>
        <p>Preventive Actions: {metrics.preventionActions}</p>
      </div>
    </PanelShell>
  );
}