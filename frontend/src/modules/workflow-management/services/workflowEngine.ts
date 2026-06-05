// src/modules/workflow-management/services/workflowEngine.ts

import type {
  Request,
} from "../../data-entry/types/request.types";

import type {
  WorkflowDefinition,
  WorkflowExecutionEvent,
  WorkflowInstance,
  WorkflowMetrics,
  WorkflowStageExecution,
} from "../types/workflow.types";

import {
  workflowStageResolver,
} from "./workflowStageResolver";

import {
  workflowValidator,
} from "./workflowValidator";

class WorkflowEngine {
  createWorkflowInstance(
    workflow: WorkflowDefinition,
    request: Request
  ): WorkflowInstance {
    const validation =
      workflowValidator.validateWorkflow(
        workflow
      );

    if (
      !validation.valid
    ) {
      throw new Error(
        validation.errors.join(
          ", "
        )
      );
    }

    const firstStage =
      workflowStageResolver.getFirstStage(
        workflow
      );

    if (!firstStage) {
      throw new Error(
        "Workflow contains no stages."
      );
    }

    const executions: WorkflowStageExecution[] =
      workflow.stages.map(
        (stage) => ({
          stageId:
            stage.id,
          status:
            stage.id ===
            firstStage.id
              ? "READY"
              : "PENDING",
        })
      );

    const metrics: WorkflowMetrics =
      {
        totalStages:
          workflow.stages.length,

        completedStages: 0,

        pendingStages:
          workflow.stages.length,

        blockedStages: 0,

        failedStages: 0,

        completionPercentage: 0,

        totalTatHours:
          workflowStageResolver.calculateWorkflowTat(
            workflow
          ),

        elapsedHours: 0,

        breached: false,
      };

    return {
      id: crypto.randomUUID(),

      workflowId:
        workflow.id,

      requestId:
        request.id,

      request,

      status: "ACTIVE",

      currentStageId:
        firstStage.id,

      nextStageId:
        workflowStageResolver.getNextStage(
          workflow,
          firstStage.id
        )?.id,

      executions,

      metrics,

      startedAt:
        new Date().toISOString(),
    };
  }

  createExecutionEvent(
    workflowInstanceId: string,
    workflowId: string,
    stageId: string,
    eventType: string,
    payload?: Record<
      string,
      unknown
    >
  ): WorkflowExecutionEvent {
    return {
      id: crypto.randomUUID(),

      workflowInstanceId,

      workflowId,

      stageId,

      eventType,

      timestamp:
        new Date().toISOString(),

      payload,
    };
  }

  recalculateMetrics(
    instance: WorkflowInstance
  ): WorkflowMetrics {
    const completed =
      instance.executions.filter(
        (execution) =>
          execution.status ===
          "COMPLETED"
      ).length;

    const failed =
      instance.executions.filter(
        (execution) =>
          execution.status ===
          "FAILED"
      ).length;

    const blocked =
      instance.executions.filter(
        (execution) =>
          execution.status ===
          "BLOCKED"
      ).length;

    const pending =
      instance.executions.filter(
        (execution) =>
          execution.status ===
            "PENDING" ||
          execution.status ===
            "READY" ||
          execution.status ===
            "IN_PROGRESS"
      ).length;

    return {
      ...instance.metrics,

      completedStages:
        completed,

      failedStages:
        failed,

      blockedStages:
        blocked,

      pendingStages:
        pending,

      completionPercentage:
        Math.round(
          (completed /
            instance.metrics
              .totalStages) *
            100
        ),
    };
  }
}

export const workflowEngine =
  new WorkflowEngine();

export default workflowEngine;