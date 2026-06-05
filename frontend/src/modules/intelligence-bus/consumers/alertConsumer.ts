// src/modules/intelligence-bus/consumers/alertConsumer.ts

/**
 * Alert Consumer
 * --------------------------------------------------
 * Converts request activity into alert intelligence.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";
import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export function registerAlertConsumer() {
  const store = useIntelligenceStore.getState();

  store.registerConsumer(
    "REQUEST_CREATED",
    (event) => {
      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? (event.payload as Record<
              string,
              unknown
            >)
          : {};

      const priority =
        String(
          payload.priority ?? "Medium"
        );

      const alertScore =
        priority === "Critical"
          ? 95
          : priority === "High"
          ? 80
          : priority === "Medium"
          ? 65
          : 45;

      const alertLevel =
        alertScore >= 90
          ? "critical"
          : alertScore >= 75
          ? "high"
          : alertScore >= 50
          ? "medium"
          : "low";

      useDashboardStore
        .getState()
        .updateAlertState({
          score: alertScore,
          level: alertLevel,
          confidence:
            alertScore / 100,
        });

      store.emit({
        type: "ALERT_CREATED",
        payload: {
          ...payload,
          alertScore,
          alertLevel,
        },
        timestamp:
          new Date().toISOString(),
      });
    }
  );
}