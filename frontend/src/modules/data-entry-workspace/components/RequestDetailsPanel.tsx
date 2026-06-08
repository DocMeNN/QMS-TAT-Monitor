// src/modules/data-entry-workspace/components/RequestDetailsPanel.tsx

import React from "react";

import { WorkspaceRequestDetails } from "../types/workspace";

interface RequestDetailsPanelProps {
  request: WorkspaceRequestDetails | null;
}

export const RequestDetailsPanel: React.FC<
  RequestDetailsPanelProps
> = ({ request }) => {
  if (!request) {
    return (
      <div className="request-details-panel">
        No request selected
      </div>
    );
  }

  return (
    <div className="request-details-panel">
      <h2>
        Request {request.request_id}
      </h2>

      <p>
        <strong>Status:</strong>{" "}
        {request.request_status}
      </p>

      <p>
        <strong>Workflow:</strong>{" "}
        {request.workflow.current_stage ??
          "-"}
      </p>

      <p>
        <strong>Assigned To:</strong>{" "}
        {request.assignment.assigned_to ??
          "-"}
      </p>

      <p>
        <strong>SLA:</strong>{" "}
        {request.sla.status}
      </p>

      {request.escalation && (
        <p>
          <strong>Escalation:</strong>{" "}
          {request.escalation.status}
        </p>
      )}

      {request.approval && (
        <p>
          <strong>Approval:</strong>{" "}
          {request.approval.status}
        </p>
      )}
    </div>
  );
};

export default RequestDetailsPanel;