// src/modules/dashboard/components/ExecutiveDecisionPanel.tsx

import {
  useDashboardStore,
} from "../store/dashboardStore";

export default function ExecutiveDecisionPanel() {
  const decision =
    useDashboardStore(
      (state) =>
        state.executiveDecision
    );

  return (
    <div
      className="
      bg-slate-900/85
      rounded-xl
      shadow-lg
      p-5
      border
      border-cyan-500/30
      text-slate-100
    "
    >
      <h2
        className="
        font-semibold
        text-lg
        mb-4
        text-cyan-300
      "
      >
        Executive Decision Core
      </h2>

      <div
        className="
        space-y-2
        text-slate-300
      "
      >
        <p>
          Recommendation:
          {" "}
          {
            decision.recommendation
          }
        </p>

        <p>
          Confidence:
          {" "}
          {(
            decision.confidence *
            100
          ).toFixed(0)}
          %
        </p>
      </div>
    </div>
  );
}