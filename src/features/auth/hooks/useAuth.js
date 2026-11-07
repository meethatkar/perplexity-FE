import { authService } from "../service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  setFieldErrors,
  clearFieldError,
  resetAuthState,
} from "../auth.slice";
import { resetChatState } from "../../chat/chat.slice";

export const useAuth = () => {
  const { user, loading, error, fieldErrors } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const clearError = (fieldName) => {
    if (fieldName) {
      dispatch(clearFieldError(fieldName));
    } else {
      dispatch(setError(null));
      dispatch(setFieldErrors({}));
    }
  };

  const login = async (credentials) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setFieldErrors({}));
    try {
      const res = await authService.login(credentials);
      // Uniform response: res.data.user
      const userData = res.data?.user || res.user || res;
      dispatch(setUser(userData));
      return userData;
    } catch (err) {
      dispatch(setError(err.message || "Login failed"));
      if (err.errors) {
        dispatch(setFieldErrors(err.errors));
      }
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setFieldErrors({}));
    try {
      const res = await authService.signup(userData);
      return res;
    } catch (err) {
      dispatch(setError(err.message || "Registration failed"));
      if (err.errors) {
        dispatch(setFieldErrors(err.errors));
      }
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(resetAuthState());
      dispatch(resetChatState());
    }
  };

  const handleGuestLogin = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setFieldErrors({}));
    try {
      const generatedUsername = `guest_${Math.random().toString(36).substring(2, 8)}`;
      const res = await authService.guestLogin(generatedUsername);
      const userData = res.data?.user || res.user || res;
      dispatch(setUser(userData));
      return userData;
    } catch (err) {
      dispatch(setError(err.message || "Guest login failed"));
      if (err.errors) {
        dispatch(setFieldErrors(err.errors));
      }
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUser = async () => {
    try {
      const res = await authService.getMe();
      const userData = res.data?.user || res.user || res;
      dispatch(setUser(userData));
    } catch (err) {
      dispatch(setUser(null));
    }
  };

  return {
    user,
    loading,
    error,
    fieldErrors,
    login,
    signup,
    logout,
    guestLogin: handleGuestLogin,
    getUser,
    clearError,
  };
};
