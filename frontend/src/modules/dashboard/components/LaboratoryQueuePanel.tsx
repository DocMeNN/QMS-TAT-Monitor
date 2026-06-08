// src/modules/dashboard/components/LaboratoryQueuePanel.tsx

import type {
  LaboratoryQueue,
} from "../types/operational.types";

interface Props {
  queues:
    LaboratoryQueue[];
}

export function LaboratoryQueuePanel({
  queues,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        p-4
        bg-white
      "
    >
      <h3
        className="
          text-lg
          font-semibold
          mb-4
        "
      >
        Laboratory Queues
      </h3>

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
              <th>
                Department
              </th>

              <th>
                Active
              </th>

              <th>
                Completed
              </th>

              <th>
                Breached
              </th>

              <th>
                Utilization
              </th>

              <th>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {queues.map(
              (
                queue
              ) => (
                <tr
                  key={
                    queue.id
                  }
                >
                  <td>
                    {
                      queue.department
                    }
                  </td>

                  <td>
                    {
                      queue.activeRequests
                    }
                  </td>

                  <td>
                    {
                      queue.completedToday
                    }
                  </td>

                  <td>
                    {
                      queue.breachedToday
                    }
                  </td>

                  <td>
                    {
                      queue.utilization
                    }
                    %
                  </td>

                  <td>
                    {
                      queue.status
                    }
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

export default
  LaboratoryQueuePanel;