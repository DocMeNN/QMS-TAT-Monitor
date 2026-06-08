// src/modules/dashboard/components/TatForecastPanel.tsx

import type {
  TatForecast,
} from "../types/operational.types";

interface Props {
  forecasts:
    TatForecast[];
}

export function TatForecastPanel({
  forecasts,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        p-4
        bg-white
      "
    >
      <h3
        className="
          text-lg
          font-semibold
          mb-4
        "
      >
        TAT Forecast
      </h3>

      <div
        className="
          grid
          gap-3
        "
      >
        {forecasts.map(
          (
            forecast
          ) => (
            <div
              key={
                forecast.department
              }
              className="
                border
                rounded-lg
                p-3
              "
            >
              <div>
                {
                  forecast.department
                }
              </div>

              <div>
                Forecast TAT:
                {" "}
                {
                  forecast.projectedTatHours
                }
                h
              </div>

              <div>
                Breach Risk:
                {" "}
                {
                  forecast.projectedBreachRisk
                }
                %
              </div>

              <div>
                Confidence:
                {" "}
                {
                  forecast.confidence
                }
                %
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default
  TatForecastPanel;