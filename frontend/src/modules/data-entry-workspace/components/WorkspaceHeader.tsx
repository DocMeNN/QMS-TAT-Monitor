// src/modules/data-entry-workspace/components/WorkspaceHeader.tsx

import React from "react";

interface WorkspaceHeaderProps {
  title?: string;
  subtitle?: string;
}

export const WorkspaceHeader: React.FC<
  WorkspaceHeaderProps
> = ({
  title = "Data Entry Workspace",
  subtitle = "Request intake and operational tracking",
}) => {
  return (
    <div className="workspace-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default WorkspaceHeader;