// src/modules/data-entry-workspace/components/RequestSummaryCards.tsx

import React from "react";

import type { DashboardSummary } from "../types/workspace";

interface RequestSummaryCardsProps {
  summary: DashboardSummary | null;
}

export const RequestSummaryCards: React.FC<
  RequestSummaryCardsProps
> = ({ summary }) => {
  if (!summary) {
    return null;
  }

  const cards = [
    {
      label: "Draft",
      value: summary.draft_requests,
    },
    {
      label: "Open",
      value: summary.open_requests,
    },
    {
      label: "In Progress",
      value: summary.in_progress_requests,
    },
    {
      label: "Completed",
      value: summary.completed_requests,
    },
  ];

  return (
    <div className="request-summary-cards">
      {cards.map((card) => (
        <div
          key={card.label}
          className="summary-card"
        >
          <h3>{card.label}</h3>
          <strong>{card.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default RequestSummaryCards;