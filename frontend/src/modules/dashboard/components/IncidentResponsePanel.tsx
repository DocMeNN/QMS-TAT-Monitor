// src/modules/dashboard/components/IncidentResponsePanel.tsx

import { resolveIncidentResponse } from "../services/incidentResponseEngine";
import PanelShell from "./PanelShell";

export default function IncidentResponsePanel() {
  const response = resolveIncidentResponse(82);

  return (
    <PanelShell title="Incident Response">
      <p>{response}</p>
    </PanelShell>
  );
}