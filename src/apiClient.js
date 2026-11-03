import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://aether-ai-8bb5.onrender.com/api",
  withCredentials: true,
});
