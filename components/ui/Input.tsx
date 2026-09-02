import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        className="rounded-xl border border-border px-4 py-[14px] bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
        {...props}
      />
    </div>
  );
}