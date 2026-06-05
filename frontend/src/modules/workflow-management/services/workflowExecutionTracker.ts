// src/modules/workflow-management/services/workflowExecutionTracker.ts

import type {
  WorkflowBottleneck,
  WorkflowDefinition,
  WorkflowInstance,
} from "../types/workflow.types";

export class WorkflowExecutionTracker {
  getElapsedHours(
    workflow: WorkflowInstance
  ): number {
    return workflow.metrics.elapsedHours;
  }

  isTatBreached(
    workflow: WorkflowInstance
  ): boolean {
    return workflow.metrics.breached;
  }

  getCompletionRate(
    workflow: WorkflowInstance
  ): number {
    return workflow.metrics.completionPercentage;
  }

  detectBottlenecks(
    workflow: WorkflowInstance,
    definition: WorkflowDefinition
  ): WorkflowBottleneck[] {
    return workflow.executions
      .filter(
        (execution) =>
          execution.status ===
            "IN_PROGRESS" ||
          execution.status ===
            "BLOCKED"
      )
      .map((execution) => {
        const stage =
          definition.stages.find(
            (item) =>
              item.id ===
              execution.stageId
          );

        const durationMinutes =
          execution.durationMinutes ??
          0;

        const elapsedHours =
          Number(
            (
              durationMinutes / 60
            ).toFixed(2)
          );

        return {
          workflowInstanceId:
            workflow.id,

          stageId:
            execution.stageId,

          stageName:
            stage?.name ??
            execution.stageId,

          elapsedHours,

          tatHours:
            stage?.tatHours ?? 0,

          severity:
            elapsedHours >
            (stage?.tatHours ??
              0)
              ? 10
              : 3,
        };
      });
  }
}

export const workflowExecutionTracker =
  new WorkflowExecutionTracker();

export default workflowExecutionTracker;