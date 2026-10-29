import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import chatSlice from "./features/chat/chat.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});

export default store;
