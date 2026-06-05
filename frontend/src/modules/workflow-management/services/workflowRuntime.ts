// src/modules/workflow-management/services/workflowRuntime.ts

import type {
  WorkflowDefinition,
  WorkflowInstance,
  WorkflowMetrics,
  WorkflowStageExecution,
  WorkflowStageStatus,
} from "../types/workflow.types";

import {
  workflowEngine,
} from "./workflowEngine";

import {
  workflowStageResolver,
} from "./workflowStageResolver";

export interface StageTransitionResult {
  success: boolean;
  message: string;
  workflow: WorkflowInstance;
}

class WorkflowRuntime {
  startStage(
    workflow: WorkflowInstance,
    stageId: string
  ): WorkflowInstance {
    const executions =
      workflow.executions.map(
        (execution) => {
          if (
            execution.stageId ===
            stageId
          ) {
            return {
              ...execution,
              status:
                "IN_PROGRESS" as WorkflowStageStatus,
              startedAt:
                execution.startedAt ??
                new Date().toISOString(),
            };
          }

          return execution;
        }
      );

    const updated =
      this.applyUpdates(
        workflow,
        executions
      );

    return updated;
  }

  completeStage(
    workflow: WorkflowInstance,
    workflowDefinition: WorkflowDefinition,
    stageId: string,
    comments?: string
  ): StageTransitionResult {
    const execution =
      workflow.executions.find(
        (item) =>
          item.stageId ===
          stageId
      );

    if (!execution) {
      return {
        success: false,
        message:
          "Stage execution not found.",
        workflow,
      };
    }

    const completedAt =
      new Date().toISOString();

    const durationMinutes =
      execution.startedAt
        ? Math.max(
            0,
            Math.round(
              (new Date(
                completedAt
              ).getTime() -
                new Date(
                  execution.startedAt
                ).getTime()) /
                60000
            )
          )
        : 0;

    const executions =
      workflow.executions.map(
        (item) => {
          if (
            item.stageId ===
            stageId
          ) {
            return {
              ...item,
              status:
                "COMPLETED" as WorkflowStageStatus,
              completedAt,
              durationMinutes,
              comments,
            };
          }

          return item;
        }
      );

    const nextStage =
      workflowStageResolver.getNextStage(
        workflowDefinition,
        stageId
      );

    let updatedExecutions =
      executions;

    if (nextStage) {
      updatedExecutions =
        executions.map(
          (item) => {
            if (
              item.stageId ===
                nextStage.id &&
              item.status ===
                "PENDING"
            ) {
              return {
                ...item,
                status:
                  "READY" as WorkflowStageStatus,
              };
            }

            return item;
          }
        );
    }

    const updatedWorkflow =
      this.applyUpdates(
        {
          ...workflow,
          previousStageId:
            stageId,
          currentStageId:
            nextStage?.id ??
            stageId,
          nextStageId:
            nextStage
              ? workflowStageResolver.getNextStage(
                  workflowDefinition,
                  nextStage.id
                )?.id
              : undefined,
        },
        updatedExecutions
      );

    if (!nextStage) {
      return {
        success: true,
        message:
          "Workflow completed successfully.",
        workflow:
          this.completeWorkflow(
            updatedWorkflow
          ),
      };
    }

    return {
      success: true,
      message:
        "Stage completed successfully.",
      workflow:
        updatedWorkflow,
    };
  }

  blockStage(
    workflow: WorkflowInstance,
    stageId: string,
    comments?: string
  ): WorkflowInstance {
    const executions =
      workflow.executions.map(
        (execution) => {
          if (
            execution.stageId ===
            stageId
          ) {
            return {
              ...execution,
              status:
                "BLOCKED" as WorkflowStageStatus,
              comments,
            };
          }

          return execution;
        }
      );

    return this.applyUpdates(
      workflow,
      executions
    );
  }

  failStage(
    workflow: WorkflowInstance,
    stageId: string,
    comments?: string
  ): WorkflowInstance {
    const executions =
      workflow.executions.map(
        (execution) => {
          if (
            execution.stageId ===
            stageId
          ) {
            return {
              ...execution,
              status:
                "FAILED" as WorkflowStageStatus,
              comments,
            };
          }

          return execution;
        }
      );

    return this.applyUpdates(
      workflow,
      executions
    );
  }

  skipStage(
    workflow: WorkflowInstance,
    stageId: string,
    comments?: string
  ): WorkflowInstance {
    const executions =
      workflow.executions.map(
        (execution) => {
          if (
            execution.stageId ===
            stageId
          ) {
            return {
              ...execution,
              status:
                "SKIPPED" as WorkflowStageStatus,
              comments,
            };
          }

          return execution;
        }
      );

    return this.applyUpdates(
      workflow,
      executions
    );
  }

  pauseWorkflow(
    workflow: WorkflowInstance
  ): WorkflowInstance {
    return {
      ...workflow,
      status: "PAUSED",
    };
  }

  resumeWorkflow(
    workflow: WorkflowInstance
  ): WorkflowInstance {
    return {
      ...workflow,
      status: "ACTIVE",
    };
  }

  cancelWorkflow(
    workflow: WorkflowInstance
  ): WorkflowInstance {
    return {
      ...workflow,
      status:
        "CANCELLED",
      completedAt:
        new Date().toISOString(),
    };
  }

  detectTatBreach(
    workflow: WorkflowInstance
  ): boolean {
    const started =
      new Date(
        workflow.startedAt
      ).getTime();

    const elapsedHours =
      (Date.now() -
        started) /
      1000 /
      60 /
      60;

    return (
      elapsedHours >
      workflow.metrics
        .totalTatHours
    );
  }

  getCurrentExecution(
    workflow: WorkflowInstance
  ):
    | WorkflowStageExecution
    | undefined {
    return workflow.executions.find(
      (execution) =>
        execution.stageId ===
        workflow.currentStageId
    );
  }

  private completeWorkflow(
    workflow: WorkflowInstance
  ): WorkflowInstance {
    return {
      ...workflow,
      status:
        "COMPLETED",
      completedAt:
        new Date().toISOString(),
    };
  }

  private applyUpdates(
    workflow: WorkflowInstance,
    executions: WorkflowStageExecution[]
  ): WorkflowInstance {
    const recalculated =
      workflowEngine.recalculateMetrics(
        {
          ...workflow,
          executions,
        }
      );

    const started =
      new Date(
        workflow.startedAt
      ).getTime();

    const elapsedHours =
      Number(
        (
          (Date.now() -
            started) /
          1000 /
          60 /
          60
        ).toFixed(2)
      );

    const metrics: WorkflowMetrics =
      {
        ...recalculated,
        elapsedHours,
        breached:
          elapsedHours >
          recalculated.totalTatHours,
      };

    return {
      ...workflow,
      executions,
      metrics,
    };
  }
}

export const workflowRuntime =
  new WorkflowRuntime();

export default workflowRuntime;