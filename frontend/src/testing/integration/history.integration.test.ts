// testing/integration/history.integration.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { historyRecorder } from "../../modules/intelligence-history/services/historyRecorder";
import { workflowTimelineBridge } from "../../modules/workflow-management/services/workflowTimelineBridge";

describe(
  "History Integration Certification",
  () => {
    it(
      "creates immutable history records",
      () => {
        const record =
          historyRecorder.createRecord(
            "ACTION_EXECUTED",
            {
              workflowId: "wf-1",
            }
          );

        expect(
          record.eventType
        ).toBe(
          "ACTION_EXECUTED"
        );

        expect(
          record.id
        ).toBeTruthy();
      }
    );

    it(
      "creates workflow timeline records",
      () => {
        const record =
          workflowTimelineBridge.createTimelineRecord(
            {
              id: "evt-1",
              workflowInstanceId:
                "instance-1",
              workflowId:
                "workflow-1",
              stageId:
                "stage-1",
              eventType:
                "STAGE_COMPLETED",
              timestamp:
                new Date().toISOString(),
            }
          );

        expect(
          record.eventType
        ).toBe(
          "ACTION_EXECUTED"
        );
      }
    );
  }
);