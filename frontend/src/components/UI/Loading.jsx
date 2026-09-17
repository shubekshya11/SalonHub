import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>{message}</span>
    </div>
  );
};

export default Loading;