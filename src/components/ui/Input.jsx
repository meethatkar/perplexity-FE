import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 text-xs font-medium tracking-wide text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-900/80 border border-slate-700/80 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-slate-500 focus:bg-slate-900 focus:ring-1 focus:ring-slate-500 disabled:opacity-50"
        {...props}
      />
      {error && <span className="mt-1 text-xs text-rose-400">{error}</span>}
    </div>
  );
};

export default Input;
