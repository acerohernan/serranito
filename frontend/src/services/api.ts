import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const allowedPaths = ["/auth/login", "/auth/register"];

api.interceptors.request.use((config) => {
  if (allowedPaths.includes(config.url ?? "")) return config;

  const token = localStorage.getItem("token");
  if (token && config.headers) {
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }
  return config;
});

export default api;
