import axios from "axios";
import { toast } from "react-toastify";

import { getCurrentToken } from "../auth/auth";

// Base URL
export const BASE_URL = "http://localhost:7000";

// Normal Axios
export const myAxios = axios.create({
  baseURL: BASE_URL,
});

// Private Axios
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// Add JWT Token Automatically
privateAxios.interceptors.request.use(
  (config) => {
    const token = getCurrentToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR

let isSessionExpired = false;

privateAxios.interceptors.response.use(
  (response) => response,

  (error) => {
    // Session Expired
    if (error.response?.status === 401 && !isSessionExpired) {
      isSessionExpired = true;

      toast.error("Session Ended. Please Login Again");

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);
    }

    return Promise.reject(error);
  },
);
