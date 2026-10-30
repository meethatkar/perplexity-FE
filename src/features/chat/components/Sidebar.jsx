import React from "react";
import Button from "../../../components/ui/Button";
import ChatListItem from "./ChatListItem";
import { PlusIcon, XIcon, SparklesIcon } from "./icons";

/**
 * Sidebar Component
 * Renders the brand header "PERPLEXITY | USERNAME", new chat action,
 * and maps through the chat list efficiently with memoized items.
 */
const Sidebar = ({
  chats = {},
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  username = "USERNAME",
  isOpen = false,
  onClose,
}) => {
  console.log("CHATTTT: ", chats);

  // Used to create list of objects into array.
  const chatList = React.useMemo(() => {
    if (!chats) return [];
    if (Array.isArray(chats)) return chats;
    return Object.entries(chats).map(([id, chat]) => ({
      _id: chat._id || id,
      ...chat,
    }));
  }, [chats]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col w-72 md:w-80 h-full p-4 bg-slate-900/95 md:bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Header: PERPLEXITY | USERNAME */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 text-white">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center font-bold tracking-wider text-xs uppercase">
              <span className="text-white">PERPLEXITY</span>
              <span className="mx-1.5 text-slate-500">|</span>
              <span
                className="text-indigo-400 truncate max-w-[110px]"
                title={username}
              >
                {username}
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="!p-1.5 text-slate-400 hover:text-white !rounded-lg md:hidden"
            aria-label="Close sidebar"
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="py-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onNewChat}
            className="flex items-center justify-center gap-2 w-full !py-3 !px-4 !rounded-2xl font-medium text-sm transition-all duration-200 active:scale-98 shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Thread</span>
          </Button>
        </div>

        {/* Chat History Section */}
        <div className="flex items-center justify-between px-1 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span>Recent Conversations</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {chatList.length}
          </span>
        </div>

        {/* Scrollable list mapping over chats */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {chatList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-slate-500 text-xs px-4">
              <p>No chat history yet.</p>
              <p className="mt-1">Start a new thread to get answers.</p>
            </div>
          ) : (
            chatList.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onSelect={onSelectChat}
                onDelete={onDeleteChat}
              />
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="pt-3 mt-auto border-t border-slate-800/80">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-slate-800/40 border border-slate-800 text-slate-300 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">Perplexity 3.0 Engine Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
