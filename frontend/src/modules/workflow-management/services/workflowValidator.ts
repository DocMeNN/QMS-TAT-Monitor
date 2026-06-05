// src/modules/workflow-management/services/workflowValidator.ts

import type {
  WorkflowDefinition,
  WorkflowStage,
  WorkflowTransition,
} from "../types/workflow.types";

export interface WorkflowValidationResult {
  valid: boolean;
  errors: string[];
}

class WorkflowValidator {
  validateWorkflow(
    workflow: WorkflowDefinition
  ): WorkflowValidationResult {
    const errors: string[] = [];

    if (!workflow.id.trim()) {
      errors.push(
        "Workflow id is required."
      );
    }

    if (!workflow.name.trim()) {
      errors.push(
        "Workflow name is required."
      );
    }

    if (
      workflow.stages.length === 0
    ) {
      errors.push(
        "Workflow must contain at least one stage."
      );
    }

    errors.push(
      ...this.validateStages(
        workflow.stages
      )
    );

    errors.push(
      ...this.validateTransitions(
        workflow.stages,
        workflow.transitions
      )
    );

    return {
      valid:
        errors.length === 0,
      errors,
    };
  }

  private validateStages(
    stages: WorkflowStage[]
  ): string[] {
    const errors: string[] = [];

    const ids = new Set<string>();

    stages.forEach((stage) => {
      if (
        ids.has(stage.id)
      ) {
        errors.push(
          `Duplicate stage id: ${stage.id}`
        );
      }

      ids.add(stage.id);

      if (
        stage.tatHours < 0
      ) {
        errors.push(
          `${stage.name} contains invalid TAT value`
        );
      }
    });

    return errors;
  }

  private validateTransitions(
    stages: WorkflowStage[],
    transitions: WorkflowTransition[]
  ): string[] {
    const errors: string[] = [];

    const stageIds =
      new Set(
        stages.map(
          (stage) =>
            stage.id
        )
      );

    transitions.forEach(
      (transition) => {
        if (
          !stageIds.has(
            transition.fromStageId
          )
        ) {
          errors.push(
            `Unknown source stage: ${transition.fromStageId}`
          );
        }

        if (
          !stageIds.has(
            transition.toStageId
          )
        ) {
          errors.push(
            `Unknown target stage: ${transition.toStageId}`
          );
        }
      }
    );

    return errors;
  }
}

export const workflowValidator =
  new WorkflowValidator();

export default workflowValidator;