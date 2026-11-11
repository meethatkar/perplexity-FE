import React from "react";
import Button from "../../../components/ui/Button";
import { MenuIcon, SparklesIcon, LogOutIcon } from "./icons";
import { formatChatTitle } from "../utils/formatTitle";
import PromptNavigator from "./PromptNavigator";

/**
 * ChatHeader Component
 * Top navigation bar inside the main view with mobile sidebar toggle, status and logout
 */
const ChatHeader = ({
  activeChatTitle,
  onToggleSidebar,
  username,
  onLogout,
  prompts = [],
  onSelectPrompt,
}) => {
  const displayTitle = activeChatTitle
    ? formatChatTitle(activeChatTitle)
    : "New Conversation";

  return (
    <header className="relative z-30 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md shrink-0">
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
          <h2 className="text-base md:text-lg font-extrabold text-white tracking-wide truncate max-w-[240px] sm:max-w-md" title={displayTitle}>
            {displayTitle}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">aether-ai Engine</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggleable Prompt List Navigator */}
        {prompts.length > 0 && (
          <PromptNavigator
            prompts={prompts}
            onSelectPrompt={onSelectPrompt}
          />
        )}

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
          <SparklesIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>Model: aether-pro</span>
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs shadow-sm uppercase" title={username}>
          {username ? username[0] : "U"}
        </div>

        {onLogout && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onLogout}
            title="Log out"
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 !rounded-xl text-xs px-2.5 py-1.5 transition-colors border border-slate-800 hover:border-rose-500/30"
          >
            <LogOutIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default React.memo(ChatHeader);
