// src/modules/dashboard/components/LastUpdated.tsx

/**
 * Last updated indicator
 * -----------------------
 * Shows latest dashboard refresh timestamp
 */

interface LastUpdatedProps {
  timestamp: string;
}

export default function LastUpdated({
  timestamp,
}: LastUpdatedProps) {
  if (!timestamp) return null;

  return (
    <p className="text-sm text-slate-400">
      Last updated:{" "}
      {new Date(timestamp).toLocaleTimeString()}
    </p>
  );
}