import React from 'react';

const Button = ({ children, variant = 'primary', type = 'button', onClick, className = '', ...props }) => {
  const baseClasses = 'relative px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl overflow-hidden group active:scale-95 shadow-lg';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-indigo-500/30',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-rose-500/30',
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 h-full w-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
};

export default Button;
