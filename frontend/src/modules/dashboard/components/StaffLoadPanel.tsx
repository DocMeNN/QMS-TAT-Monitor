// src/modules/dashboard/components/StaffLoadPanel.tsx

import type {
  StaffLoad,
} from "../types/operational.types";

interface Props {
  staff: StaffLoad[];
}

export function StaffLoadPanel({
  staff,
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
        Staff Workload
      </h3>

      <div
        className="
          grid
          md:grid-cols-2
          gap-4
        "
      >
        {staff.map(
          (
            member
          ) => (
            <div
              key={
                member.id
              }
              className="
                border
                rounded-lg
                p-3
              "
            >
              <div
                className="
                  font-medium
                "
              >
                {
                  member.name
                }
              </div>

              <div>
                {
                  member.department
                }
              </div>

              <div>
                Cases:
                {" "}
                {
                  member.assignedCases
                }
              </div>

              <div>
                Capacity:
                {" "}
                {
                  member.capacity
                }
              </div>

              <div>
                Utilization:
                {" "}
                {
                  member.utilization
                }
                %
              </div>

              <div>
                {
                  member.status
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default
  StaffLoadPanel;