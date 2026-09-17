import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import Loading from '../components/UI/Loading';
import ErrorMessage from '../components/UI/ErrorMessage';
import { appointmentService } from '../services/appointmentService';
import { APPOINTMENT_STATUS } from '../types';

/**
 * DashboardPage Component
 * Main dashboard showing appointments
 * 
 * Why this component exists:
 * - Provides a single overview of appointments
 * - Practical for daily salon operations
 * - Simple and focused interface
 */

const DashboardPage = ({ onAddAppointment }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    loadAppointments();
    
    // Subscribe to appointment changes
    const unsubscribe = appointmentService.subscribe((updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    return () => unsubscribe();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = filterStatus
    ? appointments.filter(apt => apt.status === filterStatus)
    : appointments;

  const handleStatusChange = (appointmentId, newStatus) => {
    setStatusUpdates(prev => ({
      ...prev,
      [appointmentId]: newStatus
    }));
  };

  const handleUpdateStatus = async (appointmentId) => {
    const newStatus = statusUpdates[appointmentId];
    if (newStatus) {
      try {
        await appointmentService.updateAppointmentStatus(appointmentId, newStatus);
        setStatusUpdates(prev => {
          const updated = { ...prev };
          delete updated[appointmentId];
          return updated;
        });
      } catch (err) {
        setError('Failed to update appointment status');
      }
    }
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(appointmentId);
      } catch (err) {
        setError('Failed to delete appointment');
      }
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <Loading message="Loading appointments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <Card>
        <div className="section-header">
          <h2>Appointments</h2>
          <Button onClick={onAddAppointment} className="btn-primary">
            Add Appointment
          </Button>
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${!filterStatus ? 'active' : ''}`}
            onClick={() => setFilterStatus('')}
          >
            All
          </button>
          <button
            className={`filter-tab ${filterStatus === APPOINTMENT_STATUS.PENDING ? 'active' : ''}`}
            onClick={() => setFilterStatus(APPOINTMENT_STATUS.PENDING)}
          >
            Pending
          </button>
          <button
            className={`filter-tab ${filterStatus === APPOINTMENT_STATUS.CONFIRMED ? 'active' : ''}`}
            onClick={() => setFilterStatus(APPOINTMENT_STATUS.CONFIRMED)}
          >
            Confirmed
          </button>
          <button
            className={`filter-tab ${filterStatus === APPOINTMENT_STATUS.COMPLETED ? 'active' : ''}`}
            onClick={() => setFilterStatus(APPOINTMENT_STATUS.COMPLETED)}
          >
            Completed
          </button>
          <button
            className={`filter-tab ${filterStatus === APPOINTMENT_STATUS.CANCELLED ? 'active' : ''}`}
            onClick={() => setFilterStatus(APPOINTMENT_STATUS.CANCELLED)}
          >
            Cancelled
          </button>
        </div>

        {filteredAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            {filterStatus ? `No ${filterStatus.toLowerCase()} appointments found` : 'No appointments yet'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{appointment.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{appointment.customerPhone}</div>
                    </td>
                    <td>{appointmentService.getServiceName(appointment.serviceId)}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <select
                          value={statusUpdates[appointment.id] || ''}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '3px'
                          }}
                        >
                          <option value="">Update Status</option>
                          {Object.values(APPOINTMENT_STATUS).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        {statusUpdates[appointment.id] && (
                          <Button
                            variant="success"
                            onClick={() => handleUpdateStatus(appointment.id)}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          >
                            Save
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(appointment.id)}
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;