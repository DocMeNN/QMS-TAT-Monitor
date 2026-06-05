// src/modules/intelligence-bus/services/eventBus.ts

type IntelligenceEvent = {
  type: string;
  payload?: unknown;
};

type EventHandler = (event: IntelligenceEvent) => void;

class EventBus {
  private listeners = new Map<
    string,
    EventHandler[]
  >();

  emit(event: IntelligenceEvent) {
    const handlers =
      this.listeners.get(event.type) || [];

    handlers.forEach((handler) =>
      handler(event)
    );
  }

  subscribe(
    type: string,
    handler: EventHandler
  ) {
    const handlers =
      this.listeners.get(type) || [];

    this.listeners.set(type, [
      ...handlers,
      handler,
    ]);

    return () => {
      const current =
        this.listeners.get(type) || [];

      this.listeners.set(
        type,
        current.filter(
          (h) => h !== handler
        )
      );
    };
  }
}

export const eventBus = new EventBus();