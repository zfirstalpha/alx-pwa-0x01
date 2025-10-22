import React from "react";

interface LayoutButtonProps {
  text?: string;
  onClick?: () => void;
}

const LayoutButton: React.FC<LayoutButtonProps> = ({ text = "Click", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      {text}
    </button>
  );
};

export default LayoutButton;
