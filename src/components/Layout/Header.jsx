import React from 'react';

const Header = ({ onAddAppointment }) => {
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
        {onAddAppointment && (
          <button 
            onClick={onAddAppointment}
            className="btn btn-primary"
            style={{ backgroundColor: 'white', color: '#000080', borderColor: 'white' }}
          >
            Add Appointment
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;