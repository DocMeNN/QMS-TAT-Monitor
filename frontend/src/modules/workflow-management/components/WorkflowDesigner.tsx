// src/modules/workflow-management/components/WorkflowDesigner.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowDesigner() {
  const workflows = useWorkflowStore(
    (state) => state.workflows
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Workflow Designer
      </h2>

      <div className="space-y-3">
        {workflows.map(
          (workflow) => (
            <div
              key={workflow.id}
              className="rounded border p-3"
            >
              <div className="font-medium">
                {workflow.name}
              </div>

              <div className="text-sm text-gray-500">
                {
                  workflow.department
                }
              </div>

              <div className="mt-2 text-xs">
                {
                  workflow.stages
                    .length
                }{" "}
                stages
              </div>
            </div>
          )
        )}

        {workflows.length ===
          0 && (
          <div className="text-sm text-gray-500">
            No workflows
            available.
          </div>
        )}
      </div>
    </div>
  );
}