// src/modules/executive-command-center/components/ExecutiveNavigation.tsx

interface ExecutiveNavigationProps {
  activeView: string;
  onChangeView: (
    view: string
  ) => void;
}

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "decisions",
    label: "Decisions",
  },
  {
    id: "executions",
    label: "Executions",
  },
  {
    id: "audit",
    label: "Audit",
  },
  {
    id: "history",
    label: "History",
  },
];

export default function ExecutiveNavigation({
  activeView,
  onChangeView,
}: ExecutiveNavigationProps) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              onChangeView(item.id)
            }
            className={`rounded-md px-4 py-2 text-sm transition ${
              activeView === item.id
                ? "bg-slate-900 text-white"
                : "border bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}