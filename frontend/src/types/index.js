/**
 * Service type definition
 * @typedef {Object} Service
 * @property {number} id - Unique identifier
 * @property {string} name - Service name
 * @property {number} price - Price in NPR
 * @property {number} duration - Duration in minutes
 */

/**
 * Appointment type definition
 * @typedef {Object} Appointment
 * @property {number} id - Unique identifier
 * @property {string} customerName - Customer's full name
 * @property {string} customerPhone - Customer's phone number
 * @property {number} serviceId - ID of the booked service
 * @property {string} date - Appointment date (YYYY-MM-DD format)
 * @property {string} time - Appointment time (HH:MM format)
 * @property {string} notes - Additional notes
 * @property {string} status - Appointment status
 */

/**
 * Status options for appointments
 */
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

/**
 * Form data type for appointment creation
 * @typedef {Object} AppointmentFormData
 * @property {string} customerName
 * @property {string} customerPhone
 * @property {string} serviceId
 * @property {string} date
 * @property {string} time
 * @property {string} notes
 */

/**
 * Validation error type
 * @typedef {Object} ValidationError
 * @property {string} [customerName]
 * @property {string} [customerPhone]
 * @property {string} [serviceId]
 * @property {string} [date]
 * @property {string} [time]
 */