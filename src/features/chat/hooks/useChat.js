import { useDispatch } from "react-redux";
import {
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
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
    dispatch(setLoading(true));
    try {
      const data = await sendMessages(message, chatId);
      const { chatDetails, response } = data.data;
      if (chatDetails) {
        dispatch(createNewChat({ chatDetails }));
      }
      const activeChatId = chatDetails?._id || chatId;
      dispatch(
        createMessage({
          chatID: activeChatId,
          role: "user",
          time: new Date().toISOString(),
          content: message,
        }),
      );
      dispatch(
        createMessage({
          chatID: activeChatId,
          role: "ai",
          time: response?.updatedAt,
          content: response?.content,
        }),
      );
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occured in sending message to ai: ", error);
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
