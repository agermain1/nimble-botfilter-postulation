const url = import.meta.env.VITE_API_BASE_URL;

if (!url) {
  throw new Error("Missing VITE_API_BASE_URL in .env");
}

export const BASE_URL = url;