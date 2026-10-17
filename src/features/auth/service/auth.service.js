import axios from "axios";

// Change this to your actual backend URL or rely on Vite proxy
const API_URL = "http://localhost:3000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
  getMe: async () => {
    const response = await api.get("/get-me");
    return response.data;
  },
};
