import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { SparklesIcon } from "./icons";

/**
 * MessageList Component
 * Efficiently maps over the messages list with auto-scroll on updates
 */
const MessageList = ({ messages = [], isLoading = false, chatTitle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6 text-slate-400">
        <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
          <SparklesIcon className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">
          Where knowledge begins
        </h3>
        <p className="mt-1 text-sm text-slate-400 max-w-sm">
          Ask a question to search the web, synthesize answers, and organize
          your ideas.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full max-w-350 mx-auto p-4 md:p-6 overflow-y-auto custom-scrollbar"
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={message._id || message.id || index}
          message={message}
          chatTitle={chatTitle}
        />
      ))}

      {/* Prominent AI Response Loading State */}
      {isLoading && (
        <div className="w-full max-w-6xl mb-8">
          <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/70 text-slate-100 shadow-xl transition-all">
            {/* Header: AI Thinking */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                  <SparklesIcon className="w-4 h-4 animate-spin" />
                </div>
                <div className="text-base md:text-lg font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-200 uppercase truncate">
                  Searching & Synthesizing...
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 shrink-0 ml-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Thinking</span>
              </div>
            </div>

            {/* AI Response Skeleton Shimmer lines */}
            <div className="space-y-3.5 py-3">
              <div className="h-4 bg-slate-800/80 rounded-lg w-4/5 animate-pulse" />
              <div className="h-4 bg-slate-800/60 rounded-lg w-full animate-pulse" />
              <div className="h-4 bg-slate-800/70 rounded-lg w-11/12 animate-pulse" />
              <div className="h-4 bg-slate-800/50 rounded-lg w-3/5 animate-pulse" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-800/80 text-xs text-slate-500">
              <span className="text-[11px]">
                Perplexity AI Engine Processing
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MessageList);
