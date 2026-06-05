//src/modules/dashboard/types/rollbackArbitration.ts

export interface RollbackEvent {
  id: string;
  rejectedVersion: number;
  restoredVersion: number;
  reason: string;
  timestamp: number;
}