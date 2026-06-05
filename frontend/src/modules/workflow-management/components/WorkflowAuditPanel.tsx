// src/modules/workflow-management/components/WorkflowAuditPanel.tsx

import { useMemo } from "react";

import { useWorkflowStore } from "../store/workflowStore";

export default function WorkflowAuditPanel() {
  const executionEvents =
    useWorkflowStore(
      (state) =>
        state.executionEvents
    );

  const auditSummary = useMemo(
    () => {
      const totalEvents =
        executionEvents.length;

      const workflowIds =
        new Set(
          executionEvents.map(
            (event) =>
              event.workflowId
          )
        );

      const stageIds =
        new Set(
          executionEvents.map(
            (event) =>
              event.stageId
          )
        );

      return {
        totalEvents,
        workflowsAudited:
          workflowIds.size,
        stagesTracked:
          stageIds.size,
      };
    },
    [executionEvents]
  );

  const latestAuditEvents =
    useMemo(
      () =>
        [...executionEvents]
          .sort(
            (a, b) =>
              new Date(
                b.timestamp
              ).getTime() -
              new Date(
                a.timestamp
              ).getTime()
          )
          .slice(0, 15),
      [executionEvents]
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Workflow Audit
        </h2>

        <p className="text-sm text-gray-500">
          Audit visibility and
          workflow event
          traceability.
        </p>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <AuditMetric
          title="Audit Events"
          value={
            auditSummary.totalEvents
          }
        />

        <AuditMetric
          title="Workflows"
          value={
            auditSummary.workflowsAudited
          }
        />

        <AuditMetric
          title="Stages"
          value={
            auditSummary.stagesTracked
          }
        />
      </div>

      <div className="space-y-2">
        {latestAuditEvents.map(
          (event) => (
            <div
              key={event.id}
              className="rounded border p-3"
            >
              <div className="flex justify-between">
                <div className="font-medium">
                  {
                    event.eventType
                  }
                </div>

                <div className="text-xs text-gray-500">
                  {new Date(
                    event.timestamp
                  ).toLocaleString()}
                </div>
              </div>

              <div className="mt-1 text-sm text-gray-600">
                Workflow:{" "}
                {
                  event.workflowId
                }
              </div>

              <div className="text-sm text-gray-600">
                Stage:{" "}
                {
                  event.stageId
                }
              </div>
            </div>
          )
        )}

        {latestAuditEvents.length ===
          0 && (
          <EmptyAuditState />
        )}
      </div>
    </div>
  );
}

interface AuditMetricProps {
  title: string;
  value: number;
}

function AuditMetric({
  title,
  value,
}: AuditMetricProps) {
  return (
    <div className="rounded border p-3">
      <div className="text-xs uppercase text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}

function EmptyAuditState() {
  return (
    <div className="rounded border border-dashed p-6 text-center text-sm text-gray-500">
      No audit events recorded.
    </div>
  );
}