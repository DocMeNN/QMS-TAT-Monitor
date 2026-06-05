// src/modules/executive-command-center/components/ExecutiveCommandCenter.tsx

import ExecutiveOverviewPanel from "./ExecutiveOverviewPanel";
import ExecutiveKPIWall from "./ExecutiveKPIWall";
import LiveIntelligenceFeed from "./LiveIntelligenceFeed";
import AutonomousCommandGrid from "./AutonomousCommandGrid";

export default function ExecutiveCommandCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Executive Command Center
        </h1>

        <p className="text-sm text-gray-500">
          Autonomous Intelligence Operations Platform
        </p>
      </div>

      <ExecutiveOverviewPanel />

      <ExecutiveKPIWall />

      <LiveIntelligenceFeed />

      <AutonomousCommandGrid />
    </div>
  );
}