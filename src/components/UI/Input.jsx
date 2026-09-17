import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, error = '', name }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
          {label}
          {required && <span style={{ color: '#dc2626', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;