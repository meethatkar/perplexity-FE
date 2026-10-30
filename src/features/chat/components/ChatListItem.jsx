import React from "react";
import Button from "../../../components/ui/Button";
import { MessageSquareIcon, TrashIcon } from "./icons";

/**
 * ChatListItem Component
 * Memoized chat history list item with active/hover states
 */
const ChatListItem = ({ chat, isActive, onSelect, onDelete }) => {
  const handleClick = () => {
    onSelect(chat._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(chat._id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex items-center justify-between w-full px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 text-sm font-medium border ${
        isActive
          ? "bg-indigo-600/20 text-white border-indigo-500/50 shadow-md shadow-indigo-500/10"
          : "bg-slate-800/40 text-slate-300 border-slate-700/60 hover:bg-slate-800/80 hover:text-white hover:border-slate-600"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <MessageSquareIcon
          className={`w-4 h-4 shrink-0 transition-colors ${
            isActive
              ? "text-indigo-400"
              : "text-slate-400 group-hover:text-slate-200"
          }`}
        />
        <span className="truncate">{chat.title}</span>
      </div>

      {onDelete && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          title="Delete chat"
          className="opacity-0 group-hover:opacity-100 !p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 !rounded-lg transition-all"
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
};

// Memoize to prevent re-render when other chat items or parent props change
export default React.memo(ChatListItem);
