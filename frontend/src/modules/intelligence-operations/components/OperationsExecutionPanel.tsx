// src/modules/intelligence-operations/components/OperationsExecutionPanel.tsx

import {
  useOperationsStore,
} from "../store/operationsStore";

export function OperationsExecutionPanel() {
  const operations =
    useOperationsStore(
      (state) =>
        state.operations
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Execution Monitor
      </h2>

      <div className="space-y-2">
        {operations.map(
          (operation) => (
            <div
              key={
                operation.id
              }
              className="border-b pb-2"
            >
              <div>
                {
                  operation.title
                }
              </div>

              <div className="text-sm text-gray-500">
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

export default OperationsExecutionPanel;