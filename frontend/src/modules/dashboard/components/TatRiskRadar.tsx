// src/modules/dashboard/components/TatRiskRadar.tsx

import {
  useOperationalStore,
} from "../store/operationalStore";

export function TatRiskRadar() {
  const forecasts =
    useOperationalStore(
      (state) =>
        state.snapshot
          .forecasts
    );

  const highestRisk =
    forecasts.reduce(
      (
        highest,
        current
      ) =>
        current.projectedBreachRisk >
        highest.projectedBreachRisk
          ? current
          : highest,
      forecasts[0]
    );

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
      "
    >
      <h2
        className="
          text-lg
          font-bold
          mb-4
        "
      >
        TAT Risk Radar
      </h2>

      {highestRisk && (
        <div>
          <div
            className="
              text-xl
              font-semibold
            "
          >
            {
              highestRisk.department
            }
          </div>

          <div>
            Projected Risk:
            {" "}
            {
              highestRisk.projectedBreachRisk
            }
            %
          </div>

          <div>
            Forecast TAT:
            {" "}
            {
              highestRisk.projectedTatHours
            }
            hrs
          </div>

          <div>
            Confidence:
            {" "}
            {
              highestRisk.confidence
            }
            %
          </div>
        </div>
      )}
    </div>
  );
}

export default TatRiskRadar;