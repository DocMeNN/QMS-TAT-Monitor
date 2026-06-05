// src/modules/intelligence-bus/consumers/decisionConsumer.ts

/**
 * Decision Consumer
 * --------------------------------------------------
 * Creates executive decisions from incidents.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";
import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export function registerDecisionConsumer() {
  const store = useIntelligenceStore.getState();

  store.registerConsumer(
    "INCIDENT_DETECTED",
    (event) => {
      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const probability =
        Number(
          payload.incidentProbability ??
            50
        );

      const recommendation =
        probability >= 90
          ? "Immediate Escalation"
          : probability >= 75
          ? "Mitigation Required"
          : probability >= 50
          ? "Monitor Closely"
          : "Normal Operation";

      useDashboardStore
        .getState()
        .updateExecutiveDecision({
          recommendation,
          confidence:
            probability / 100,
        });

      store.emit({
        type: "DECISION_CREATED",
        payload: {
          ...payload,
          executiveDecision:
            recommendation,
        },
        timestamp:
          new Date().toISOString(),
      });
    }
  );
}