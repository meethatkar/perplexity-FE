import { useDispatch } from "react-redux";
import {
  setCurrentChatID,
  setError,
  setLoading,
  createNewChat,
  createMessage,
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
      dispatch(createNewChat({ chatDetails }));
      dispatch(
        createMessage({
          chatID: chatDetails._id,
          role: "user",
          time: new Date().toISOString(),
          content: message,
        }),
      );
      dispatch(
        createMessage({
          chatID: chatDetails._id,
          role: "ai",
          time: response.updatedAt,
          content: response.content,
        }),
      );
      console.log("CHAT: ", chatDetails);
      console.log("RESPONSE: ", response);
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
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occured in fetching chats: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getMessages(chatID) {
    dispatch(setLoading(true));
    try {
      const data = await getChatMessages(chatID);
      dispatch(setCurrentChatID(chatID));
      const response = data.data.response;
      console.log("MESSAGES: ", response);
    } catch (error) {
      dispatch(setError(error));
      console.log("ERROR occured in fetching messages: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleSendMessage, getChats, getMessages };
};
