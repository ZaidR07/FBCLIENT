import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const VendorButton: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors';
  const variantStyles = {
    default: 'bg-[#FF5D00] text-white hover:bg-[#E65400]',
    outline: 'border border-[#FF5D00] text-[#FF5D00] hover:bg-orange-50',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
