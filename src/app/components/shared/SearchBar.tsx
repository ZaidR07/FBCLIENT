"use client";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}: SearchBarProps) => {
  return (
    <input
      type="search"
      className={`border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-xl px-4 py-2 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
