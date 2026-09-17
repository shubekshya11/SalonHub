import React from 'react';

/**
 * ErrorMessage Component
 * Displays error messages with consistent styling
 * 
 * Why this component exists:
 * - Provides consistent error display across the application
 * - Centralizes error message styling
 * - Reusable for form validation errors, API errors, etc.
 * - Improves user experience with clear error communication
 */

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