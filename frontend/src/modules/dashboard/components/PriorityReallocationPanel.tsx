//src/modules/dashboard/components/PriorityReallocationPanel.tsx

import { priorityReallocationMatrix }
  from "../services/priorityReallocationMatrix";

export default function PriorityReallocationPanel() {
  const allocation =
    priorityReallocationMatrix.optimize(32);

  return (
    <div className="dashboard-card rounded-xl shadow p-5">
      <h2 className="font-semibold text-lg mb-4">
        Priority Reallocation
      </h2>

      <div className="space-y-2">
        <p>{allocation.resourceShift}</p>
        <p>Urgency Boost: {allocation.urgencyBoost}%</p>
      </div>
    </div>
  );
}