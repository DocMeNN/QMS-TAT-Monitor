// src/modules/dashboard/components/OperationalOverviewPanel.tsx

import {
  useOperationalStore,
} from "../store/operationalStore";

import {
  OperationalHealthPanel,
} from "./OperationalHealthPanel";

import {
  LaboratoryQueuePanel,
} from "./LaboratoryQueuePanel";

import {
  StaffLoadPanel,
} from "./StaffLoadPanel";

import {
  TatForecastPanel,
} from "./TatForecastPanel";

export function OperationalOverviewPanel() {
  const snapshot =
    useOperationalStore(
      (state) =>
        state.snapshot
    );

  return (
    <div
      className="
        grid
        gap-6
      "
    >
      <OperationalHealthPanel />

      <LaboratoryQueuePanel
        queues={
          snapshot.queues
        }
      />

      <StaffLoadPanel
        staff={
          snapshot.staff
        }
      />

      <TatForecastPanel
        forecasts={
          snapshot.forecasts
        }
      />
    </div>
  );
}

export default
  OperationalOverviewPanel;