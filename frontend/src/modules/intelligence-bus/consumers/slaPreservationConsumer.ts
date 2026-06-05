// src/modules/intelligence-bus/consumers/slaPreservationConsumer.ts

/**
 * SLA Preservation Consumer
 * --------------------------------------------------
 * Protects SLA integrity using propagated
 * execution intelligence.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

export function registerSLAPreservationConsumer() {
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

      const protection =
        Number(
          coordination.slaProtection ??
            60
        );

      console.log(
        "[SLA Preservation]",
        {
          protection,
        }
      );

      store.emit({
        type:
          "COGNITIVE_SIGNAL",

        payload: {
          domain:
            "sla-preservation",

          protection,
        },

        timestamp:
          new Date().toISOString(),
      });
    }
  );
}