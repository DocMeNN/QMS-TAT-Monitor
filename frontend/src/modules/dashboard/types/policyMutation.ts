//src/modules/dashboard/types/policyMutation.ts

export interface MutationPolicy {
  id: string;
  name: string;
  threshold: number;
  preferredStrategy: string;
  confidence: number;
  version: number;
  mutatedAt: number;
}

export interface MutationDecision {
  previousPolicy: MutationPolicy;
  mutatedPolicy: MutationPolicy;
  reason: string;
}