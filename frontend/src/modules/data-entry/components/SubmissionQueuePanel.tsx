// src/modules/data-entry/components/SubmissionQueuePanel.tsx

export default function SubmissionQueue() {
  const queue = [
    "Access Review Request",
    "Infrastructure Upgrade",
    "Policy Compliance Audit",
  ];

  return (
    <div className="bg-slate-800 border-slate-700 text-slate-100 p-4 rounded-xl border">
      <h3 className="font-semibold mb-2">
        Submission Queue
      </h3>

      <ul className="space-y-2">
        {queue.map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}