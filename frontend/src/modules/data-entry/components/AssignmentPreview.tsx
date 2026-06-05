// src/modules/data-entry/components/AssignmentPreview.tsx

interface Props {
  owner: string;
  queue: string;
  slaHours: number;
}

export default function AssignmentPreview({
  owner,
  queue,
  slaHours,
}: Props) {
  return (
    <div className="bg-slate-800 border-slate-700 text-slate-100 p-4 rounded-xl border">
      <h3 className="font-semibold mb-2">
        Assignment Preview
      </h3>

      <p><strong>Owner:</strong> {owner}</p>
      <p><strong>Queue:</strong> {queue}</p>
      <p><strong>SLA:</strong> {slaHours} hrs</p>
    </div>
  );
}