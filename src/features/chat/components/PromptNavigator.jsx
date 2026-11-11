import React, { useState, useRef, useEffect } from "react";
import { ListFilterIcon, ChevronDownIcon, MessageSquareIcon } from "./icons";

/**
 * PromptNavigator Component
 * Floating toggleable dropdown on the main chat area that lists
 * all user prompts/questions in the active thread and scrolls directly to them.
 */
const PromptNavigator = ({ prompts = [], onSelectPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!prompts || prompts.length === 0) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-200 shadow-sm hover:shadow"
        title="View all prompts in this conversation"
      >
        <ListFilterIcon className="w-4 h-4 text-indigo-400" />
        <span>Prompts</span>
        <span className="flex items-center justify-center px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] sm:text-xs">
          {prompts.length}
        </span>
        <ChevronDownIcon
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-indigo-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-84 max-h-80 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black py-2 z-50 custom-scrollbar animate-fadeIn">
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Jump to Prompt ({prompts.length})
            </span>
          </div>

          <div className="py-1">
            {prompts.map((p, idx) => (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => {
                  onSelectPrompt(p.id || idx);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 group"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-md bg-slate-800 group-hover:bg-indigo-600/20 border border-slate-700 group-hover:border-indigo-500/40 text-slate-400 group-hover:text-indigo-300 shrink-0 mt-0.5 text-[10px] font-mono">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-slate-200 group-hover:text-white line-clamp-2 break-words leading-snug">
                    {p.content}
                  </p>
                  {p.time && (
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {new Date(p.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PromptNavigator);

