import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocketIO } from "../hooks/UseSocketIO";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { setCurrentChatId, setError } from "../chat.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const { handleSendMessage, getChats, getMessages, deleteChat } = useChat();
  const navigate = useNavigate();
  const socketIO = useSocketIO();
  const { chats, currentChatId, loading, error } = useSelector(
    (state) => state.chat,
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize socket connection and ensure viewport is reset to top
  useEffect(() => {
    window.scrollTo(0, 0);
    const socket = socketIO.initializeSocketConnection();
    console.log("Socket connection initialized:", socket);
  }, []);

  console.log("STATE CHATSSS: ", chats);

  // Auth check: If not logged in, redirect to login
  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  // Fetch chats when user is available (do NOT depend on chats to avoid infinite re-renders)
  useEffect(() => {
    if (user) {
      getChats();
    }
  }, [user]);

  // Fetch messages when currentChatId changes if not already loaded and not a temp id
  useEffect(() => {
    if (currentChatId && !currentChatId.startsWith("temp_")) {
      if (
        !chats[currentChatId]?.messages ||
        chats[currentChatId].messages.length === 0
      ) {
        getMessages(currentChatId);
      }
    }
  }, [currentChatId, chats]);

  // Memoized username: uses logged-in username or fallback for UI testing
  const displayUsername = useMemo(() => {
    return user?.username || "alex_dev";
  }, [user]);

  // Callback to select a chat
  const handleSelectChat = useCallback((id) => {
    getMessages(id);
    setIsSidebarOpen(false); // Close sidebar on mobile upon selection
  }, []);

  const handleNewChat = useCallback(() => {
    dispatch(setCurrentChatId(null));
  }, []);

  const handleDeleteChat = useCallback((chatID) => {
    deleteChat(chatID);
  }, []);

  // Mobile sidebar controls
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const activeMessages = useMemo(() => {
    return (currentChatId && chats[currentChatId]?.messages) || [];
  }, [chats, currentChatId]);

  const activeChatTitle = useMemo(() => {
    return currentChatId && chats[currentChatId]?.title;
  }, [chats, currentChatId]);

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-slate-950 p-2 sm:p-3 md:p-4 overflow-hidden">
      {/* Outer Rounded Container / Frame matching the user's wireframe sketch */}
      <div className="relative z-10 flex w-full max-w-[1900px] h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] md:h-[calc(100vh-2rem)] rounded-3xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        {/* Left Column: Reusable Memoized Sidebar */}
        <Sidebar
          chats={chats}
          activeChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          username={displayUsername}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />

        {/* Right Column: Main Chat & Response Area */}
        <main className="flex flex-col flex-1 h-full min-w-0 overflow-hidden bg-slate-950/40">
          {/* Header Bar */}
          <ChatHeader
            activeChatTitle={activeChatTitle}
            onToggleSidebar={handleToggleSidebar}
            username={displayUsername}
            onLogout={logout}
          />

          {/* Rate limit & error banner notification */}
          {error && (
            <div className="mx-4 mt-3 mb-1 p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs sm:text-sm flex items-center justify-between shadow-lg backdrop-blur-md animate-fadeIn">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="truncate">
                  {typeof error === "string" ? error : error?.message || "Failed to generate AI response. Please try again."}
                </span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setError(null))}
                className="ml-3 px-2 py-0.5 text-xs rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-900/40 transition-colors shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Central Scrollable Conversation Stream */}
          <MessageList
            messages={activeMessages}
            isLoading={loading}
            chatTitle={activeChatTitle}
            onSelectSuggestion={(suggestion) =>
              handleSendMessage(suggestion, currentChatId)
            }
          />

          {/* Bottom Prompt Bar with Mic & Send */}
          <ChatInput
            onSendMessage={(msg) => handleSendMessage(msg, currentChatId)}
            disabled={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
