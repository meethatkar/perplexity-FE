import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocketIO } from "../hooks/UseSocketIO";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";

// Initial mock data faithfully reflecting the wireframe
const INITIAL_CHATS = [
  {
    id: "chat-1",
    title: "Chat title 1 (AI Research)",
    createdAt: "10 mins ago",
  },
  {
    id: "chat-2",
    title: "Chat title 2 (React 19 Hooks)",
    createdAt: "2 hours ago",
  },
  {
    id: "chat-3",
    title: "Chat title 3 (Tailwind v4 Setup)",
    createdAt: "Yesterday",
  },
  {
    id: "chat-4",
    title: "Chat title 4 (System Design)",
    createdAt: "2 days ago",
  },
];

const INITIAL_MESSAGES = {
  "chat-1": [
    {
      id: "msg-1",
      role: "user",
      content:
        "Explain how Perplexity AI processes search prompts and synthesizes real-time answers.",
      timestamp: "11:42 AM",
    },
    {
      id: "msg-2",
      role: "assistant",
      content:
        "Perplexity AI combines real-time index retrieval with large language model synthesis to generate cited, truthful answers.\n\n### Pipeline Overview:\n1. **Query Formulation**: The input query is expanded into multi-faceted search keywords.\n2. **Live Web Crawling & Indexing**: Retrieves the most up-to-date sources across authoritative domains.\n3. **Reranking & Filtering**: Extracts high-relevance passages and strips noise.\n4. **Context-Augmented Generation**: The LLM synthesizes a concise, structured response while strictly referencing cited source indices.",
      sources: [
        {
          title: "Perplexity Architecture Overview",
          url: "https://perplexity.ai",
        },
        {
          title: "Retrieval-Augmented Generation (RAG) Papers",
          url: "https://arxiv.org",
        },
        {
          title: "Vector Search & Real-time Web Retrieval",
          url: "https://developer.mozilla.org",
        },
      ],
      timestamp: "11:43 AM",
    },
  ],
  "chat-2": [
    {
      id: "msg-201",
      role: "user",
      content: "What are the key memoization techniques in modern React?",
      timestamp: "09:15 AM",
    },
    {
      id: "msg-202",
      role: "assistant",
      content:
        "Modern React provides three primary memoization techniques:\n\n• **React.memo**: Wraps functional components to prevent re-rendering unless their props have changed shallowly.\n• **useMemo**: Caches expensive calculated values across renders.\n• **useCallback**: Returns a memoized version of a callback function that only changes if its dependencies change, ensuring child components receiving it as props don't re-render needlessly.",
      sources: [
        {
          title: "React Documentation - Hooks API Reference",
          url: "https://react.dev",
        },
      ],
      timestamp: "09:16 AM",
    },
  ],
  "chat-3": [
    {
      id: "msg-301",
      role: "user",
      content:
        "How does Tailwind CSS v4 improve build speed and configuration?",
      timestamp: "Yesterday",
    },
    {
      id: "msg-302",
      role: "assistant",
      content:
        "Tailwind CSS v4 introduces the Oxide engine written in Rust, delivering up to 10x faster compilation, seamless CSS-first configuration via `@import 'tailwindcss'`, and zero-config Vite integration.",
      sources: [
        {
          title: "Tailwind CSS v4 Release Announcement",
          url: "https://tailwindcss.com",
        },
      ],
      timestamp: "Yesterday",
    },
  ],
  "chat-4": [
    {
      id: "msg-401",
      role: "user",
      content: "Explain scalable chat architecture with WebSockets.",
      timestamp: "2 days ago",
    },
    {
      id: "msg-402",
      role: "assistant",
      content:
        "A scalable WebSocket architecture typically uses an API Gateway / Load Balancer, horizontal Node.js/Socket.IO servers, and a Redis Pub/Sub adapter to broadcast messages across server nodes.",
      sources: [
        {
          title: "Socket.IO Multi-Server Documentation",
          url: "https://socket.io",
        },
      ],
      timestamp: "2 days ago",
    },
  ],
};

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const socketIO = useSocketIO();

  // Local state for interactive chat management
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState("chat-1");
  const [messagesMap, setMessagesMap] = useState(INITIAL_MESSAGES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Initialize socket connection and ensure viewport is reset to top
  useEffect(() => {
    window.scrollTo(0, 0);
    const socket = socketIO.initializeSocketConnection();
    console.log("Socket connection initialized:", socket);
  }, []);

  // Auth check: If not logged in, you can redirect or fallback to preview user
  useEffect(() => {
    // If strict redirect is desired when auth token is required:
    // if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  // Memoized username: uses logged-in username or fallback for UI testing
  const displayUsername = useMemo(() => {
    return user?.username || "alex_dev";
  }, [user]);

  // Memoized active chat object
  const activeChat = useMemo(() => {
    return chats.find((c) => c.id === activeChatId) || null;
  }, [chats, activeChatId]);

  // Memoized active messages list
  const activeMessages = useMemo(() => {
    return messagesMap[activeChatId] || [];
  }, [messagesMap, activeChatId]);

  // Callback to select a chat
  const handleSelectChat = useCallback((id) => {
    setActiveChatId(id);
    setIsSidebarOpen(false); // Close sidebar on mobile upon selection
  }, []);

  // Callback to create a new chat
  const handleNewChat = useCallback(() => {
    const newChatId = `chat-${Date.now()}`;
    const newChatNumber = chats.length + 1;
    const newChat = {
      id: newChatId,
      title: `Chat title ${newChatNumber}`,
      createdAt: "Just now",
    };

    setChats((prev) => [newChat, ...prev]);
    setMessagesMap((prev) => ({
      ...prev,
      [newChatId]: [],
    }));
    setActiveChatId(newChatId);
    setIsSidebarOpen(false);
  }, [chats.length]);

  // Callback to delete a chat
  const handleDeleteChat = useCallback(
    (idToDelete) => {
      setChats((prev) => prev.filter((chat) => chat.id !== idToDelete));
      setMessagesMap((prev) => {
        const copy = { ...prev };
        delete copy[idToDelete];
        return copy;
      });

      if (activeChatId === idToDelete) {
        setChats((prev) => {
          const remaining = prev.filter((chat) => chat.id !== idToDelete);
          if (remaining.length > 0) {
            setActiveChatId(remaining[0].id);
          } else {
            setActiveChatId(null);
          }
          return remaining;
        });
      }
    },
    [activeChatId],
  );

  // Callback to send a message
  const handleSendMessage = useCallback(
    (promptText) => {
      if (!promptText.trim()) return;

      const currentId = activeChatId || `chat-${Date.now()}`;

      // If no active chat existed, create one
      if (!activeChatId) {
        const newChat = {
          id: currentId,
          title:
            promptText.slice(0, 28) + (promptText.length > 28 ? "..." : ""),
          createdAt: "Just now",
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(currentId);
      }

      const userMsg = {
        id: `user-${Date.now()}`,
        role: "user",
        content: promptText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Append user message immediately
      setMessagesMap((prev) => ({
        ...prev,
        [currentId]: [...(prev[currentId] || []), userMsg],
      }));

      // Simulate AI response synthesis
      setIsSynthesizing(true);
      setTimeout(() => {
        const aiMsg = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: `Here is the synthesized information regarding: "${promptText}"\n\n• **Core Answer**: Comprehensive overview generated by Perplexity model with up-to-date verified web citations.\n• **Context**: Processed through modular microservices and delivered through real-time reactive UI.`,
          sources: [
            {
              title: "Perplexity Verified Web Sources",
              url: "https://perplexity.ai",
            },
            {
              title: "Real-time Knowledge Synthesis",
              url: "https://google.com",
            },
          ],
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessagesMap((prev) => ({
          ...prev,
          [currentId]: [...(prev[currentId] || []), aiMsg],
        }));
        setIsSynthesizing(false);
      }, 900);
    },
    [activeChatId],
  );

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
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
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
            activeChatTitle={activeChat?.title}
            onToggleSidebar={handleToggleSidebar}
            username={displayUsername}
          />

          {/* Central Scrollable Conversation Stream */}
          <MessageList messages={activeMessages} isLoading={isSynthesizing} />

          {/* Bottom Prompt Bar with Mic & Send */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isSynthesizing}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
