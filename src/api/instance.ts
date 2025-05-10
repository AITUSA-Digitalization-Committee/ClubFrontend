import xior from "xior";

export const defaultOptions: Record<string, string> = {
  "Content-Type": "application/json",
};

export const baseUrl = "https://clubs-api.yeunikey.dev";

export const api = xior.create({
  baseURL: baseUrl,
  headers: defaultOptions,
});
