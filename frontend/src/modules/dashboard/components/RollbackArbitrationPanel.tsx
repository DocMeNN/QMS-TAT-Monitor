//src/modules/dashboard/components/RollbackArbitrationPanel.tsx

import { rollbackArbitrationEngine }
  from "../services/rollbackArbitrationEngine";

export default function RollbackArbitrationPanel() {
  const rollback =
    rollbackArbitrationEngine.latest();

  return (
    <div className="dashboard-card">
      <h3>Rollback Arbitration</h3>

      {rollback ? (
        <>
          <div>
            Rejected:
            v{rollback.rejectedVersion}
          </div>

          <div>
            Restored:
            v{rollback.restoredVersion}
          </div>

          <div>{rollback.reason}</div>
        </>
      ) : (
        <div>No rollback required</div>
      )}
    </div>
  );
}