import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  // Get the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // If an access token is available, attach it to the request headers
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;

    return Promise.reject(error);
  },
);

export { api };
