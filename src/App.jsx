import { useState } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAddAppointment = () => {
    setActiveTab('book');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onAddAppointment={handleAddAppointment} />;
      case 'services':
        return <ServicesPage />;
      case 'book':
        return <BookAppointmentPage onComplete={() => setActiveTab('dashboard')} />;
      default:
        return <DashboardPage onAddAppointment={handleAddAppointment} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header onAddAppointment={activeTab === 'dashboard' ? handleAddAppointment : null} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;