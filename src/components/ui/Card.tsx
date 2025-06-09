import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  const baseClasses =
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-all duration-200 p-6";
  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";

  const finalClassName = [baseClasses, hoverClasses, className]
    .filter(Boolean)
    .join(" ");

  return <div className={finalClassName}>{children}</div>;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-gray-400 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
