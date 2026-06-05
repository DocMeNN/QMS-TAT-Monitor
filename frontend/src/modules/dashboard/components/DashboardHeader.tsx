// src/modules/dashboard/components/DashboardHeader.tsx

/**
 * Dashboard header
 * ----------------
 * Main application header
 */

interface DashboardHeaderProps {
  status?: string;
}

const LIVE_INDICATOR = {
  healthy: "bg-green-400",
  warning: "bg-yellow-400 animate-pulse",
  critical: "bg-red-400 animate-ping",
};

export default function DashboardHeader({
  status = "healthy",
}: DashboardHeaderProps) {
  const indicator =
    LIVE_INDICATOR[
      status as keyof typeof LIVE_INDICATOR
    ] || LIVE_INDICATOR.healthy;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          QMS TAT Monitor
        </h1>

        <p className="text-slate-400 text-sm">
          Live operational analytics
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full ${indicator}`}
        />

        <span className="text-sm text-slate-400">
          Live
        </span>
      </div>
    </header>
  );
}