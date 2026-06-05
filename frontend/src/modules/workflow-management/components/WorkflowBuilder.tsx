// src/modules/workflow-management/components/WorkflowBuilder.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowBuilder() {
  const workflows = useWorkflowStore(
    (state) => state.workflows
  );

  const totalStages = useMemo(
    () =>
      workflows.reduce(
        (total, workflow) =>
          total +
          workflow.stages.length,
        0
      ),
    [workflows]
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Builder
        </h2>

        <p className="text-sm text-gray-500">
          Configure and manage
          laboratory workflow
          definitions.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded border p-3">
          <div className="text-xs text-gray-500">
            Workflows
          </div>

          <div className="text-2xl font-bold">
            {workflows.length}
          </div>
        </div>

        <div className="rounded border p-3">
          <div className="text-xs text-gray-500">
            Stages
          </div>

          <div className="text-2xl font-bold">
            {totalStages}
          </div>
        </div>

        <div className="rounded border p-3">
          <div className="text-xs text-gray-500">
            Active
          </div>

          <div className="text-2xl font-bold">
            {
              workflows.filter(
                (workflow) =>
                  workflow.status ===
                  "ACTIVE"
              ).length
            }
          </div>
        </div>
      </div>
    </div>
  );
}