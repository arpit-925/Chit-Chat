import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.js";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

// Response interceptor to handle 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth state and redirect to login
      useAuthStore.setState({ authUser: null });
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);