import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "sos";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const baseStyles = "min-h-[48px] px-6 rounded-xl font-medium text-[15px] tracking-[0.2px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
    secondary: "bg-secondary text-white hover:opacity-90 focus:ring-secondary",
    sos: "bg-sos text-white font-bold hover:bg-red-800 focus:ring-sos",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}