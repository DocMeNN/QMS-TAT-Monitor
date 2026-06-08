// testing/integration/workflow.integration.test.ts

import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { useAuditStore } from "../../modules/audit-persistence/store/auditStore";
import { workflowAuditBridge } from "../../modules/workflow-management/services/workflowAuditBridge";

describe(
  "Workflow Integration Certification",
  () => {
    beforeEach(() => {
      useAuditStore
        .getState()
        .clearArchives();
    });

    it(
      "creates workflow audit records",
      () => {
        workflowAuditBridge.recordWorkflowEvent(
          {
            id: "instance-1",
            workflowId:
              "workflow-1",
            requestId:
              "request-1",
            request:
              {} as never,
            status: "ACTIVE",
            currentStageId:
              "stage-1",
            executions: [],
            metrics:
              {} as never,
            startedAt:
              new Date().toISOString(),
          },
          {
            id: "event-1",
            workflowInstanceId:
              "instance-1",
            workflowId:
              "workflow-1",
            stageId:
              "stage-1",
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
  }
);