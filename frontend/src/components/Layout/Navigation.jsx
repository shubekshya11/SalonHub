import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'services', label: 'Services' },
    { id: 'book', label: 'New Appointment' }
  ];

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #ddd' }}>
      <div className="container" style={{ padding: '0 1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #000080' : '2px solid transparent',
                color: activeTab === tab.id ? '#000080' : '#333',
                fontWeight: activeTab === tab.id ? 600 : 400
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