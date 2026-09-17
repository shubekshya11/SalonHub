import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: '#000080',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container" style={{ padding: '1.5rem 1rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0 }}>Salon Appointment System</h1>
        <p style={{ color: '#e0e7ff', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>Manage your salon bookings efficiently</p>
      </div>
    </header>
  );
};

export default Header;