//src/modules/dashboard/services/policyMutationEngine.ts

import { recoveryLearningEngine }
  from "./recoveryLearningEngine";

import type {
  MutationPolicy,
  MutationDecision
} from "../types/policyMutation";

class PolicyMutationEngine {
  private history: MutationPolicy[] = [];

  private policy: MutationPolicy = {
    id: crypto.randomUUID(),
    name: "Default Resilience Policy",
    threshold: 85,
    preferredStrategy: "reroute_load",
    confidence: 50,
    version: 1,
    mutatedAt: Date.now()
  };

  evaluate(): MutationDecision | null {
    const patterns =
      recoveryLearningEngine.getPatterns();

    if (!patterns.length) {
      return null;
    }

    const best = patterns.sort(
      (a, b) =>
        b.confidenceScore - a.confidenceScore
    )[0];

    if (
      best.strategy !==
      this.policy.preferredStrategy
    ) {
      this.history.push({
        ...this.policy
      });

      const previous = {
        ...this.policy
      };

      this.policy = {
        ...this.policy,
        preferredStrategy:
          best.strategy,
        threshold:
          Math.max(
            70,
            this.policy.threshold - 5
          ),
        confidence:
          best.confidenceScore,
        version:
          this.policy.version + 1,
        mutatedAt: Date.now()
      };

      return {
        previousPolicy: previous,
        mutatedPolicy: this.policy,
        reason:
          "Operational superiority detected"
      };
    }

    return null;
  }

  rollback() {
    const previous =
      this.history.pop();

    if (!previous) {
      return null;
    }

    this.policy = previous;

    return this.policy;
  }

  getPolicy() {
    return this.policy;
  }
}

export const policyMutationEngine =
  new PolicyMutationEngine();