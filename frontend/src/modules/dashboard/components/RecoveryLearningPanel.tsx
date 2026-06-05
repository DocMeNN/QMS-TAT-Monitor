//src/modules/dashboard/components/RecoveryLearningPanel.tsx

import { recoveryLearningEngine }
  from "../services/recoveryLearningEngine";

export default function RecoveryLearningPanel() {
  const patterns =
    recoveryLearningEngine.getPatterns();

  const best =
    recoveryLearningEngine.recommendStrategy();

  return (
    <div className="dashboard-card">
      <h3>Adaptive Recovery Learning</h3>

      {best && (
        <div className="mb-4">
          Best Strategy: {best.strategy}
          <br />
          Confidence: {best.confidenceScore.toFixed(1)}%
        </div>
      )}

      {patterns.map(pattern => (
        <div
          key={pattern.strategy}
          className="border rounded-lg p-3 mb-2"
        >
          <div>{pattern.strategy}</div>
          <div>Attempts: {pattern.attempts}</div>
          <div>Success: {pattern.successes}</div>
          <div>
            Avg Recovery:
            {pattern.averageRecoveryTime.toFixed(0)}ms
          </div>
        </div>
      ))}
    </div>
  );
}