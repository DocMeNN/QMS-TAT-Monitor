// src/modules/executive-command-center/components/AutonomousCommandGrid.tsx

export default function AutonomousCommandGrid() {
  const commands = [
    {
      id: "1",
      title: "Alert Intelligence",
      description:
        "Monitoring active alert generation",
      status: "active",
    },
    {
      id: "2",
      title: "Incident Prediction",
      description:
        "Forecasting operational incidents",
      status: "active",
    },
    {
      id: "3",
      title: "Execution Runtime",
      description:
        "Managing autonomous execution",
      status: "active",
    },
    {
      id: "4",
      title: "Audit Persistence",
      description:
        "Archiving compliance records",
      status: "idle",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Autonomous Command Grid
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {commands.map(
          (command) => (
            <div
              key={command.id}
              className="rounded-lg border p-4"
            >
              <div className="font-semibold">
                {command.title}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {
                  command.description
                }
              </div>

              <div className="mt-3 text-xs uppercase">
                Status:{" "}
                {command.status}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}