//src/modules/dashboard/components/MetaGovernancePanel.tsx

import { metaGovernanceEngine }
  from "../services/metaGovernanceEngine";

export default function MetaGovernancePanel() {
  const audit =
    metaGovernanceEngine.latest();

  if (!audit) {
    return (
      <div className="dashboard-card">
        <h3>Meta Governance</h3>
        <div>No audits yet</div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h3>Meta Governance Oversight</h3>

      <div>
        Policy Version:
        {audit.policyVersion}
      </div>

      <div>
        Approved:
        {audit.approved ? "Yes" : "No"}
      </div>

      <div>
        Risk Score:
        {audit.riskScore.toFixed(1)}
      </div>

      <div>{audit.reason}</div>
    </div>
  );
}