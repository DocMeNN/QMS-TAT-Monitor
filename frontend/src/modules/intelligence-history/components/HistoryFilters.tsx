// src/modules/intelligence-history/components/HistoryFilters.tsx

interface HistoryFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const EVENT_TYPES = [
  "ALL",
  "REQUEST_CREATED",
  "ALERT_CREATED",
  "INCIDENT_DETECTED",
  "DECISION_CREATED",
  "ORCHESTRATION_TRIGGERED",
  "ACTION_CREATED",
  "ACTION_EXECUTED",
  "EXECUTION_PROPAGATED",
  "COGNITIVE_SIGNAL",
];

export default function HistoryFilters({
  selectedType,
  onTypeChange,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EVENT_TYPES.map((type) => (
        <button
          key={type}
          onClick={() =>
            onTypeChange(type)
          }
          className={`rounded-md px-3 py-2 text-sm border ${
            selectedType === type
              ? "bg-slate-900 text-white"
              : "bg-white"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}