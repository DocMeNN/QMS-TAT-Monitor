// testing/workflow/workflowExecution.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { workflowExecutionTracker } from "../../modules/workflow-management/services/workflowExecutionTracker";
import { workflowEngine } from "../../modules/workflow-management/services/workflowEngine";

import type {
  WorkflowDefinition,
} from "../../modules/workflow-management/types/workflow.types";

import type {
  Request,
} from "../../modules/data-entry/types/request.types";

const workflow: WorkflowDefinition = {
  id: "wf-track",
  code: "TRACK",
  name: "Tracker",
  department: "HAEMATOLOGY",
  description: "",
  version: 1,
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
  stages: [
    {
      id: "s1",
      name: "Analysis",
      order: 1,
      tatHours: 1,
      mandatory: true,
    },
  ],
  transitions: [],
};

const request: Request = {
  id: "r1",
  title: "Request",
  department: "HAEMATOLOGY",
  category: "TEST",
  priority: "LOW",
  slaHours: 2,
  owner: "Owner",
  status: "SUBMITTED",
  createdAt: "",
};

describe(
  "Workflow Execution Certification",
  () => {
    it(
      "calculates completion rate",
      () => {
        const instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        expect(
          workflowExecutionTracker.getCompletionRate(
            instance
          )
        ).toBe(0);
      }
    );

    it(
      "detects bottlenecks",
      () => {
        const instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        const bottlenecks =
          workflowExecutionTracker.detectBottlenecks(
            instance,
            workflow
          );

        expect(
          Array.isArray(
            bottlenecks
          )
        ).toBe(true);
      }
    );
  }
);