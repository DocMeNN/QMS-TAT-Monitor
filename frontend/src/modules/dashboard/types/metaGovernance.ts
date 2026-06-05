//src/modules/dashboard/types/metaGovernance.ts

export interface GovernanceAudit {
  id: string;
  policyVersion: number;
  approved: boolean;
  riskScore: number;
  reason: string;
  auditedAt: number;
}