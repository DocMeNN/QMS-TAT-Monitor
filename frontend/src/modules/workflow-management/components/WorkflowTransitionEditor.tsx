// src/modules/workflow-management/components/WorkflowTransitionEditor.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowTransitionEditor() {
  const workflows = useWorkflowStore(
    (state) => state.workflows
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Workflow Transition Editor
      </h2>

      <div className="space-y-4">
        {workflows.map(
          (workflow) => (
            <div
              key={workflow.id}
              className="rounded border p-3"
            >
              <div className="mb-3 font-medium">
                {workflow.name}
              </div>

              {workflow.transitions.map(
                (
                  transition
                ) => (
                  <div
                    key={
                      transition.id
                    }
                    className="mb-2 rounded border p-2 text-sm"
                  >
                    {
                      transition.fromStageId
                    }{" "}
                    →
                    {
                      transition.toStageId
                    }
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