import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Select from '../UI/Select';
import { statusOptions } from '../../data/mockData';
import { useAppointmentContext } from '../../context/AppointmentContext';

const AppointmentsList = () => {
  const {
    appointments,
    loading,
    error,
    deleteAppointment,
    updateStatus,
    getServiceName
  } = useAppointmentContext();

  const [filterStatus, setFilterStatus] = useState('');
  const [statusUpdates, setStatusUpdates] = useState({});

  const filteredAppointments = filterStatus
    ? appointments.filter(apt => apt.status === filterStatus)
    : appointments;

  const handleStatusChange = (appointmentId, newStatus) => {
    setStatusUpdates(prev => ({
      ...prev,
      [appointmentId]: newStatus
    }));
  };

  const handleUpdateStatus = (appointmentId) => {
    const newStatus = statusUpdates[appointmentId];
    if (newStatus) {
      updateStatus(appointmentId, newStatus);
      setStatusUpdates(prev => {
        const updated = { ...prev };
        delete updated[appointmentId];
        return updated;
      });
    }
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(appointmentId);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-pending';
      case 'Confirmed':
        return 'badge-confirmed';
      case 'Completed':
        return 'badge-completed';
      case 'Cancelled':
        return 'badge-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <Card title="Appointments Management">
        <div className="loading">
          <div className="spinner"></div>
          <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>Loading appointments...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Appointments Management">
        <div className="error-message">
          {error}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Appointments Management">
      <div style={{ marginBottom: '1.5rem' }}>
        <Select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={[
            { value: '', label: 'All Statuses' },
            ...statusOptions.map(status => ({ value: status, label: status }))
          ]}
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          {filterStatus ? `No ${filterStatus.toLowerCase()} appointments found` : 'No appointments yet'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
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
                  <td style={{ fontWeight: 500 }}>{appointment.customerName}</td>
                  <td>{appointment.customerPhone}</td>
                  <td>{getServiceName(appointment.serviceId)}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                        <select
                          value={statusUpdates[appointment.id] || ''}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            padding: '0.25rem 0.5rem',
                            background: 'white'
                          }}
                        >
                          <option value="">Update Status</option>
                          {statusOptions.map(status => (
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
                      </div>
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
  );
};

export default AppointmentsList;