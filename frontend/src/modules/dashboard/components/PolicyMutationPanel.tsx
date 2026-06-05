//src/modules/dashboard/components/PolicyMutationPanel.tsx

import { policyMutationEngine }
  from "../services/policyMutationEngine";

export default function PolicyMutationPanel() {
  const policy =
    policyMutationEngine.getPolicy();

  return (
    <div className="dashboard-card">
      <h3>
        Autonomous Policy Mutation
      </h3>

      <div>
        Version: {policy.version}
      </div>

      <div>
        Threshold: {policy.threshold}
      </div>

      <div>
        Preferred Strategy:
        {policy.preferredStrategy}
      </div>

      <div>
        Confidence:
        {policy.confidence.toFixed(1)}%
      </div>
    </div>
  );
}