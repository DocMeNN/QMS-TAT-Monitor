// src/modules/dashboard/components/DecisionAutomationPanel.tsx

import {
  getDecisionAutomationMetrics
} from "../services/decisionAutomationService";

import PanelShell from "./PanelShell";

export default function DecisionAutomationPanel() {
  const metrics = getDecisionAutomationMetrics();

  return (
    <PanelShell title="Decision Automation">
      <div className="space-y-2 text-sm">
        <p>Confidence: {metrics.automationConfidence}%</p>
        <p>Active Decisions: {metrics.activeDecisions}</p>
        <p>Executed: {metrics.interventionsExecuted}</p>
        <p>Latency: {metrics.approvalLatency}s</p>
      </div>
    </PanelShell>
  );
}