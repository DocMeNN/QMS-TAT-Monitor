//src/modules/dashboard/components/SlaPreservationPanel.tsx

import { slaPreservationEngine }
  from "../services/slaPreservationEngine";

export default function SlaPreservationPanel() {
  const defense =
    slaPreservationEngine.defend(36);

  return (
    <div className="dashboard-card rounded-xl shadow p-5">
      <h2 className="font-semibold text-lg mb-4">
        SLA Preservation
      </h2>

      <div className="space-y-2">
        <p>Protection: {defense.protectionScore}%</p>
        <p>
          Preservation:
          {" "}
          {defense.predictedPreservation.toFixed(1)}%
        </p>
        <p>Mode: {defense.mode}</p>
      </div>
    </div>
  );
}