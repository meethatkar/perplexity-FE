import { baseUrl } from "../../../apiClient";

export const authService = {
  login: async (credentials) => {
    const response = await baseUrl.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await baseUrl.post("/auth/register", userData);
    return response.data;
  },
  logout: async () => {
    const response = await baseUrl.post("/auth/logout");
    return response.data;
  },
  guestLogin: async (username) => {
    const response = await baseUrl.post("/auth/guest", { username });
    return response.data;
  },
  getMe: async () => {
    const response = await baseUrl.get("/auth/get-me");
    return response.data;
  },
};
