import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
        <svg 
            className="h-full w-auto"
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9.39V21H5V9.39L4 8.39V7.39L5 6.39V4H6V6.39L12 1.39L18 6.39V4H19V6.39L20 7.39V8.39L19 9.39ZM8.5 13C8.5 12.45 8.95 12 9.5 12H14.5C15.05 12 15.5 12.45 15.5 13C15.5 14.1 14.6 15 13.5 15H10.5C9.4 15 8.5 14.1 8.5 13ZM16.5 16H7.5C6.95 16 6.5 16.45 6.5 17V17C6.5 17.55 6.95 18 7.5 18H16.5C17.05 18 17.5 17.55 17.5 17V17C17.5 16.45 17.05 16 16.5 16ZM15.5 19C15.5 19.55 15.05 20 14.5 20H9.5C8.95 20 8.5 19.55 8.5 19V19C8.5 18.45 8.95 18 9.5 18H14.5C15.05 18 15.5 18.45 15.5 19V19Z M17 10H7V11H17V10Z"/>
        </svg>
      <span className="text-2xl font-bold tracking-tight">Food Store</span>
    </div>
  );
};

export default Logo;