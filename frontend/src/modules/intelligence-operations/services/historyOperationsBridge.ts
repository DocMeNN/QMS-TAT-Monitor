// src/modules/intelligence-operations/services/historyOperationsBridge.ts

import type {
  HistoryRecord,
} from "../../intelligence-history/types/history.types";

import {
  operationsEngine,
} from "./operationsEngine";

export class HistoryOperationsBridge {
  createHistoryOperation(
    history: HistoryRecord
  ) {
    return operationsEngine.createOperation(
      history.eventType,
      "History event registered",
      "ALERT",
      "LOW"
    );
  }
}

export const historyOperationsBridge =
  new HistoryOperationsBridge();

export default historyOperationsBridge;