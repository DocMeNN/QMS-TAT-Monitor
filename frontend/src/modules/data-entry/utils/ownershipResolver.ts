// src/modules/data-entry/utils/ownershipResolver.ts

export function resolveOwner(category: string): string {
  const ownershipMap: Record<string, string> = {
    Infrastructure: "Infrastructure Team",
    Software: "Software Team",
    Compliance: "Compliance Team",
    Security: "Security Team",
  };

  return ownershipMap[category] || "General Operations";
}