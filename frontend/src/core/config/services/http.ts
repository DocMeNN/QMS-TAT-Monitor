// src/core/config/services/http.ts

/**
 * HTTP client service
 * -------------------
 * Shared API communication layer
 */

import axios from "axios";

const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000/api",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;