import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocketIO } from "../hooks/UseSocketIO";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { handleSendMessage, getChats, getMessages } = useChat();
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

  // Auth check: If not logged in, you can redirect or fallback to preview user
  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    getChats();
  }, [user]);

  // Memoized username: uses logged-in username or fallback for UI testing
  const displayUsername = useMemo(() => {
    return user?.username || "alex_dev";
  }, [user]);

  // Callback to select a chat
  const handleSelectChat = useCallback((id) => {
    getMessages(id);
    setIsSidebarOpen(false); // Close sidebar on mobile upon selection
  }, []);

  // Mobile sidebar controls
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-slate-950 p-2 sm:p-3 md:p-4 overflow-hidden">
      {/* Background ambient lighting effects matching project design */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

      {/* Outer Rounded Container / Frame matching the user's wireframe sketch */}
      <div className="relative z-10 flex w-full max-w-[1900px] h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] md:h-[calc(100vh-2rem)] rounded-3xl border border-slate-800/90 bg-slate-900/50 overflow-hidden">
        {/* Left Column: Reusable Memoized Sidebar */}
        {/* <Sidebar
          chats={chats}
          activeChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={() => {}}
          onDeleteChat={() => {}}
          username={displayUsername}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        /> */}

        {/* Right Column: Main Chat & Response Area */}
        <main className="flex flex-col flex-1 h-full min-w-0 overflow-hidden bg-slate-950/40">
          {/* Header Bar */}
          <ChatHeader
            // activeChatTitle={activeChat?.title}
            onToggleSidebar={handleToggleSidebar}
            username={displayUsername}
          />

          {/* Central Scrollable Conversation Stream */}
          {/* <MessageList messages={chats} isLoading={loading} /> */}

          {/* Bottom Prompt Bar with Mic & Send */}
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
