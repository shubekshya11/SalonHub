import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAppointments, services } from '../data/mockData';

const AppointmentContext = createContext();

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(initialAppointments);
        setError(null);
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'Pending'
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    return service ? service.name : 'Unknown Service';
  };

  const value = {
    appointments,
    loading,
    error,
    addAppointment,
    deleteAppointment,
    updateStatus,
    getServiceName
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};