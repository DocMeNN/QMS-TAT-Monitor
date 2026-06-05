// src/modules/data-entry/services/requestEntryService.ts

import type { Request } from "../types/request.types";

export function createMockRequests(): Request[] {
  return [
    {
      id: "REQ-1001",
      title: "Vendor Compliance Review",
      department: "Procurement",
      category: "Compliance",
      priority: "HIGH",
      slaHours: 24,
      owner: "Operations",
      status: "QUEUED",
      createdAt: new Date().toISOString()
    },
    {
      id: "REQ-1002",
      title: "Audit Documentation Approval",
      department: "Quality Assurance",
      category: "Audit",
      priority: "MEDIUM",
      slaHours: 48,
      owner: "QA Team",
      status: "QUEUED",
      createdAt: new Date().toISOString()
    }
  ];
}