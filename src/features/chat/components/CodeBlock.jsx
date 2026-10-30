import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

// Helper to extract plain text from React nodes for code copy
const extractText = (node) => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
};

/**
 * CodeBlock Component
 * Renders a stylized code block with copy-to-clipboard functionality.
 *
 * @param {React.ReactNode} children - Code elements or string content
 */
const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCodeCopy = () => {
    const text = extractText(children);
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 overflow-hidden shadow-inner group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
          Snippet
        </span>
        <button
          type="button"
          onClick={handleCodeCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto custom-scrollbar font-mono text-xs md:text-sm text-indigo-200 leading-relaxed">
        {children}
      </pre>
    </div>
  );
};

export default React.memo(CodeBlock);
