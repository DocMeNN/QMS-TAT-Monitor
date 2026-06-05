// src/modules/workflow-management/services/workflowTransitionEngine.ts

import type {
  WorkflowDefinition,
  WorkflowStage,
  WorkflowTransition,
} from "../types/workflow.types";

class WorkflowTransitionEngine {
  getOutgoingTransitions(
    workflow: WorkflowDefinition,
    stageId: string
  ): WorkflowTransition[] {
    return workflow.transitions.filter(
      (transition) =>
        transition.fromStageId ===
        stageId
    );
  }

  getIncomingTransitions(
    workflow: WorkflowDefinition,
    stageId: string
  ): WorkflowTransition[] {
    return workflow.transitions.filter(
      (transition) =>
        transition.toStageId ===
        stageId
    );
  }

  getNextStages(
    workflow: WorkflowDefinition,
    stageId: string
  ): WorkflowStage[] {
    const transitions =
      this.getOutgoingTransitions(
        workflow,
        stageId
      );

    return transitions
      .map(
        (transition) =>
          workflow.stages.find(
            (stage) =>
              stage.id ===
              transition.toStageId
          )
      )
      .filter(
        (
          stage
        ): stage is WorkflowStage =>
          Boolean(stage)
      );
  }

  canTransition(
    workflow: WorkflowDefinition,
    fromStageId: string,
    toStageId: string
  ): boolean {
    return workflow.transitions.some(
      (transition) =>
        transition.fromStageId ===
          fromStageId &&
        transition.toStageId ===
          toStageId
    );
  }

  resolveNextStage(
    workflow: WorkflowDefinition,
    currentStageId: string
  ): WorkflowStage | undefined {
    return this.getNextStages(
      workflow,
      currentStageId
    )[0];
  }
}

export const workflowTransitionEngine =
  new WorkflowTransitionEngine();

export default workflowTransitionEngine;