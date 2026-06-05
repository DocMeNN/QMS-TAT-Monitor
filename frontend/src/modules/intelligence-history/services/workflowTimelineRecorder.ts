// src/modules/intelligence-history/services/workflowTimelineRecorder.ts

import {
  workflowTimelineBridge,
} from "../../workflow-management/services/workflowTimelineBridge";

import type {
  WorkflowExecutionEvent,
} from "../../workflow-management/types/workflow.types";

export class WorkflowTimelineRecorder {
  record(
    event: WorkflowExecutionEvent
  ) {
    return workflowTimelineBridge.createTimelineRecord(
      event
    );
  }
}

export const workflowTimelineRecorder =
  new WorkflowTimelineRecorder();

export default workflowTimelineRecorder;