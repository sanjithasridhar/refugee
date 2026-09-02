import React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface rounded-2xl p-4 sm:p-5 shadow-soft ${className || ""}`}>
      {children}
    </div>
  );
}