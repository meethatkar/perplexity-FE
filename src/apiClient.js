import axios from "axios";

export const baseUrl = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:3000/api"
      : "https://aether-ai-8bb5.onrender.com/api"),
  withCredentials: true,
});

export default baseUrl;
