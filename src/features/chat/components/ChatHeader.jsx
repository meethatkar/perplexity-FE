import React from "react";
import Button from "../../../components/ui/Button";
import { MenuIcon, SparklesIcon } from "./icons";

/**
 * ChatHeader Component
 * Top navigation bar inside the main view with mobile sidebar toggle and status
 */
const ChatHeader = ({ activeChatTitle, onToggleSidebar, username }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="!p-2 text-slate-400 hover:text-white !rounded-xl md:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon className="w-5 h-5" />
        </Button>

        <div>
          <h2 className="text-base md:text-lg font-extrabold text-white tracking-wide truncate max-w-[240px] sm:max-w-md">
            {activeChatTitle || "New Conversation"}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">Perplexity Deep Research</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
          <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Model: Perplexity-Pro</span>
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 uppercase" title={username}>
          {username ? username[0] : "U"}
        </div>
      </div>
    </header>
  );
};

export default React.memo(ChatHeader);
