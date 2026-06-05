// src/modules/workflow-management/store/workflowStore.ts

import { create } from "zustand";

import type {
  WorkflowAssignment,
  WorkflowBottleneck,
  WorkflowDefinition,
  WorkflowExecutionEvent,
  WorkflowInstance,
} from "../types/workflow.types";

interface WorkflowStoreState {
  workflows: WorkflowDefinition[];

  workflowInstances: WorkflowInstance[];

  assignments: WorkflowAssignment[];

  bottlenecks: WorkflowBottleneck[];

  executionEvents: WorkflowExecutionEvent[];

  addWorkflow: (
    workflow: WorkflowDefinition
  ) => void;

  updateWorkflow: (
    workflowId: string,
    updates: Partial<WorkflowDefinition>
  ) => void;

  removeWorkflow: (
    workflowId: string
  ) => void;

  addWorkflowInstance: (
    instance: WorkflowInstance
  ) => void;

  updateWorkflowInstance: (
    instanceId: string,
    updates: Partial<WorkflowInstance>
  ) => void;

  addAssignment: (
    assignment: WorkflowAssignment
  ) => void;

  addBottleneck: (
    bottleneck: WorkflowBottleneck
  ) => void;

  addExecutionEvent: (
    event: WorkflowExecutionEvent
  ) => void;

  clearWorkflowData: () => void;
}

export const useWorkflowStore =
  create<WorkflowStoreState>(
    (set) => ({
      workflows: [],

      workflowInstances: [],

      assignments: [],

      bottlenecks: [],

      executionEvents: [],

      addWorkflow: (
        workflow
      ) =>
        set((state) => ({
          workflows: [
            workflow,
            ...state.workflows,
          ],
        })),

      updateWorkflow: (
        workflowId,
        updates
      ) =>
        set((state) => ({
          workflows:
            state.workflows.map(
              (workflow) =>
                workflow.id ===
                workflowId
                  ? {
                      ...workflow,
                      ...updates,
                      updatedAt:
                        new Date().toISOString(),
                    }
                  : workflow
            ),
        })),

      removeWorkflow: (
        workflowId
      ) =>
        set((state) => ({
          workflows:
            state.workflows.filter(
              (workflow) =>
                workflow.id !==
                workflowId
            ),
        })),

      addWorkflowInstance: (
        instance
      ) =>
        set((state) => ({
          workflowInstances: [
            instance,
            ...state.workflowInstances,
          ],
        })),

      updateWorkflowInstance: (
        instanceId,
        updates
      ) =>
        set((state) => ({
          workflowInstances:
            state.workflowInstances.map(
              (instance) =>
                instance.id ===
                instanceId
                  ? {
                      ...instance,
                      ...updates,
                    }
                  : instance
            ),
        })),

      addAssignment: (
        assignment
      ) =>
        set((state) => ({
          assignments: [
            assignment,
            ...state.assignments,
          ],
        })),

      addBottleneck: (
        bottleneck
      ) =>
        set((state) => ({
          bottlenecks: [
            bottleneck,
            ...state.bottlenecks,
          ],
        })),

      addExecutionEvent: (
        event
      ) =>
        set((state) => ({
          executionEvents: [
            event,
            ...state.executionEvents,
          ],
        })),

      clearWorkflowData: () =>
        set({
          workflows: [],
          workflowInstances: [],
          assignments: [],
          bottlenecks: [],
          executionEvents: [],
        }),
    })
  );