//src/modules/dashboard/services/escalationForecastEngine.ts

export interface EscalationForecast {
  riskProbability: number;
  projectedBreachWindow: string;
  escalationLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

class EscalationForecastEngine {
  forecast(activeBreaches: number): EscalationForecast {
    const probability = Math.min(activeBreaches * 12, 100);

    let escalationLevel: EscalationForecast["escalationLevel"] = "LOW";

    if (probability > 80) escalationLevel = "CRITICAL";
    else if (probability > 60) escalationLevel = "HIGH";
    else if (probability > 30) escalationLevel = "MEDIUM";

    return {
      riskProbability: probability,
      projectedBreachWindow: `${Math.max(1, 24 - activeBreaches)}h`,
      escalationLevel
    };
  }
}

export const escalationForecastEngine =
  new EscalationForecastEngine();