import React from "react";
import ErrorMessageProps from "@/interfaces/ErrorMessageProps";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null; // Don't render if no message is provided
  return (
    <div className={`flex items-center gap-2 p-4 my-2 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-800 dark:border-red-800`} role="alert">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
}