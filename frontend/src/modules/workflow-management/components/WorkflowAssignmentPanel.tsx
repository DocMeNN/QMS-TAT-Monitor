// src/modules/workflow-management/components/WorkflowAssignmentPanel.tsx

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowAssignmentPanel() {
  const assignments =
    useWorkflowStore(
      (state) =>
        state.assignments
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Workflow Assignments
      </h2>

      <div className="space-y-3">
        {assignments.map(
          (assignment) => (
            <div
              key={`${assignment.workflowInstanceId}-${assignment.stageId}`}
              className="rounded border p-3"
            >
              <div className="font-medium">
                {
                  assignment.assignedUser
                }
              </div>

              <div className="text-sm text-gray-500">
                {
                  assignment.assignedRole
                }
              </div>

              <div className="text-xs text-gray-500">
                {
                  assignment.assignedDepartment
                }
              </div>
            </div>
          )
        )}

        {assignments.length ===
          0 && (
          <div className="text-sm text-gray-500">
            No assignments
            available.
          </div>
        )}
      </div>
    </div>
  );
}