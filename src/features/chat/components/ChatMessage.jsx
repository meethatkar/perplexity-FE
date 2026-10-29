import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import { SparklesIcon, CopyIcon, CheckIcon, GlobeIcon } from "./icons";

/**
 * ChatMessage Component
 * Reusable message bubble supporting both right-aligned User messages
 * and large, prominent AI messages matching the wireframe sketch.
 */
const ChatMessage = ({ message }) => {
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
          {/* User message pill matching sketch top-right placement */}
          <div className="px-6 py-4 rounded-3xl rounded-tr-md bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20 border border-indigo-400/30 text-sm md:text-base leading-relaxed break-words">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  // Assistant / AI Message (Large box in center, matching the sketch)
  return (
    <div className="w-full mb-8">
      {/* Main AI Box Container matching wireframe */}
      <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/70 text-slate-100 shadow-xl transition-all">
        {/* Main Section Heading: AI MESSAGE */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base md:text-lg font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-200 uppercase">
              AI MESSAGE
            </h3>
          </div>
          {message.timestamp && (
            <span className="text-xs text-slate-400">{message.timestamp}</span>
          )}
        </div>
        {/* Perplexity Sources / Citations list mapped efficiently */}
        {message.sources && message.sources.length > 0 && (
          <div className="mb-5 pb-4 border-b border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <GlobeIcon className="w-3.5 h-3.5 text-indigo-400" />
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

        {/* AI Answer Content */}
        <div className="text-sm md:text-base leading-relaxed text-slate-200 space-y-3 whitespace-pre-wrap">
          {message.content}
        </div>

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
            Synthesized with Perplexity Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
