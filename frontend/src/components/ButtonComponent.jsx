// src/components/Button.jsx
import React from 'react';
import './Button.css'; // Import styles for the button (optional)

// Reusable Button Component
const Button = ({ text, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
