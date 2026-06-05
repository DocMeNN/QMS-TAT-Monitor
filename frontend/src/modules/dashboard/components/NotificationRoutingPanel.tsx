// src/modules/dashboard/components/NotificationRoutingPanel.tsx

import { routeNotification } from "../services/notificationRouter";
import PanelShell from "./PanelShell";

export default function NotificationRoutingPanel() {
  const route = routeNotification(82);

  return (
    <PanelShell title="Notification Routing">
      <h2 className="font-bold">Notification Routing</h2>
      <p>{route}</p>
    </PanelShell>
  );
}