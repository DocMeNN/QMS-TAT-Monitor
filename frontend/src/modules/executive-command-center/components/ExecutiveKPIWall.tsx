// src/modules/executive-command-center/components/ExecutiveKPIWall.tsx

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

export default function ExecutiveKPIWall() {
  const alertState =
    useDashboardStore(
      (state) => state.alertState
    );

  const incidentPrediction =
    useDashboardStore(
      (state) =>
        state.incidentPrediction
    );

  const executions =
    useDashboardStore(
      (state) => state.executions
    );

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Executive KPI Wall
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <KPI
          title="Alert Score"
          value={alertState.score}
        />

        <KPI
          title="Incident Probability"
          value={
            incidentPrediction.probability
          }
        />

        <KPI
          title="Execution Count"
          value={executions.length}
        />
      </div>
    </div>
  );
}

function KPI({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}