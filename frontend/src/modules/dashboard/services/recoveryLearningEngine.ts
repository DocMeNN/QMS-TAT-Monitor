//src/modules/dashboard/services/recoveryLearningEngine.ts

import type {
  RecoveryOutcome,
  RecoveryPattern
} from "../types/recoveryLearning";

class RecoveryLearningEngine {
  private outcomes: RecoveryOutcome[] = [];

  record(outcome: RecoveryOutcome) {
    this.outcomes.unshift(outcome);

    if (this.outcomes.length > 200) {
      this.outcomes.pop();
    }
  }

  getPatterns(): RecoveryPattern[] {
    const grouped = new Map<string, RecoveryOutcome[]>();

    this.outcomes.forEach(outcome => {
      if (!grouped.has(outcome.strategy)) {
        grouped.set(outcome.strategy, []);
      }

      grouped.get(outcome.strategy)?.push(outcome);
    });

    return Array.from(grouped.entries()).map(
      ([strategy, attempts]) => {
        const successes = attempts.filter(
          a => a.success
        ).length;

        const averageRecoveryTime =
          attempts.reduce(
            (sum, a) => sum + a.recoveryTime,
            0
          ) / attempts.length;

        return {
          strategy,
          attempts: attempts.length,
          successes,
          averageRecoveryTime,
          confidenceScore:
            (successes / attempts.length) * 100
        };
      }
    );
  }

  recommendStrategy() {
    const patterns = this.getPatterns();

    return patterns.sort(
      (a, b) =>
        b.confidenceScore - a.confidenceScore
    )[0];
  }
}

export const recoveryLearningEngine =
  new RecoveryLearningEngine();