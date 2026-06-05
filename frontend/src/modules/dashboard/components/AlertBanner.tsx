// src/modules/dashboard/components/AlertBanner.tsx

/**
 * Alert banner
 * ----------------
 * Displays resilience alerts
 */

interface AlertBannerProps {
  status: string;
  stale?: boolean;
  reconnecting?: boolean;
}

export default function AlertBanner({
  status,
  stale,
  reconnecting,
}: AlertBannerProps) {
  if (
    status === "healthy" &&
    !stale &&
    !reconnecting
  )
    return null;

  let title =
    "System Warning";

  let message =
    "Monitoring active.";

  let style =
    "bg-yellow-500/10 border-yellow-500/40 text-yellow-300";

  if (reconnecting) {
    title =
      "Reconnecting";
    message =
      "Attempting recovery...";
  }

  if (stale) {
    title =
      "Stale Data Detected";
    message =
      "Displaying last known good snapshot.";
    style =
      "bg-orange-500/10 border-orange-500/40 text-orange-300";
  }

  if (status === "critical") {
    title =
      "Critical Outage";
    message =
      "Dashboard service unavailable.";
    style =
      "bg-red-500/10 border-red-500/40 text-red-300 animate-pulse";
  }

  return (
    <div
      className={`border rounded-2xl p-4 transition-all duration-500 ${style}`}
    >
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm mt-1">
        {message}
      </p>
    </div>
  );
}