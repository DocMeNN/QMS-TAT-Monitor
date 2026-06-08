// src/modules/data-entry-workspace/components/MyRequestsTable.tsx

import React from "react";

import { WorkspaceRequestSummary } from "../types/workspace";

interface MyRequestsTableProps {
  requests: WorkspaceRequestSummary[];

  onSelectRequest: (
    requestId: string
  ) => void;
}

export const MyRequestsTable: React.FC<
  MyRequestsTableProps
> = ({
  requests,
  onSelectRequest,
}) => {
  return (
    <table className="workspace-table">
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Status</th>
          <th>Workflow Stage</th>
          <th>Assigned To</th>
          <th>SLA</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((request) => (
          <tr
            key={request.request_id}
            onClick={() =>
              onSelectRequest(
                request.request_id
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            <td>{request.request_id}</td>

            <td>{request.status}</td>

            <td>
              {request.workflow_stage ??
                "-"}
            </td>

            <td>
              {request.assigned_to ?? "-"}
            </td>

            <td>
              {request.sla_status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyRequestsTable;