import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-content gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg hover:shadow-[#C6FF00]/20",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline:
      "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 hover:border-[#C6FF00] dark:hover:border-[#C6FF00]",
    ghost:
      "bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800 hover:text-[#C6FF00] dark:hover:text-[#C6FF00]",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const finalClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    loading && "opacity-75 cursor-wait",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
