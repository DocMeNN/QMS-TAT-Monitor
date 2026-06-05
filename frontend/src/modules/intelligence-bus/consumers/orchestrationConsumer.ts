// src/modules/intelligence-bus/consumers/orchestrationConsumer.ts

/**
 * Orchestration Consumer
 * --------------------------------------------------
 * Final autonomous execution stage.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";
import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export function registerOrchestrationConsumer() {
  const store = useIntelligenceStore.getState();

  store.registerConsumer(
    "DECISION_CREATED",
    (event) => {
      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const decision =
        String(
          payload.executiveDecision ??
            "Normal Operation"
        );

      const orchestrationMode =
        decision ===
        "Immediate Escalation"
          ? "emergency"
          : decision ===
            "Mitigation Required"
          ? "restricted"
          : decision ===
            "Monitor Closely"
          ? "conserve"
          : "normal";

      useDashboardStore
        .getState()
        .updateOrchestrationState({
          mode:
            orchestrationMode,
          active: true,
        });

      store.emit({
        type:
          "ORCHESTRATION_TRIGGERED",
        payload: {
          ...payload,
          orchestrationMode,
        },
        timestamp:
          new Date().toISOString(),
      });
    }
  );
}