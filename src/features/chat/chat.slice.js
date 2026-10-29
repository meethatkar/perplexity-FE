import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChats, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;

/**
 SAMPLE STRUCTRE:
  chats: {
    "chat title": {
      id: 1,
      message: [
        {
          role: "user",
          content: "hello",
        },
        {
          role: "ai",
          content: "How are you?",
        },
        ],
        lastUpdatedAt: date
      },
      "chat2 title": {
        id: 2,
        message: [
        {
          role: "user",
          content: "hello",
        },
        {
          role: "ai",
          content: "How are you?",
        },
        ],
        lastUpdatedAt: date
      },
  }
 */
