import { initializeSocketConnection } from "../service/chat.service";
export const useSocketIO = () => {
  return { initializeSocketConnection };
};
