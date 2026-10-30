import axios from "axios";
import io from "socket.io-client";
let socket = null;

export const initializeSocketConnection = () => {
  if (!socket) {
    socket = io("http://localhost:3000", { withCredentials: true });

    socket.on("connect", () => {
      console.log("Socket IO Connected", socket.id);
    });
  }
  return socket;
};

const baseUrl = axios.create({
  baseURL: "http://localhost:3000/api/ai",
  withCredentials: true,
});

export const sendMessages = async (message, chatId) => {
  const response = await baseUrl.post(`/ask-ai`, {
    prompt: message,
    chatID: chatId,
  });
  return response;
};

export const getAllChats = async () => {
  const response = await baseUrl.get(`/`);
  return response;
};

export const getChatMessages = async (chatId) => {
  const response = await baseUrl.get(`/${chatId}/messages`);
  return response;
};
