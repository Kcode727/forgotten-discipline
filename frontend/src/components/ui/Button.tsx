import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 border border-white text-white tracking-widest uppercase text-sm transition-all duration-300 hover:bg-white hover:text-black"
    >
      {children}
    </button>
  );
};

export default Button;