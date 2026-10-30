import { useDispatch } from "react-redux";
import {
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  createDraftChat,
  replaceDraftChat,
  removeDraftChat,
  createMessage,
  setChats,
  setMessages,
} from "../chat.slice";
import {
  getAllChats,
  getChatMessages,
  sendMessages,
} from "../service/chat.service";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage(message, chatId) {
    if (!message || !message.trim()) return;
    const trimmedMessage = message.trim();
    let tempChatId = null;

    // 1. Immediately show user message in the chat area
    if (chatId) {
      dispatch(
        createMessage({
          chatID: chatId,
          role: "user",
          time: new Date().toISOString(),
          content: trimmedMessage,
        }),
      );
    } else {
      tempChatId = "temp_" + Date.now();
      dispatch(
        createDraftChat({
          tempId: tempChatId,
          initialMessage: {
            role: "user",
            content: trimmedMessage,
            time: new Date().toISOString(),
          },
        }),
      );
    }

    // 2. Immediately enable loading state so AI response loading card displays
    dispatch(setLoading(true));

    try {
      const data = await sendMessages(trimmedMessage, chatId);
      const { chatDetails, response } = data.data;

      if (tempChatId) {
        dispatch(
          replaceDraftChat({
            tempId: tempChatId,
            chatDetails,
            aiResponse: response,
          }),
        );
      } else {
        dispatch(
          createMessage({
            chatID: chatId,
            role: "ai",
            time: response?.updatedAt || new Date().toISOString(),
            content: response?.content || response,
          }),
        );
      }
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occurred in sending message to ai: ", error);
      if (tempChatId) {
        dispatch(removeDraftChat({ tempId: tempChatId }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getChats() {
    dispatch(setLoading(true));
    try {
      const data = await getAllChats();
      const { chats } = data.data;
      console.log("CHATS: ", chats);
      dispatch(setChats(chats));
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occured in fetching chats: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getMessages(chatID) {
    if (!chatID) return;
    dispatch(setLoading(true));
    try {
      const data = await getChatMessages(chatID);
      dispatch(setCurrentChatId(chatID));
      const response = data.data.response;
      console.log("MESSAGES: ", response);
      dispatch(setMessages({ chatId: chatID, messages: response }));
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occured in fetching messages: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleSendMessage, getChats, getMessages };
};
