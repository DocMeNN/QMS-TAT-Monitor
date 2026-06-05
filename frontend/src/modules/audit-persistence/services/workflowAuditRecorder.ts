// src/modules/audit-persistence/services/workflowAuditRecorder.ts

import {
  workflowAuditBridge,
} from "../../workflow-management/services/workflowAuditBridge";

import type {
  WorkflowExecutionEvent,
  WorkflowInstance,
} from "../../workflow-management/types/workflow.types";

export class WorkflowAuditRecorder {
  record(
    workflow: WorkflowInstance,
    event: WorkflowExecutionEvent
  ) {
    return workflowAuditBridge.recordWorkflowEvent(
      workflow,
      event
    );
  }
}

export const workflowAuditRecorder =
  new WorkflowAuditRecorder();

export default workflowAuditRecorder;