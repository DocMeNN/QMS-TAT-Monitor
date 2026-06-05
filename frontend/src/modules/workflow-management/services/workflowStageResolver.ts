// src/modules/workflow-management/services/workflowStageResolver.ts

import type {
  WorkflowDefinition,
  WorkflowStage,
} from "../types/workflow.types";

class WorkflowStageResolver {
  getFirstStage(
    workflow: WorkflowDefinition
  ): WorkflowStage | undefined {
    return [
      ...workflow.stages,
    ].sort(
      (a, b) =>
        a.order - b.order
    )[0];
  }

  getLastStage(
    workflow: WorkflowDefinition
  ): WorkflowStage | undefined {
    return [
      ...workflow.stages,
    ].sort(
      (a, b) =>
        b.order - a.order
    )[0];
  }

  getStageById(
    workflow: WorkflowDefinition,
    stageId: string
  ): WorkflowStage | undefined {
    return workflow.stages.find(
      (stage) =>
        stage.id === stageId
    );
  }

  getNextStage(
    workflow: WorkflowDefinition,
    currentStageId: string
  ): WorkflowStage | undefined {
    const current =
      this.getStageById(
        workflow,
        currentStageId
      );

    if (!current) {
      return undefined;
    }

    return workflow.stages.find(
      (stage) =>
        stage.order ===
        current.order + 1
    );
  }

  getPreviousStage(
    workflow: WorkflowDefinition,
    currentStageId: string
  ): WorkflowStage | undefined {
    const current =
      this.getStageById(
        workflow,
        currentStageId
      );

    if (!current) {
      return undefined;
    }

    return workflow.stages.find(
      (stage) =>
        stage.order ===
        current.order - 1
    );
  }

  calculateWorkflowTat(
    workflow: WorkflowDefinition
  ): number {
    return workflow.stages.reduce(
      (total, stage) =>
        total +
        stage.tatHours,
      0
    );
  }
}

export const workflowStageResolver =
  new WorkflowStageResolver();

export default workflowStageResolver;