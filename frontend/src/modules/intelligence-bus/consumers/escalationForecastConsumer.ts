// src/modules/intelligence-bus/consumers/escalationForecastConsumer.ts

/**
 * Escalation Forecast Consumer
 * --------------------------------------------------
 * Predicts escalation likelihood from
 * propagated execution signals.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

export function registerEscalationForecastConsumer() {
  const store =
    useIntelligenceStore.getState();

  store.registerConsumer(
    "EXECUTION_PROPAGATED",
    (event) => {
      const payload =
        typeof event.payload ===
          "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const coordination =
        typeof payload.coordination ===
          "object" &&
        payload.coordination !== null
          ? (payload.coordination as Record<
              string,
              unknown
            >)
          : {};

      const risk =
        Number(
          coordination.escalationRisk ??
            50
        );

      console.log(
        "[Escalation Forecast]",
        {
          risk,
        }
      );

      store.emit({
        type:
          "COGNITIVE_SIGNAL",

        payload: {
          domain:
            "escalation-forecast",

          risk,
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}