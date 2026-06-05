// src/modules/dashboard/components/IncidentPredictionPanel.tsx

import PanelShell from "./PanelShell";

import {
  useDashboardStore,
} from "../store/dashboardStore";

export default function IncidentPredictionPanel() {
  const prediction =
    useDashboardStore(
      (state) =>
        state.incidentPrediction
    );

  return (
    <PanelShell
      title="Incident Prediction"
    >
      <p>
        Probability:
        {" "}
        {prediction.probability}
        %
      </p>

      <p>
        Risk Band:
        {" "}
        {prediction.riskBand}
      </p>
    </PanelShell>
  );
}