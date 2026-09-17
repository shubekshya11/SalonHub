import { useState } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import ServicesList from './components/Services/ServicesList';
import AppointmentForm from './components/Appointments/AppointmentForm';
import AppointmentsList from './components/Appointments/AppointmentsList';
import { AppointmentProvider } from './context/AppointmentContext';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('services');

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesList />;
      case 'book':
        return <AppointmentForm />;
      case 'appointments':
        return <AppointmentsList />;
      default:
        return <ServicesList />;
    }
  };

  return (
    <AppointmentProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container" style={{ padding: '2rem 1rem' }}>
          {renderContent()}
        </main>
      </div>
    </AppointmentProvider>
  );
}

export default App;