// src/modules/intelligence-bus/core/eventBus.ts

type EventHandler<T = unknown> = (payload: T) => void;

class EventBus {
  private listeners = new Map<
    string,
    EventHandler<any>[]
  >();

  emit<T>(event: {
    type: string;
    payload: T;
  }) {
    const handlers =
      this.listeners.get(event.type) || [];

    handlers.forEach((handler) =>
      handler(event.payload)
    );
  }

  subscribe<T>(
    type: string,
    handler: EventHandler<T>
  ) {
    const handlers =
      this.listeners.get(type) || [];

    this.listeners.set(
      type,
      [...handlers, handler as EventHandler<any>]
    );

    return () => {
      const current =
        this.listeners.get(type) || [];

      this.listeners.set(
        type,
        current.filter((h) => h !== handler)
      );
    };
  }
}

export const eventBus = new EventBus();