// src/modules/audit-persistence/services/archiveRetentionManager.ts

import { useAuditStore } from "../store/auditStore";

export class ArchiveRetentionManager {
  purgeOlderThan(
    retentionDays: number
  ) {
    const cutoff =
      Date.now() -
      retentionDays *
        24 *
        60 *
        60 *
        1000;

    const state =
      useAuditStore.getState();

    const auditRecords =
      state.auditRecords.filter(
        (record) =>
          new Date(
            record.timestamp
          ).getTime() >= cutoff
      );

    const decisionArchives =
      state.decisionArchives.filter(
        (record) =>
          new Date(
            record.timestamp
          ).getTime() >= cutoff
      );

    const executionArchives =
      state.executionArchives.filter(
        (record) =>
          new Date(
            record.timestamp
          ).getTime() >= cutoff
      );

    useAuditStore.setState({
      auditRecords,
      decisionArchives,
      executionArchives,
    });

    return {
      remainingAuditRecords:
        auditRecords.length,
      remainingDecisionArchives:
        decisionArchives.length,
      remainingExecutionArchives:
        executionArchives.length,
    };
  }
}

export const archiveRetentionManager =
  new ArchiveRetentionManager();