// src/modules/dashboard/components/WorkflowOperationsBoard.tsx

import {
  useWorkflowStore,
} from "../../workflow-management/store/workflowStore";

export function WorkflowOperationsBoard() {
  const workflows =
    useWorkflowStore(
      (state) =>
        state.workflowInstances
    );

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
      "
    >
      <h2
        className="
          text-lg
          font-bold
          mb-4
        "
      >
        Workflow Operations Board
      </h2>

      <div
        className="
          overflow-auto
        "
      >
        <table
          className="
            w-full
            text-sm
          "
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Stage</th>
              <th>Progress</th>
              <th>Breach</th>
            </tr>
          </thead>

          <tbody>
            {workflows.map(
              (
                workflow
              ) => (
                <tr
                  key={
                    workflow.id
                  }
                >
                  <td>
                    {
                      workflow.id.slice(
                        0,
                        8
                      )
                    }
                  </td>

                  <td>
                    {
                      workflow.status
                    }
                  </td>

                  <td>
                    {
                      workflow.currentStageId
                    }
                  </td>

                  <td>
                    {
                      workflow.metrics
                        .completionPercentage
                    }
                    %
                  </td>

                  <td>
                    {workflow.metrics
                      .breached
                      ? "YES"
                      : "NO"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkflowOperationsBoard;