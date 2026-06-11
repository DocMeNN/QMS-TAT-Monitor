// src/modules/data-entry-workspace/components/RequestTimelineDrawer.tsx

import React from "react";

import type { TimelineResponse } from "../types/workspace";

interface RequestTimelineDrawerProps {
  timeline: TimelineResponse | null;
}

export const RequestTimelineDrawer: React.FC<
  RequestTimelineDrawerProps
> = ({ timeline }) => {
  if (!timeline) {
    return null;
  }

  return (
    <div className="request-timeline-drawer">
      <h2>Timeline</h2>

      {timeline.events.length === 0 && (
        <p>No events available.</p>
      )}

      {timeline.events.map((event) => (
        <div
          key={event.event_id}
          className="timeline-event"
        >
          <h4>{event.title}</h4>

          <p>
            {event.description}
          </p>

          <small>
            {event.timestamp}
          </small>
        </div>
      ))}
    </div>
  );
};

export default RequestTimelineDrawer;