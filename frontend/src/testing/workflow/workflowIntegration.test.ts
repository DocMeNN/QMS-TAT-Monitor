// testing/workflow/workflowIntegration.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { workflowEngine } from "../../modules/workflow-management/services/workflowEngine";
import { workflowRuntime } from "../../modules/workflow-management/services/workflowRuntime";
import { workflowAuditBridge } from "../../modules/workflow-management/services/workflowAuditBridge";
import { workflowTimelineBridge } from "../../modules/workflow-management/services/workflowTimelineBridge";

import type {
  WorkflowDefinition,
} from "../../modules/workflow-management/types/workflow.types";

import type {
  Request,
} from "../../modules/data-entry/types/request.types";

const workflow: WorkflowDefinition = {
  id: "wf-int",
  code: "INT",
  name: "Integration Workflow",
  department: "HAEMATOLOGY",
  description: "",
  version: 1,
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
  stages: [
    {
      id: "s1",
      name: "Reception",
      order: 1,
      tatHours: 1,
      mandatory: true,
    },
  ],
  transitions: [],
};

const request: Request = {
  id: "req-int",
  title: "Integration",
  department: "HAEMATOLOGY",
  category: "TEST",
  priority: "HIGH",
  slaHours: 4,
  owner: "Owner",
  status: "SUBMITTED",
  createdAt: "",
};

describe(
  "Workflow Integration Certification",
  () => {
    it(
      "integrates workflow runtime audit and timeline",
      () => {
        const instance =
          workflowEngine.createWorkflowInstance(
            workflow,
            request
          );

        const event =
          workflowEngine.createExecutionEvent(
            instance.id,
            workflow.id,
            "s1",
            "WORKFLOW_STARTED"
          );

        const audit =
          workflowAuditBridge.recordWorkflowEvent(
            instance,
            event
          );

        const history =
          workflowTimelineBridge.createTimelineRecord(
            event
          );

        expect(
          audit.id
        ).toBe(
          event.id
        );

        expect(
          history.eventType
        ).toBe(
          "ACTION_EXECUTED"
        );

        const started =
          workflowRuntime.startStage(
            instance,
            "s1"
          );

        expect(
          started.executions[0]
            .status
        ).toBe(
          "IN_PROGRESS"
        );
      }
    );
  }
);