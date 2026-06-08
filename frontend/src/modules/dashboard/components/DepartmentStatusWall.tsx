// src/modules/dashboard/components/DepartmentStatusWall.tsx

import {
  useOperationalStore,
} from "../store/operationalStore";

export function DepartmentStatusWall() {
  const queues =
    useOperationalStore(
      (state) =>
        state.snapshot
          .queues
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
        Department Status Wall
      </h2>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
        {queues.map(
          (
            queue
          ) => (
            <div
              key={
                queue.id
              }
              className="
                border
                rounded-lg
                p-4
              "
            >
              <div
                className="
                  font-semibold
                "
              >
                {
                  queue.department
                }
              </div>

              <div>
                Active:
                {" "}
                {
                  queue.activeRequests
                }
              </div>

              <div>
                Utilization:
                {" "}
                {
                  queue.utilization
                }
                %
              </div>

              <div>
                Status:
                {" "}
                {
                  queue.status
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DepartmentStatusWall;