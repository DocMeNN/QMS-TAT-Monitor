// src/modules/data-entry-workspace/components/RequestSearchPanel.tsx

import React, { useState } from "react";

export interface RequestSearchFilters {
  requestId?: string;
  status?: string;
  assignedTo?: string;
}

interface RequestSearchPanelProps {
  onSearch: (
    filters: RequestSearchFilters
  ) => void;
}

export const RequestSearchPanel: React.FC<
  RequestSearchPanelProps
> = ({ onSearch }) => {
  const [requestId, setRequestId] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const handleSearch = () => {
    onSearch({
      requestId,
      status,
      assignedTo,
    });
  };

  return (
    <div className="request-search-panel">
      <input
        placeholder="Request ID"
        value={requestId}
        onChange={(e) =>
          setRequestId(e.target.value)
        }
      />

      <input
        placeholder="Status"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      />

      <input
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default RequestSearchPanel;