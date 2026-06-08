// testing/workflow/workflowRuntime.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { workflowRuntime } from "../../modules/workflow-management/services/workflowRuntime";
import { workflowEngine } from "../../modules/workflow-management/services/workflowEngine";

import type {
  WorkflowDefinition,
} from "../../modules/workflow-management/types/workflow.types";

import type {
  Request,
} from "../../modules/data-entry/types/request.types";

const workflow: WorkflowDefinition = {
  id: "wf-runtime",
  code: "WF",
  name: "Runtime Workflow",
  department: "HAEMATOLOGY",
  description: "",
  version: 1,
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  stages: [
    {
      id: "s1",
      name: "Stage 1",
      order: 1,
      tatHours: 1,
      mandatory: true,
    },
    {
      id: "s2",
      name: "Stage 2",
      order: 2,
      tatHours: 1,
      mandatory: true,
    },
  ],
  transitions: [],
};

const request: Request = {
  id: "req-runtime",
  title: "Request",
  department: "HAEMATOLOGY",
  category: "TEST",
  priority: "MEDIUM",
  slaHours: 4,
  owner: "Owner",
  status: "SUBMITTED",
  createdAt: new Date().toISOString(),
};

describe(
  "Workflow Runtime Certification",
  () => {
    it(
      "starts workflow stage",
      () => {
        const instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        const updated =
          workflowRuntime.startStage(
            instance,
            "s1"
          );

        expect(
          updated.executions[0]
            .status
        ).toBe(
          "IN_PROGRESS"
        );
      }
    );

    it(
      "completes workflow stage",
      () => {
        let instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        instance =
          workflowRuntime.startStage(
            instance,
            "s1"
          );

        const result =
          workflowRuntime.completeStage(
            instance,
            workflow,
            "s1"
          );

        expect(
          result.success
        ).toBe(true);

        expect(
          result.workflow
            .executions[0]
            .status
        ).toBe(
          "COMPLETED"
        );
      }
    );
  }
);