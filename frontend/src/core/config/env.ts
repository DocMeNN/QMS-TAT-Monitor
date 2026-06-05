// src/core/config/env.ts

/**
 * Environment configuration
 * -------------------------
 * Centralized runtime environment access
 */

interface AppConfig {
  apiBaseUrl: string;
  appEnv: string;
  isProduction: boolean;
}

const config: AppConfig = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000/api",

  appEnv:
    import.meta.env.VITE_APP_ENV ||
    "development",

  isProduction:
    import.meta.env.PROD,
};

export default config;