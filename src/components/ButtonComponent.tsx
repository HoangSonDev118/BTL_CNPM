import React from 'react';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
  content: React.ReactNode;
  type: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ 
  content, 
  type, 
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseStyles = "w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const typeStyles = {
    primary: disabled 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-0.5",
    secondary: disabled
      ? "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
      : "bg-white text-rose-500 border-2 border-rose-500 hover:bg-rose-50 hover:shadow-md transform hover:-translate-y-0.5"
  };

  return (
    <button
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ButtonComponent;