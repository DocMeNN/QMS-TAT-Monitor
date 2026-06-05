// src/modules/executive-command-center/components/ExecutiveWorkspace.tsx

import ExecutiveCommandCenter from "./ExecutiveCommandCenter";
import ExecutiveRouteManager from "./ExecutiveRouteManager";

export default function ExecutiveWorkspace() {
  return (
    <div className="space-y-6">
      <ExecutiveCommandCenter />

      <ExecutiveRouteManager />
    </div>
  );
}