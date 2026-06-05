// src/modules/dashboard/components/AlertIntelligencePanel.tsx

import PanelShell from "./PanelShell";

import {
  useDashboardStore,
} from "../store/dashboardStore";

export default function AlertIntelligencePanel() {
  const alertState =
    useDashboardStore(
      (state) => state.alertState
    );

  return (
    <PanelShell
      title="Alert Intelligence"
    >
      <p>
        Alert Level:
        {" "}
        {alertState.level}
      </p>

      <p>
        Alert Score:
        {" "}
        {alertState.score}
      </p>

      <p>
        Confidence:
        {" "}
        {(
          alertState.confidence *
          100
        ).toFixed(0)}
        %
      </p>
    </PanelShell>
  );
}