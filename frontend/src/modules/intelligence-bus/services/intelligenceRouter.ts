// src/modules/intelligence-bus/services/intelligenceRouter.ts

import {
  signalProcessor,
  type IntelligenceSignal,
  type ProcessedSignal,
} from "./signalProcessor";

type ConsumerHandler = (
  signal: ProcessedSignal
) => void;

class IntelligenceRouter {
  private consumers =
    new Map<
      string,
      ConsumerHandler[]
    >();

  register(
    eventType: string,
    handler: ConsumerHandler
  ): void {
    const existing =
      this.consumers.get(
        eventType
      ) ?? [];

    existing.push(handler);

    this.consumers.set(
      eventType,
      existing
    );
  }

  unregister(
    eventType: string,
    handler: ConsumerHandler
  ): void {
    const existing =
      this.consumers.get(
        eventType
      ) ?? [];

    this.consumers.set(
      eventType,
      existing.filter(
        (consumer) =>
          consumer !== handler
      )
    );
  }

  route(
    signal: IntelligenceSignal
  ): void {
    const processed =
      signalProcessor.process(
        signal
      );

    const handlers =
      this.consumers.get(
        signal.type
      ) ?? [];

    handlers.forEach(
      (handler) =>
        handler(processed)
    );
  }

  getRegisteredRoutes(): string[] {
    return Array.from(
      this.consumers.keys()
    );
  }

  clear(): void {
    this.consumers.clear();
  }
}

export const intelligenceRouter =
  new IntelligenceRouter();