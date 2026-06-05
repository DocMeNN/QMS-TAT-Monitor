//src/modules/dashboard/components/EscalationForecastPanel.tsx

import { escalationForecastEngine }
  from "../services/escalationForecastEngine";

export default function EscalationForecastPanel() {
  const forecast =
    escalationForecastEngine.forecast(5);

  return (
    <div className="dashboard-card rounded-xl shadow p-5">
      <h2 className="font-semibold text-lg mb-4">
        Escalation Forecast
      </h2>

      <div className="space-y-2">
        <p>Risk: {forecast.riskProbability}%</p>
        <p>Window: {forecast.projectedBreachWindow}</p>
        <p>Level: {forecast.escalationLevel}</p>
      </div>
    </div>
  );
}