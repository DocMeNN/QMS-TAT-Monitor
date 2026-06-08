// src/modules/dashboard/components/RealTimeCommandCenter.tsx

import {
  useLiveOperations,
} from "../hooks/useLiveOperations";

import {
  LiveOperationsTicker,
} from "./LiveOperationsTicker";

import {
  DepartmentStatusWall,
} from "./DepartmentStatusWall";

import {
  WorkflowOperationsBoard,
} from "./WorkflowOperationsBoard";

import {
  AutonomousActivityFeed,
} from "./AutonomousActivityFeed";

import {
  TatRiskRadar,
} from "./TatRiskRadar";

export function RealTimeCommandCenter() {
  useLiveOperations();

  return (
    <div
      className="
        grid
        gap-6
      "
    >
      <LiveOperationsTicker />

      <DepartmentStatusWall />

      <WorkflowOperationsBoard />

      <TatRiskRadar />

      <AutonomousActivityFeed />
    </div>
  );
}

export default
  RealTimeCommandCenter;