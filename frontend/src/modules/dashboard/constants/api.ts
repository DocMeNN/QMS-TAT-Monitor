// src/modules/dashboard/constants/api.ts

/**
 * API configuration
 * ------------------
 * Centralized backend endpoint configuration
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

export const DASHBOARD_ENDPOINT =
  `${API_BASE_URL}/api/dashboard`;