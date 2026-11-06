import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null, // string | null (for general banner alerts)
    fieldErrors: {}, // { [fieldName]: string } (for field-specific inline errors)
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.fieldErrors = {};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFieldErrors: (state, action) => {
      state.fieldErrors = action.payload || {};
    },
    clearFieldError: (state, action) => {
      const fieldName = action.payload;
      if (state.fieldErrors[fieldName]) {
        delete state.fieldErrors[fieldName];
      }
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.fieldErrors = {};
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  setFieldErrors,
  clearFieldError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
