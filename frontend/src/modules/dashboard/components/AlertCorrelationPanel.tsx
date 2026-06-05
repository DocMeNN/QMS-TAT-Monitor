// src/modules/dashboard/components/AlertCorrelationPanel.tsx

import { correlateAlert } from "../services/alertCorrelation";
import PanelShell from "./PanelShell";

export default function AlertCorrelationPanel() {
  const result = correlateAlert(82);

  return (
    <PanelShell title="Panel Title">
      <p>Cluster: {result.clusterId}</p>
      <p>Suppressed: {String(result.duplicateSuppressed)}</p>
    </PanelShell>
  );
}