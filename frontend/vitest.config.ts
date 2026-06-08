// vitest.config.ts

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,

    environment: "jsdom",

    setupFiles: ["./src/test/setup.ts"],

    css: true,

    clearMocks: true,

    restoreMocks: true,

    mockReset: true,

    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
        "json",
      ],

      reportsDirectory:
        "./coverage",

      exclude: [
        "node_modules/**",
        "dist/**",
        "coverage/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/main.tsx",
        "**/vite-env.d.ts",
      ],
    },
  },
});