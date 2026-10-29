import React, { useState, useRef } from "react";
import Button from "../../../components/ui/Button";
import { MicIcon, SendIcon } from "./icons";

/**
 * ChatInput Component
 * Input bar matching the wireframe: prompt input, mic icon button, and send button.
 */
const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!prompt.trim() || disabled) return;

    onSendMessage(prompt.trim());
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextChange = (e) => {
    setPrompt(e.target.value);
    // Auto-adjust height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140,
      )}px`;
    }
  };

  const toggleMic = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <div className="w-full max-w-350 mx-auto p-4 pt-1">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-2 p-2.5 sm:p-3 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-black/50 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
      >
        {/* Multiline Prompt Input Area */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          placeholder={
            isListening
              ? "Listening... Speak your prompt"
              : "Enter your prompt here..."
          }
          className="flex-1 max-h-36 px-3 py-1.5 bg-transparent border-0 text-slate-100 placeholder-slate-400 text-sm md:text-base focus:outline-none resize-none overflow-y-auto custom-scrollbar"
        />

        {/* Action Buttons: Mic Icon + Send Button (Faithful to the sketch) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mic Icon Button using reusable Button */}
          <Button
            type="button"
            variant={isListening ? "danger" : "secondary"}
            size="icon"
            onClick={toggleMic}
            title={isListening ? "Stop listening" : "Voice input"}
            className={`w-10 h-10 !rounded-2xl transition-all ${
              isListening
                ? "!bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse shadow-md shadow-rose-500/20"
                : ""
            }`}
          >
            <MicIcon className="w-5 h-5" />
          </Button>

          {/* Send Button using reusable Button */}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!prompt.trim() || disabled}
            className="flex items-center justify-center gap-1.5 !px-4 !h-10 !rounded-2xl uppercase tracking-wider text-xs font-semibold"
          >
            <span>send</span>
            <SendIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      </form>

      {/* Helpful shortcut info */}
      <div className="flex items-center justify-between px-4 mt-2 text-[11px] text-slate-500">
        <span>
          Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            Shift+Enter
          </kbd>{" "}
          for new line
        </span>
        <span className="hidden sm:inline">Perplexity Search Ready</span>
      </div>
    </div>
  );
};

export default React.memo(ChatInput);
