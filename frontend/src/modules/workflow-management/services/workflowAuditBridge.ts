// src/modules/workflow-management/services/workflowAuditBridge.ts

import {
  auditIngestion,
} from "../../audit-persistence/services/auditIngestion";

import type {
  AuditRecord,
} from "../../audit-persistence/types/audit.types";

import type {
  WorkflowExecutionEvent,
  WorkflowInstance,
} from "../types/workflow.types";

export class WorkflowAuditBridge {
  recordWorkflowEvent(
    workflow: WorkflowInstance,
    event: WorkflowExecutionEvent
  ): AuditRecord {
    const record: AuditRecord =
      {
        id: event.id,

        sourceEventId:
          workflow.id,

        category: "audit",

        eventType:
          event.eventType,

        severity: 10,

        status:
          workflow.status,

        timestamp:
          event.timestamp,

        payload: {
          workflowId:
            workflow.workflowId,

          requestId:
            workflow.requestId,

          stageId:
            event.stageId,

          ...event.payload,
        },
      };

    auditIngestion.ingestAuditRecord(
      record
    );

    return record;
  }
}

export const workflowAuditBridge =
  new WorkflowAuditBridge();

export default workflowAuditBridge;