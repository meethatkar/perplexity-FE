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
    // For setting messages from get api response
    setChats: (state, action) => {
      const chatsArray = action.payload || [];
      const newChats = {};
      chatsArray.forEach((chat) => {
        newChats[chat._id] = {
          id: chat._id,
          title: chat.title,
          user_id: chat.user,
          lastUpdated: chat.updatedAt || chat.createdAt,
          messages: state.chats[chat._id]?.messages || [],
        };
      });
      state.chats = newChats;
    },
    createNewChat: (state, action) => {
      const { chatDetails } = action.payload;
      if (!chatDetails?._id) return;
      state.chats[chatDetails._id] = {
        id: chatDetails._id,
        title: chatDetails.title,
        user_id: chatDetails.user,
        lastUpdated: chatDetails.updatedAt,
        messages: state.chats[chatDetails._id]?.messages || [],
      };
      state.currentChatId = chatDetails._id;
    },
    createDraftChat: (state, action) => {
      const { tempId, initialMessage } = action.payload;
      state.chats[tempId] = {
        id: tempId,
        title: "New Conversation",
        user_id: null,
        lastUpdated: new Date().toISOString(),
        messages: [initialMessage],
      };
      state.currentChatId = tempId;
    },
    replaceDraftChat: (state, action) => {
      const { tempId, chatDetails, aiResponse } = action.payload;
      const existingMessages = state.chats[tempId]?.messages || [];
      delete state.chats[tempId];
      if (chatDetails?._id) {
        state.chats[chatDetails._id] = {
          id: chatDetails._id,
          title: chatDetails.title,
          user_id: chatDetails.user,
          lastUpdated: chatDetails.updatedAt,
          messages: [
            ...existingMessages,
            {
              role: "ai",
              content: aiResponse?.content || "",
              time: aiResponse?.updatedAt || new Date().toISOString(),
            },
          ],
        };
        state.currentChatId = chatDetails._id;
      }
    },
    removeDraftChat: (state, action) => {
      const { tempId } = action.payload;
      delete state.chats[tempId];
      if (state.currentChatId === tempId) {
        state.currentChatId = null;
      }
    },
    // For setting messages from get api response
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages = messages || [];
      }
    },
    createMessage: (state, action) => {
      const { chatID, role, content, updatedAt } = action.payload;
      if (state.chats[chatID]) {
        state.chats[chatID].messages.push({
          role,
          content,
          time: updatedAt || new Date().toISOString(),
        });
      }
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
  createDraftChat,
  replaceDraftChat,
  removeDraftChat,
  setChats,
  setMessages,
  setLoading,
  setError,
  setCurrentChatId,
  setCurrentChatId: setCurrentChatID,
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
