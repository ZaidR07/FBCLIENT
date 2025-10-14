interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-8 h-8 border-4",
  };

  return (
    <span
      className={`animate-spin inline-block ${sizeClasses[size]} border-t-transparent border-orange-500 rounded-full ${className}`}
    ></span>
  );
};
