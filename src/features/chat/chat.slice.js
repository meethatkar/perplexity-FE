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
    createNewChat: (state, action) => {
      const { chatDetails } = action.payload;
      state.chats[chatDetails._id] = {
        title: chatDetails.title,
        user_id: chatDetails.user,
        lastUpdated: chatDetails.updatedAt,
        messages: new Array(0),
      };
    },
    createMessage: (state, action) => {
      const { chatID, role, content, updatedAt } = action.payload;
      state.chats[chatID].messages.push({
        role,
        content,
        time: updatedAt,
      });
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

export const {
  createMessage,
  createNewChat,
  setLoading,
  setError,
  setCurrentChatID,
} = chatSlice.actions;
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
