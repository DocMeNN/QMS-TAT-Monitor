// src/modules/workflow-management/components/WorkflowDashboard.tsx

import WorkflowExecutionPanel from "./WorkflowExecutionPanel";
import WorkflowMetricsPanel from "./WorkflowMetricsPanel";
import WorkflowRuntimeMonitor from "./WorkflowRuntimeMonitor";

export default function WorkflowDashboard() {
  return (
    <div className="space-y-6">
      <WorkflowMetricsPanel />

      <div className="grid gap-6 lg:grid-cols-2">
        <WorkflowRuntimeMonitor />

        <WorkflowExecutionPanel />
      </div>
    </div>
  );
}