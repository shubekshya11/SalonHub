import React from 'react';
import { APPOINTMENT_STATUS } from '../../types';

const StatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case APPOINTMENT_STATUS.PENDING:
        return 'badge-pending';
      case APPOINTMENT_STATUS.CONFIRMED:
        return 'badge-confirmed';
      case APPOINTMENT_STATUS.COMPLETED:
        return 'badge-completed';
      case APPOINTMENT_STATUS.CANCELLED:
        return 'badge-cancelled';
      default:
        return '';
    }
  };

  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : '';

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {label}
    </span>
  );
};

export default StatusBadge;