// src/modules/dashboard/components/LiveOperationsTicker.tsx

import {
  useOperationalStore,
} from "../store/operationalStore";

export function LiveOperationsTicker() {
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
        bg-white
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            font-semibold
          "
        >
          Live Operations
        </div>

        <div>
          {
            snapshot.overallHealth
          }
        </div>
      </div>

      <div
        className="
          mt-3
          text-sm
        "
      >
        Last Refresh:
        {" "}
        {new Date(
          snapshot.timestamp
        ).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default
  LiveOperationsTicker;