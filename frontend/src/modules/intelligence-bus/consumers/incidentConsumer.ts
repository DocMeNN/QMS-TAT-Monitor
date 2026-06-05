// src/modules/intelligence-bus/consumers/incidentConsumer.ts

/**
 * Incident Consumer
 * --------------------------------------------------
 * Converts alerts into incident intelligence.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";
import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export function registerIncidentConsumer() {
  const store = useIntelligenceStore.getState();

  store.registerConsumer(
    "ALERT_CREATED",
    (event) => {
      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const score =
        Number(
          payload.alertScore ?? 50
        );

      const incidentProbability =
        Math.min(
          100,
          Math.round(score * 1.1)
        );

      const riskBand =
        incidentProbability >= 90
          ? "critical"
          : incidentProbability >= 75
          ? "high"
          : incidentProbability >= 50
          ? "medium"
          : "low";

      useDashboardStore
        .getState()
        .updateIncidentPrediction({
          probability:
            incidentProbability,
          riskBand,
        });

      store.emit({
        type: "INCIDENT_DETECTED",
        payload: {
          ...payload,
          incidentProbability,
          riskBand,
        },
        timestamp:
          new Date().toISOString(),
      });
    }
  );
}