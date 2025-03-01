import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ 
  children, 
  type = "button", 
  className = "", 
  ...props 
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}