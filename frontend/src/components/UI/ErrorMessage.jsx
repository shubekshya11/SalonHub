import React from 'react';

const ErrorMessage = ({ message, onDismiss }) => {
  return (
    <div className="error-message" style={{ position: 'relative' }}>
      {message}
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#991b1b',
            cursor: 'pointer',
            fontSize: '1.25rem',
            lineHeight: 1
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;