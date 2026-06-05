// src/modules/intelligence-history/components/HistorySearchBar.tsx

interface HistorySearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HistorySearchBar({
  value,
  onChange,
}: HistorySearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search event type, request id, severity..."
        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
      />
    </div>
  );
}