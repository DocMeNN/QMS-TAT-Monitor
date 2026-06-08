// src/modules/dashboard/components/OperationalHealthPanel.tsx

import {
  useOperationalStore,
} from "../store/operationalStore";

export function OperationalHealthPanel() {
  const snapshot =
    useOperationalStore(
      (state) =>
        state.snapshot
    );

  return (
    <div
      className="
        rounded-xl
        border
        p-6
        bg-white
      "
    >
      <h2
        className="
          text-xl
          font-bold
        "
      >
        Operational Health
      </h2>

      <div
        className="
          mt-4
          text-4xl
          font-bold
        "
      >
        {
          snapshot.overallHealth
        }
      </div>

      <div
        className="
          mt-2
          text-sm
        "
      >
        Snapshot Time:
        {" "}
        {
          new Date(
            snapshot.timestamp
          ).toLocaleString()
        }
      </div>
    </div>
  );
}

export default
  OperationalHealthPanel;