
import React from 'react';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
}

export const CustomCard = ({ children, className = '' }: CustomCardProps) => (
  <div className={`rounded-lg border bg-card shadow-sm ${className}`}>
    {children}
  </div>
);

export const CustomCardHeader = ({ children, className = '' }: CustomCardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

export const CustomCardContent = ({ children, className = '' }: CustomCardProps) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const CustomCardFooter = ({ children, className = '' }: CustomCardProps) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);
