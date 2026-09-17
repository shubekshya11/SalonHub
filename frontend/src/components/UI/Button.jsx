import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, style = {}, className = '' }) => {
  const baseStyles = 'btn';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;