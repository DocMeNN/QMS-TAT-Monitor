// src/modules/intelligence-bus/consumers/dashboardSyncConsumer.ts

/**
 * Dashboard Sync Consumer
 * --------------------------------------------------
 * Synchronizes cognitive intelligence signals
 * into dashboard state.
 */

import { useIntelligenceStore } from "../store/intelligenceStore";

import {
  useDashboardStore,
} from "../../dashboard/store/dashboardStore";

export function registerDashboardSyncConsumer() {
  const store =
    useIntelligenceStore.getState();

  store.registerConsumer(
    "COGNITIVE_SIGNAL",
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

      const domain =
        String(
          payload.domain ?? ""
        );

      const dashboard =
        useDashboardStore.getState();

      switch (domain) {
        case "strategy-evolution":
          dashboard.updateExecutiveDecision(
            {
              recommendation:
                String(
                  payload.recommendation ??
                    "Monitor Closely"
                ),

              confidence:
                Number(
                  payload.confidence ??
                    50
                ) / 100,
            }
          );
          break;

        case "sla-preservation":
          dashboard.updateOrchestrationState(
            {
              mode:
                Number(
                  payload.protection ??
                    0
                ) >= 80
                  ? "normal"
                  : "conserve",

              active: true,
            }
          );
          break;

        case "escalation-forecast":
          console.log(
            "[Dashboard Sync] Escalation Forecast",
            payload
          );
          break;

        case "dependency-intelligence":
          console.log(
            "[Dashboard Sync] Dependency Intelligence",
            payload
          );
          break;

        case "rollback-arbitration":
          console.log(
            "[Dashboard Sync] Rollback Arbitration",
            payload
          );
          break;

        default:
          break;
      }

      console.log(
        "[Dashboard Sync]",
        payload
      );
    }
  );
}