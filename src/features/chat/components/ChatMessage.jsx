import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import { SparklesIcon, CopyIcon, CheckIcon, GlobeIcon } from "./icons";
import { formatChatTitle } from "../utils/formatTitle";
import MarkdownRenderer from "./MarkdownRenderer";

/**
 * ChatMessage Component
 * Reusable message bubble supporting both right-aligned User messages
 * and large, prominent AI messages formatted with MarkdownRenderer.
 */
const ChatMessage = ({ message, chatTitle, onSelectSuggestion }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end w-full mb-6">
        <div className="max-w-[85%] md:max-w-xl group">
          <div className="flex items-center justify-end gap-2 mb-1.5 px-1">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              USER Message
            </span>
            {message.timestamp && (
              <span className="text-[11px] text-slate-400">
                {message.timestamp}
              </span>
            )}
          </div>
          {/* User message pill */}
          <div className="px-5 py-3.5 rounded-2xl rounded-tr-sm bg-slate-800 text-slate-100 border border-slate-700/80 text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap shadow-sm">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  // Assistant / AI Message (Large box in center, matching the sketch)
  return (
    <div className="w-full max-w-6xl mb-8">
      {/* Main AI Box Container */}
      <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-slate-100 shadow-lg transition-all">
        {/* Main Section Heading: AI Title / Heading formatted in Markdown */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 shrink-0">
              <SparklesIcon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-sm md:text-base font-semibold tracking-wide text-slate-200 uppercase truncate">
              {formatChatTitle(message.title || chatTitle || "AI MESSAGE")}
            </div>
          </div>
          {message.timestamp && (
            <span className="text-xs text-slate-400 shrink-0 ml-2">
              {message.timestamp}
            </span>
          )}
        </div>

        {/* Sources / Citations list */}
        {message.sources && message.sources.length > 0 && (
          <div className="mb-5 pb-4 border-b border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <GlobeIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Sources</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer group"
                  title={source.url || source.title}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-indigo-300 font-bold">
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[120px] md:max-w-[160px] group-hover:text-white">
                    {source.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Answer Content: Formatted via MarkdownRenderer Component */}
        <MarkdownRenderer content={message.content} />

        {/* Follow-up Questions / Suggestions (Perplexity-style) */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Related Questions</span>
            </div>
            <div className="flex flex-col gap-2">
              {message.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    onSelectSuggestion && onSelectSuggestion(suggestion)
                  }
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-slate-800/40 hover:bg-indigo-950/40 border border-slate-700/60 hover:border-indigo-500/40 text-left text-xs md:text-sm text-slate-300 hover:text-white transition-all group cursor-pointer shadow-sm"
                >
                  <span className="line-clamp-1">{suggestion}</span>
                  <span className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all text-sm font-semibold ml-2">
                    +
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Box Action Footer */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="subtle"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1.5 !px-3 !py-1.5 !rounded-xl text-slate-300 hover:text-white"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>

          <span className="text-[11px] text-slate-500">
            Synthesized with aether-ai Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
