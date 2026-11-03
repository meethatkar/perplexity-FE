import io from "socket.io-client";
import { baseUrl } from "../../../apiClient";
let socket = null;

export const initializeSocketConnection = () => {
  if (!socket) {
    // socket = io("http://localhost:3000", { withCredentials: true });
    socket = io("https://aether-ai-8bb5.onrender.com", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket IO Connected", socket.id);
    });
  }
  return socket;
};

export const sendMessages = async (message, chatId) => {
  const response = await baseUrl.post(`/ai/ask-ai`, {
    prompt: message,
    chatID: chatId,
  });
  return response;
};

export const getAllChats = async () => {
  const response = await baseUrl.get(`/ai/`);
  return response;
};

export const getChatMessages = async (chatId) => {
  const response = await baseUrl.get(`/ai/${chatId}/messages`);
  return response;
};

export const deleteChatByID = async (chatID) => {
  const response = await baseUrl.post(`/ai/chat/delete`, { chatID });
  return response;
};
