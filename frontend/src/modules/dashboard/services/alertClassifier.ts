// src/modules/dashboard/services/alertClassifier.ts

/**
 * Alert classification engine
 * Determines category, severity level and confidence
 */

export type AlertCategory =
  | "Infrastructure"
  | "Performance"
  | "Dependency"
  | "SLA"
  | "Security";

export interface ClassifiedAlert {
  category: AlertCategory;
  priority: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
}

export const classifyAlert = (signal: number): ClassifiedAlert => {
  if (signal > 90) {
    return {
      category: "Infrastructure",
      priority: "Critical",
      confidence: 0.97,
    };
  }

  if (signal > 70) {
    return {
      category: "Performance",
      priority: "High",
      confidence: 0.88,
    };
  }

  if (signal > 50) {
    return {
      category: "Dependency",
      priority: "Medium",
      confidence: 0.79,
    };
  }

  return {
    category: "SLA",
    priority: "Low",
    confidence: 0.65,
  };
};