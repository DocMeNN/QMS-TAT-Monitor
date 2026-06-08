// testing/integration/dashboard.integration.test.ts

import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { useDashboardStore } from "../../modules/dashboard/store/dashboardStore";

describe(
  "Dashboard Integration Certification",
  () => {
    beforeEach(() => {
      useDashboardStore
        .getState()
        .setError(null);
    });

    it(
      "accepts dashboard updates",
      () => {
        const store =
          useDashboardStore.getState();

        const before =
          store.data?.metrics
            .total_requests ?? 0;

        store.addRequest({
          title:
            "Integration Test",
          description:
            "Certification",
          department:
            "HAEMATOLOGY",
          priority:
            "HIGH",
          createdAt:
            new Date().toISOString(),
        });

        const after =
          useDashboardStore
            .getState()
            .data?.metrics
            .total_requests ?? 0;

        expect(
          after
        ).toBe(
          before + 1
        );
      }
    );

    it(
      "updates alert state",
      () => {
        useDashboardStore
          .getState()
          .updateAlertState({
            score: 95,
            level:
              "critical",
            confidence: 1,
          });

        expect(
          useDashboardStore
            .getState()
            .alertState.level
        ).toBe(
          "critical"
        );
      }
    );
  }
);