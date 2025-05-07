import xior from "xior";

export const defaultOptions: Record<string, string> = {
  "Content-Type": "application/json",
};

export const baseUrl = "http://127.0.0.1:8000";

export const api = xior.create({
  baseURL: baseUrl,
  headers: defaultOptions,
});
