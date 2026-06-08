// src/modules/dashboard/services/operationalTelemetryService.ts

import type {
  LaboratoryQueue,
  OperationalSnapshot,
  OperationalStatus,
  StaffLoad,
  TatForecast,
} from "../types/operational.types";

export class OperationalTelemetryService {
  private calculateStatus(
    utilization: number
  ): OperationalStatus {
    if (utilization >= 90) {
      return "CRITICAL";
    }

    if (utilization >= 70) {
      return "WARNING";
    }

    return "HEALTHY";
  }

  generateQueue(
    department: string,
    activeRequests: number
  ): LaboratoryQueue {
    const utilization =
      Math.min(
        100,
        Math.round(
          activeRequests * 1.5
        )
      );

    return {
      id: crypto.randomUUID(),

      department,

      activeRequests,

      completedToday:
        Math.round(
          activeRequests * 2.1
        ),

      breachedToday:
        Math.round(
          activeRequests * 0.08
        ),

      averageTatHours:
        Number(
          (
            2 +
            activeRequests /
              10
          ).toFixed(1)
        ),

      utilization,

      status:
        this.calculateStatus(
          utilization
        ),
    };
  }

  generateStaff(
    department: string,
    name: string,
    assignedCases: number
  ): StaffLoad {
    const capacity = 20;

    const utilization =
      Math.round(
        (assignedCases /
          capacity) *
          100
      );

    return {
      id: crypto.randomUUID(),

      name,

      department,

      assignedCases,

      capacity,

      utilization,

      status:
        this.calculateStatus(
          utilization
        ),
    };
  }

  generateForecast(
    department: string,
    activeRequests: number
  ): TatForecast {
    return {
      department,

      projectedTatHours:
        Number(
          (
            3 +
            activeRequests *
              0.15
          ).toFixed(2)
        ),

      projectedBreachRisk:
        Math.min(
          100,
          Math.round(
            activeRequests *
              1.2
          )
        ),

      confidence: 87,
    };
  }

  buildSnapshot(
    queues: LaboratoryQueue[],
    staff: StaffLoad[],
    forecasts: TatForecast[]
  ): OperationalSnapshot {
    const critical =
      [
        ...queues.map(
          (q) => q.status
        ),
        ...staff.map(
          (s) => s.status
        ),
      ].includes(
        "CRITICAL"
      );

    const warning =
      [
        ...queues.map(
          (q) => q.status
        ),
        ...staff.map(
          (s) => s.status
        ),
      ].includes(
        "WARNING"
      );

    return {
      timestamp:
        new Date().toISOString(),

      queues,

      staff,

      forecasts,

      overallHealth:
        critical
          ? "CRITICAL"
          : warning
          ? "WARNING"
          : "HEALTHY",
    };
  }
}

export const operationalTelemetryService =
  new OperationalTelemetryService();

export default operationalTelemetryService;