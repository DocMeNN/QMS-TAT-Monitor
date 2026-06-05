// src/modules/dashboard/components/SystemHealthBadge.tsx

/**
 * System health badge
 * -------------------
 * Displays operational health + telemetry
 */

import {
  useDashboardStore,
} from "../store/dashboardStore";

interface SystemHealthBadgeProps {
  status: string;
}

const STATUS_CONFIG = {
  healthy:
    "bg-green-500/20 text-green-400 border-green-500/40",
  warning:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  critical:
    "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse",
};

export default function SystemHealthBadge({
  status,
}: SystemHealthBadgeProps) {
  const {
    telemetry,
  } = useDashboardStore();

  return (
    <div
      className={`px-4 py-3 rounded-xl border flex flex-col gap-2 ${
        STATUS_CONFIG[
          status as keyof typeof STATUS_CONFIG
        ]
      }`}
    >
      <span>
        System:{" "}
        {status.toUpperCase()}
      </span>

      <span className="text-xs">
        Avg latency:{" "}
        {
          telemetry.avgLatency
        }
        ms
      </span>

      <span className="text-xs">
        Trend:{" "}
        {
          telemetry.trend
        }
      </span>
    </div>
  );
}