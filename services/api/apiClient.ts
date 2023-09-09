import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Use the relative path for Next.js API routes
  timeout: 5000, // Adjust as needed
});
