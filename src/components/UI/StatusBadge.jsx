import React from 'react';
import { APPOINTMENT_STATUS } from '../../types';

/**
 * StatusBadge Component
 * Displays appointment status with appropriate color coding
 * 
 * Why this component exists:
 * - Centralizes status display logic
 * - Ensures consistent styling across the application
 * - Makes it easy to change status colors/design in one place
 * - Reusable wherever appointment status needs to be shown
 */

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

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;