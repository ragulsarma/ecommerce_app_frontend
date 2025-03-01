import React from 'react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success';
}

export default function Alert({ message, type = "error" }: AlertProps) {
  const bgColor = type === "error" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700";
  
  return message ? (
    <div className={`${bgColor} px-4 py-3 rounded border mb-4`} role="alert">
      <p>{message}</p>
    </div>
  ) : null;
}