//src/modules/dashboard/services/strategyEvolutionEngine.ts

import { recoveryLearningEngine }
  from "./recoveryLearningEngine";

import { policyMutationEngine }
  from "./policyMutationEngine";

import { metaGovernanceEngine }
  from "./metaGovernanceEngine";

import { rollbackArbitrationEngine }
  from "./rollbackArbitrationEngine";

class StrategyEvolutionEngine {
  select(
    nodeId: string,
    degradationScore: number
  ) {
    policyMutationEngine.evaluate();

    metaGovernanceEngine.validate();

    rollbackArbitrationEngine.evaluate();

    const policy =
      policyMutationEngine.getPolicy();

    const patterns =
      recoveryLearningEngine.getPatterns();

    const selected =
      patterns.find(
        p =>
          p.strategy ===
          policy.preferredStrategy
      );

    return {
      nodeId,
      selectedStrategy:
        selected?.strategy ||
        policy.preferredStrategy,
      confidence:
        selected?.confidenceScore ||
        policy.confidence,
      alternatives:
        patterns
          .slice(0, 3)
          .map(p => p.strategy),
      timestamp: Date.now()
    };
  }
}

export const strategyEvolutionEngine =
  new StrategyEvolutionEngine();