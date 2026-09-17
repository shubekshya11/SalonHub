import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'book', label: 'Book Appointment' },
    { id: 'appointments', label: 'Appointments' }
  ];

  return (
    <nav style={{ background: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
      <div className="container" style={{ padding: '0 1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '0.75rem 1rem',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#4b5563',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = '#4b5563';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;