import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: '#000080',
      color: 'white',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 1rem'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Salon Booking</h1>
      </div>
    </header>
  );
};

export default Header;
