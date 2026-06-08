// src/modules/intelligence-operations/components/OperationsActivityFeed.tsx

import {
  useOperationsActivity,
} from "../hooks/useOperationsActivity";

export function OperationsActivityFeed() {
  const activity =
    useOperationsActivity();

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Activity Feed
      </h2>

      <div className="space-y-3">
        {activity.map(
          (operation) => (
            <div
              key={
                operation.id
              }
            >
              <div className="font-medium">
                {
                  operation.title
                }
              </div>

              <div className="text-xs text-gray-500">
                {
                  operation.createdAt
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OperationsActivityFeed;