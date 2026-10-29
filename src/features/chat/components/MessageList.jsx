import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { SparklesIcon } from "./icons";

/**
 * MessageList Component
 * Efficiently maps over the messages list with auto-scroll on updates
 */
const MessageList = ({ messages = [], isLoading = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
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
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm animate-pulse w-fit">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
          <span>Synthesizing response...</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(MessageList);
