// src/modules/workflow-management/services/workflowTimelineBridge.ts

import {
  historyRecorder,
} from "../../intelligence-history/services/historyRecorder";

import type {
  HistoryRecord,
} from "../../intelligence-history/types/history.types";

import type {
  WorkflowExecutionEvent,
} from "../types/workflow.types";

export class WorkflowTimelineBridge {
  createTimelineRecord(
    event: WorkflowExecutionEvent
  ): HistoryRecord {
    return historyRecorder.createRecord(
      "ACTION_EXECUTED",
      {
        workflowEventId:
          event.id,

        workflowId:
          event.workflowId,

        stageId:
          event.stageId,

        eventType:
          event.eventType,

        payload:
          event.payload,
      }
    );
  }
}

export const workflowTimelineBridge =
  new WorkflowTimelineBridge();

export default workflowTimelineBridge;