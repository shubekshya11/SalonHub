import { useState } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'services':
        return <ServicesPage />;
      case 'book':
        return <BookAppointmentPage onComplete={() => setActiveTab('dashboard')} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;