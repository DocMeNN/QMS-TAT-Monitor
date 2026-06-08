// src/modules/dashboard/services/liveOperationsSimulator.ts

import {
  useDashboardStore,
} from "../store/dashboardStore";

import {
  useOperationalStore,
} from "../store/operationalStore";

export class LiveOperationsSimulator {
  private timer?: number;

  start() {
    if (this.timer) {
      return;
    }

    this.timer = window.setInterval(
      () => {
        this.tick();
      },
      5000
    );
  }

  stop() {
    if (this.timer) {
      clearInterval(
        this.timer
      );

      this.timer =
        undefined;
    }
  }

  private tick() {
    useOperationalStore
      .getState()
      .refresh();

    const severity =
      Math.floor(
        Math.random() * 100
      );

    useDashboardStore
      .getState()
      .addExecution({
        id:
          crypto.randomUUID(),

        actionType:
          severity > 80
            ? "MITIGATION"
            : "MONITORING",

        title:
          severity > 80
            ? "Autonomous SLA Protection Triggered"
            : "Operational Health Review",

        status:
          "COMPLETED",

        severity,

        executedAt:
          new Date().toISOString(),
      });
  }
}

export const liveOperationsSimulator =
  new LiveOperationsSimulator();

export default liveOperationsSimulator;