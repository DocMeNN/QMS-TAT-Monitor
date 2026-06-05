//src/modules/dashboard/services/metaGovernanceEngine.ts

import type { GovernanceAudit }
  from "../types/metaGovernance";

import { policyMutationEngine }
  from "./policyMutationEngine";

class MetaGovernanceEngine {
  private audits: GovernanceAudit[] = [];

  validate(): GovernanceAudit {
    const policy =
      policyMutationEngine.getPolicy();

    const riskScore =
      Math.max(0, 100 - policy.confidence);

    const approved =
      policy.confidence >= 70 &&
      policy.threshold >= 70;

    const audit: GovernanceAudit = {
      id: crypto.randomUUID(),
      policyVersion: policy.version,
      approved,
      riskScore,
      reason: approved
        ? "Mutation approved"
        : "Mutation rejected",
      auditedAt: Date.now()
    };

    this.audits.unshift(audit);

    if (this.audits.length > 50) {
      this.audits.pop();
    }

    return audit;
  }

  latest() {
    return this.audits[0];
  }

  getAudits() {
    return this.audits;
  }
}

export const metaGovernanceEngine =
  new MetaGovernanceEngine();