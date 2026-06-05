// src/modules/data-entry/components/RequestMetadataPanel.tsx

export default function RequestMetadataPanel() {
  return (
    <div className="dashboard-card rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-slate-100">
        Request Metadata
      </h3>

      <div className="space-y-3">
        <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-100">
          <option>Department</option>
        </select>

        <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-100">
          <option>Priority</option>
        </select>

        <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-100">
          <option>SLA Class</option>
        </select>
      </div>
    </div>
  );
}