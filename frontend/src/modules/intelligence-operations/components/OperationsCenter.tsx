// src/modules/intelligence-operations/components/OperationsCenter.tsx

import {
  OperationsMetricsCard,
} from "./OperationsMetricsCard";

import {
  OperationsQueue,
} from "./OperationsQueue";

import {
  OperationsExecutionPanel,
} from "./OperationsExecutionPanel";

import {
  OperationsActivityFeed,
} from "./OperationsActivityFeed";

import {
  useOperationsDashboard,
} from "../hooks/useOperationsDashboard";

export function OperationsCenter() {
  const {
    metrics,
  } =
    useOperationsDashboard();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <OperationsMetricsCard
          title="Total"
          value={
            metrics.total
          }
        />

        <OperationsMetricsCard
          title="Completed"
          value={
            metrics.completed
          }
        />

        <OperationsMetricsCard
          title="Running"
          value={
            metrics.running
          }
        />

        <OperationsMetricsCard
          title="Failed"
          value={
            metrics.failed
          }
        />

        <OperationsMetricsCard
          title="Critical"
          value={
            metrics.critical
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <OperationsQueue />

        <OperationsExecutionPanel />

        <OperationsActivityFeed />
      </div>
    </div>
  );
}

export default OperationsCenter;