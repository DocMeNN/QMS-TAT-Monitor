// src/modules/intelligence-operations/components/OperationsQueue.tsx

import {
  useOperationsStore,
} from "../store/operationsStore";

export function OperationsQueue() {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Operations Queue
      </h2>

      <div className="space-y-3">
        {operations.map(
          (operation) => (
            <div
              key={
                operation.id
              }
              className="rounded border p-3"
            >
              <div className="font-medium">
                {
                  operation.title
                }
              </div>

              <div className="text-sm text-gray-500">
                {
                  operation.category
                }
              </div>

              <div className="text-sm">
                {
                  operation.status
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OperationsQueue;