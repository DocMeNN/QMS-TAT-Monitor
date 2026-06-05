// src/modules/workflow-management/components/WorkflowStageEditor.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowStageEditor() {
  const workflows = useWorkflowStore(
    (state) => state.workflows
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Workflow Stage Editor
      </h2>

      <div className="space-y-4">
        {workflows.map(
          (workflow) => (
            <div
              key={workflow.id}
              className="rounded border p-3"
            >
              <div className="mb-2 font-medium">
                {workflow.name}
              </div>

              {workflow.stages.map(
                (stage) => (
                  <div
                    key={stage.id}
                    className="mb-2 rounded border p-2"
                  >
                    <div>
                      {stage.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Order:{" "}
                      {
                        stage.order
                      }
                    </div>

                    <div className="text-xs text-gray-500">
                      TAT:{" "}
                      {
                        stage.tatHours
                      }{" "}
                      hrs
                    </div>
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}