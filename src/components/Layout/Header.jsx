import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Salon Appointment System</h1>
        <p className="text-purple-100 mt-1">Manage your salon bookings efficiently</p>
      </div>
    </header>
  );
};

export default Header;