// src/modules/intelligence-history/services/historyBootstrap.ts

/**
 * History Bootstrap
 * --------------------------------------------------
 * Initializes intelligence history consumers.
 */

import {
  registerHistoryConsumer,
} from "../consumers/historyConsumer";

let bootstrapped = false;

export function bootstrapHistory() {
  if (bootstrapped) {
    return;
  }

  console.log(
    "[History Bootstrap] Initializing"
  );

  registerHistoryConsumer();

  bootstrapped = true;

  console.log(
    "[History Bootstrap] Ready"
  );
}