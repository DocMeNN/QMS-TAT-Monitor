// src/modules/intelligence-operations/services/workflowOperationsBridge.ts

import type {
  WorkflowInstance,
} from "../../workflow-management/types/workflow.types";

import {
  operationsEngine,
} from "./operationsEngine";

export class WorkflowOperationsBridge {
  createWorkflowOperation(
    workflow: WorkflowInstance
  ) {
    return operationsEngine.createOperation(
      `Workflow ${workflow.id}`,
      `Workflow execution started`,
      "WORKFLOW",
      "MEDIUM"
    );
  }
}

export const workflowOperationsBridge =
  new WorkflowOperationsBridge();

export default workflowOperationsBridge;