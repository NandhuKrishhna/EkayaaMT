import React, { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "cursor-pointer inline-flex items-center justify-center rounded-md font-semibold shadow-sm ring-1 ring-inset transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 ring-blue-600 focus-visible:outline-blue-600 border-none",
    secondary:
      "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline-slate-600",
    danger:
      "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 ring-red-100 dark:ring-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 focus-visible:outline-red-600",
  };

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-6 py-2 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
