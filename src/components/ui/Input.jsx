import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, required = false, ...props }) => {
  return (
    <div className="flex flex-col mb-5">
      {label && (
        <label htmlFor={id} className="mb-2 text-sm font-semibold tracking-wide text-gray-300 uppercase">
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
        className="w-full px-4 py-3 text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-xl outline-none backdrop-blur-md focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 placeholder-gray-500"
        {...props}
      />
    </div>
  );
};

export default Input;
