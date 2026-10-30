import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

/**
 * MarkdownRenderer Component
 * Renders formatted markdown text with GitHub Flavored Markdown and custom styles.
 *
 * @param {string} content - Markdown content to render
 * @param {string} className - Optional container styling
 */
const MarkdownRenderer = ({ content = "", className = "" }) => {
  return (
    <div className={`markdown-content text-sm md:text-base leading-relaxed text-slate-200 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-5 mb-3 pb-1 border-b border-slate-800 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg md:text-xl font-bold text-indigo-100 mt-4 mb-2.5 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-semibold text-white mt-3.5 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm md:text-base font-semibold text-slate-100 mt-3 mb-1.5">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3.5 last:mb-0 leading-relaxed text-slate-200">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1.5 mb-3.5 text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1.5 mb-3.5 text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-slate-200 pl-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500/70 bg-indigo-950/20 px-4 py-2 my-3 rounded-r-2xl italic text-slate-300">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors font-medium"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-300">{children}</em>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-2xl border border-slate-800 bg-slate-950/40 custom-scrollbar">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800/60 text-slate-200 border-b border-slate-700/80 uppercase text-[11px] font-bold tracking-wider">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60">{children}</tbody>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-slate-200 border-r last:border-r-0 border-slate-700/60">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-slate-300 border-r last:border-r-0 border-slate-800/60">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-800/30 transition-colors">
              {children}
            </tr>
          ),
          hr: () => <hr className="my-5 border-slate-800" />,
          code: ({ inline, className, children, ...props }) => {
            const isInline =
              inline || (!className && !String(children).includes("\n"));
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-lg bg-slate-800/90 text-indigo-300 border border-slate-700/50 font-mono text-xs md:text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="font-mono text-xs md:text-sm text-indigo-200"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
};

export default React.memo(MarkdownRenderer);
