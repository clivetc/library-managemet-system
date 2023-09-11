import axios from "axios";

export const api = axios.create({
  baseURL: "https://library-managemet-system.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // If an access token is available, attach it to the request headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
