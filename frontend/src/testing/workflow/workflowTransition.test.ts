// testing/workflow/workflowTransition.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { workflowTransitionEngine } from "../../modules/workflow-management/services/workflowTransitionEngine";

import type {
  WorkflowDefinition,
} from "../../modules/workflow-management/types/workflow.types";

const workflow: WorkflowDefinition = {
  id: "wf",
  code: "WF",
  name: "Transition Workflow",
  department: "HAEMATOLOGY",
  description: "",
  version: 1,
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
  stages: [
    {
      id: "s1",
      name: "A",
      order: 1,
      tatHours: 1,
      mandatory: true,
    },
    {
      id: "s2",
      name: "B",
      order: 2,
      tatHours: 1,
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

describe(
  "Workflow Transition Certification",
  () => {
    it(
      "validates transitions",
      () => {
        expect(
          workflowTransitionEngine.canTransition(
            workflow,
            "s1",
            "s2"
          )
        ).toBe(true);
      }
    );

    it(
      "resolves next stage",
      () => {
        const next =
          workflowTransitionEngine.resolveNextStage(
            workflow,
            "s1"
          );

        expect(
          next?.id
        ).toBe("s2");
      }
    );
  }
);