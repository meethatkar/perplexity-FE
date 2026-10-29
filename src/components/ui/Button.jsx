import React from "react";

/**
 * Reusable Button Component
 * Supports multiple design variants, flexible sizing, memoization, and custom classes.
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl overflow-hidden group active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeClasses = {
    md: "px-6 py-3 text-sm md:text-base",
    sm: "px-3.5 py-1.5 text-xs",
    xs: "px-2 py-1 text-xs",
    icon: "p-2",
    none: "",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-indigo-500/30 text-white shadow-lg",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-rose-500/30 text-white shadow-lg",
    secondary:
      "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 shadow-sm",
    outline:
      "bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/40 shadow-sm",
    ghost:
      "bg-transparent hover:bg-slate-800/80 text-slate-400 hover:text-white shadow-none",
    subtle:
      "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 shadow-none",
  };

  const selectedSize = sizeClasses[size] !== undefined ? sizeClasses[size] : sizeClasses.md;
  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${selectedSize} ${selectedVariant} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
      <div className="absolute inset-0 h-full w-full bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default React.memo(Button);
