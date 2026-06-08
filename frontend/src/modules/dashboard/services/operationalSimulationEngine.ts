// src/modules/dashboard/services/operationalSimulationEngine.ts

import {
  operationalTelemetryService,
} from "./operationalTelemetryService";

import type {
  OperationalSnapshot,
} from "../types/operational.types";

export class OperationalSimulationEngine {
  generateSnapshot(): OperationalSnapshot {
    const queues = [
      operationalTelemetryService.generateQueue(
        "HAEMATOLOGY",
        18
      ),

      operationalTelemetryService.generateQueue(
        "MICROBIOLOGY",
        33
      ),

      operationalTelemetryService.generateQueue(
        "CHEMICAL_PATHOLOGY",
        24
      ),

      operationalTelemetryService.generateQueue(
        "HISTOPATHOLOGY",
        11
      ),
    ];

    const staff = [
      operationalTelemetryService.generateStaff(
        "HAEMATOLOGY",
        "Scientist A",
        12
      ),

      operationalTelemetryService.generateStaff(
        "MICROBIOLOGY",
        "Scientist B",
        18
      ),

      operationalTelemetryService.generateStaff(
        "CHEMICAL_PATHOLOGY",
        "Scientist C",
        10
      ),

      operationalTelemetryService.generateStaff(
        "HISTOPATHOLOGY",
        "Scientist D",
        6
      ),
    ];

    const forecasts =
      queues.map(
        (queue) =>
          operationalTelemetryService.generateForecast(
            queue.department,
            queue.activeRequests
          )
      );

    return operationalTelemetryService.buildSnapshot(
      queues,
      staff,
      forecasts
    );
  }
}

export const operationalSimulationEngine =
  new OperationalSimulationEngine();

export default operationalSimulationEngine;