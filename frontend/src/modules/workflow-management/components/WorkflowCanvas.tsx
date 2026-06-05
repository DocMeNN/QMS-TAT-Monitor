// src/modules/workflow-management/components/WorkflowCanvas.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowCanvas() {
  const workflows = useWorkflowStore(
    (state) => state.workflows
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Workflow Canvas
      </h2>

      <div className="space-y-4">
        {workflows.map(
          (workflow) => (
            <div
              key={workflow.id}
              className="overflow-auto rounded border p-3"
            >
              <div className="mb-3 font-medium">
                {workflow.name}
              </div>

              <div className="flex gap-3">
                {workflow.stages.map(
                  (stage) => (
                    <div
                      key={stage.id}
                      className="min-w-[180px] rounded border p-2"
                    >
                      <div className="font-medium">
                        {stage.name}
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
            </div>
          )
        )}
      </div>
    </div>
  );
}