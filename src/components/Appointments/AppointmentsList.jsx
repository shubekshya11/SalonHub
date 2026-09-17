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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card title="Appointments Management">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading appointments...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Appointments Management">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Appointments Management">
      <div className="mb-6">
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
        <div className="text-center py-8 text-gray-500">
          {filterStatus ? `No ${filterStatus.toLowerCase()} appointments found` : 'No appointments yet'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.customerPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getServiceName(appointment.serviceId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <div className="flex items-center space-x-1">
                        <select
                          value={statusUpdates[appointment.id] || ''}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            className="px-2 py-1 text-xs"
                          >
                            Save
                          </Button>
                        )}
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(appointment.id)}
                        className="px-2 py-1 text-xs"
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