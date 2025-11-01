import React, { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const CustomButton = ({
  children,
  className = "",
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus:ring-[#FF5D00] bg-[#FF5D00] text-white hover:bg-[#FF5D00]/90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
