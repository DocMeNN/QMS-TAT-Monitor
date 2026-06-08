// testing/integration/audit.integration.test.ts

import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { auditIngestion } from "../../modules/audit-persistence/services/auditIngestion";
import { useAuditStore } from "../../modules/audit-persistence/store/auditStore";

describe(
  "Audit Integration Certification",
  () => {
    beforeEach(() => {
      useAuditStore
        .getState()
        .clearArchives();
    });

    it(
      "persists audit records",
      () => {
        auditIngestion.ingestAuditRecord(
          {
            id: "audit-1",
            sourceEventId: "evt-1",
            category: "audit",
            eventType:
              "WORKFLOW_STARTED",
            timestamp:
              new Date().toISOString(),
          }
        );

        expect(
          useAuditStore.getState()
            .auditRecords.length
        ).toBe(1);
      }
    );

    it(
      "archives decision events",
      () => {
        auditIngestion.ingestAuditRecord(
          {
            id: "decision-1",
            sourceEventId:
              "decision-event",
            category: "decision",
            eventType:
              "DECISION_CREATED",
            severity: 90,
            timestamp:
              new Date().toISOString(),
            payload: {
              recommendation:
                "Escalate",
            },
          }
        );

        expect(
          useAuditStore.getState()
            .decisionArchives.length
        ).toBe(1);
      }
    );

    it(
      "archives execution events",
      () => {
        auditIngestion.ingestAuditRecord(
          {
            id: "execution-1",
            sourceEventId:
              "exec-event",
            category: "execution",
            eventType:
              "ACTION_EXECUTED",
            severity: 80,
            status: "completed",
            timestamp:
              new Date().toISOString(),
            payload: {
              actionType:
                "MITIGATION",
            },
          }
        );

        expect(
          useAuditStore.getState()
            .executionArchives.length
        ).toBe(1);
      }
    );
  }
);