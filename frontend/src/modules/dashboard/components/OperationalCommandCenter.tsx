// src/modules/dashboard/components/OperationalCommandCenter.tsx

import {
  OperationalHealthPanel,
} from "./OperationalHealthPanel";

import {
  DepartmentStatusWall,
} from "./DepartmentStatusWall";

import {
  WorkflowOperationsBoard,
} from "./WorkflowOperationsBoard";

import {
  LiveExecutionFeed,
} from "./LiveExecutionFeed";

import {
  TatRiskRadar,
} from "./TatRiskRadar";

export function OperationalCommandCenter() {
  return (
    <div
      className="
        grid
        gap-6
      "
    >
      <OperationalHealthPanel />

      <DepartmentStatusWall />

      <WorkflowOperationsBoard />

      <TatRiskRadar />

      <LiveExecutionFeed />
    </div>
  );
}

export default OperationalCommandCenter;