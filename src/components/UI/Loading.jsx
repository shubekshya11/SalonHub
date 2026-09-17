import React from 'react';

/**
 * Loading Component
 * Displays a loading spinner with optional message
 * 
 * Why this component exists:
 * - Provides consistent loading state UI across the application
 * - Centralizes loading animation logic
 * - Reusable for any async operation
 * - Improves user experience during data fetching
 */

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>{message}</span>
    </div>
  );
};

export default Loading;