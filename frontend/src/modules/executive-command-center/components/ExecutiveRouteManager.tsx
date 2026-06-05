// src/modules/executive-command-center/components/ExecutiveRouteManager.tsx

import { useState } from "react";

import ExecutiveActivityStream from "./ExecutiveActivityStream";
import IntelligenceDrilldownPanel from "./IntelligenceDrilldownPanel";

type RouteKey =
  | "activity"
  | "drilldown";

export default function ExecutiveRouteManager() {
  const [route, setRoute] =
    useState<RouteKey>(
      "activity"
    );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() =>
            setRoute(
              "activity"
            )
          }
          className="rounded border px-3 py-2"
        >
          Activity
        </button>

        <button
          onClick={() =>
            setRoute(
              "drilldown"
            )
          }
          className="rounded border px-3 py-2"
        >
          Drilldown
        </button>
      </div>

      {route ===
        "activity" && (
        <ExecutiveActivityStream />
      )}

      {route ===
        "drilldown" && (
        <IntelligenceDrilldownPanel />
      )}
    </div>
  );
}