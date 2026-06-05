// src/modules/workflow-management/services/workflowComplianceBridge.ts

import {
  complianceReportGenerator,
} from "../../audit-persistence/services/complianceReportGenerator";

import type {
  WorkflowInstance,
} from "../types/workflow.types";

export interface WorkflowComplianceSummary {
  workflowId: string;

  workflowInstanceId: string;

  complianceScore: number;

  criticalEvents: number;

  generatedAt: string;
}

export class WorkflowComplianceBridge {
  generateComplianceSummary(
    workflow: WorkflowInstance
  ): WorkflowComplianceSummary {
    const report =
      complianceReportGenerator.generate();

    return {
      workflowId:
        workflow.workflowId,

      workflowInstanceId:
        workflow.id,

      complianceScore:
        report.complianceScore,

      criticalEvents:
        report.criticalEvents,

      generatedAt:
        report.generatedAt,
    };
  }
}

export const workflowComplianceBridge =
  new WorkflowComplianceBridge();

export default workflowComplianceBridge;