import React from 'react';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{title}</h2>}
      {children}
    </div>
  );
};

export default Card;