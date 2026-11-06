import axios from "axios";

export const baseUrl = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:3000/api"
      : "https://aether-ai-8bb5.onrender.com/api"),
  withCredentials: true,
});

/**
 * Global response interceptor:
 * - Unwraps data payload on success
 * - Standardizes error objects so all catches receive a predictable structure:
 *   { message, statusCode, errorCode, errors: { [field]: msg } }
 */
baseUrl.interceptors.response.use(
  (response) => {
    // Return the response data body directly for convenience
    return response.data;
  },
  (error) => {
    const fallbackError = {
      success: false,
      statusCode: error.response?.status || 0,
      errorCode: "NETWORK_ERROR",
      message: "Network error or server unreachable. Please try again.",
      errors: null,
    };

    if (error.response?.data) {
      const data = error.response.data;
      fallbackError.statusCode = data.statusCode || error.response.status;
      fallbackError.errorCode = data.errorCode || "API_ERROR";
      fallbackError.message =
        data.message || error.message || "An unexpected error occurred";
      fallbackError.errors = data.errors || null;
    }

    return Promise.reject(fallbackError);
  },
);

export default baseUrl;
