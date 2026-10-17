import { authService } from "../service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice";

export const useAuth = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = async (credentials) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await authService.login(credentials);
      dispatch(setUser(data?.user || data));
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await authService.signup(userData);
      // NOTE: not storing data as in setUser as it'll not return user data until email is verified.

      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Signup failed";
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch(setUser(null));
  };

  const getUser = async () => {
    try {
      const data = await authService.getMe();
      dispatch(setUser(data?.user || data));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to get user";
      dispatch(setError(errorMessage));
      dispatch(setUser(null));
    }
  };

  return { user, loading, error, login, signup, logout, getUser };
};
