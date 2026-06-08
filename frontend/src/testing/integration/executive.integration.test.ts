// testing/integration/executive.integration.test.ts

import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { executionCoordinator } from "../../modules/intelligence-bus/services/executionCoordinator";
import { useDashboardStore } from "../../modules/dashboard/store/dashboardStore";

describe(
  "Executive Integration Certification",
  () => {
    beforeEach(() => {
      useDashboardStore
        .getState()
        .updateExecutiveDecision(
          {
            recommendation:
              "Monitor Closely",
            confidence: 0.7,
          }
        );
    });

    it(
      "updates executive decision state",
      () => {
        executionCoordinator.apply(
          95
        );

        const state =
          useDashboardStore.getState();

        expect(
          state.executiveDecision
            .recommendation
        ).toBe(
          "Immediate Executive Oversight"
        );
      }
    );

    it(
      "returns coordination metrics",
      () => {
        const result =
          executionCoordinator.coordinate(
            80
          );

        expect(
          result.strategyConfidence
        ).toBeGreaterThan(0);

        expect(
          result.recommendation
        ).toBeTruthy();
      }
    );
  }
);