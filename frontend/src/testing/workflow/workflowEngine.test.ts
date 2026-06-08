// testing/workflow/workflowEngine.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { workflowEngine } from "../../modules/workflow-management/services/workflowEngine";

import type {
  WorkflowDefinition,
} from "../../modules/workflow-management/types/workflow.types";

import type {
  Request,
} from "../../modules/data-entry/types/request.types";

const workflow: WorkflowDefinition = {
  id: "wf-1",
  code: "HAEM-001",
  name: "Haematology Workflow",
  department: "HAEMATOLOGY",
  description: "Test Workflow",
  version: 1,
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  stages: [
    {
      id: "s1",
      name: "Reception",
      order: 1,
      tatHours: 2,
      mandatory: true,
    },
    {
      id: "s2",
      name: "Analysis",
      order: 2,
      tatHours: 4,
      mandatory: true,
    },
  ],
  transitions: [
    {
      id: "t1",
      fromStageId: "s1",
      toStageId: "s2",
      type: "SEQUENTIAL",
    },
  ],
};

const request: Request = {
  id: "req-1",
  title: "CBC",
  department: "HAEMATOLOGY",
  category: "ROUTINE",
  priority: "HIGH",
  slaHours: 8,
  owner: "Scientist",
  status: "SUBMITTED",
  createdAt: new Date().toISOString(),
};

describe(
  "Workflow Engine Certification",
  () => {
    it(
      "creates workflow instance",
      () => {
        const instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        expect(
          instance.workflowId
        ).toBe("wf-1");

        expect(
          instance.currentStageId
        ).toBe("s1");

        expect(
          instance.executions.length
        ).toBe(2);
      }
    );

    it(
      "creates execution events",
      () => {
        const event =
          workflowEngine.createExecutionEvent(
            "instance",
            "workflow",
            "stage",
            "STARTED"
          );

        expect(
          event.id
        ).toBeTruthy();

        expect(
          event.eventType
        ).toBe("STARTED");
      }
    );
  }
);