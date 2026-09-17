import { get, post, put, patch, del } from '../utils/apiClient';

const APPOINTMENTS_ENDPOINT = '/appointments/';

function toApiPayload(appointmentData) {
  const { serviceId, ...rest } = appointmentData;
  const payload = { ...rest };

  if (serviceId !== undefined && serviceId !== null && serviceId !== '') {
    payload.service = Number(serviceId);
  } else if (appointmentData.service !== undefined) {
    payload.service = Number(appointmentData.service);
  }

  return payload;
}

/**
 * Normalize API appointment into the shape the UI expects.
 */
function fromApiAppointment(appointment) {
  if (!appointment) return appointment;
  return {
    ...appointment,
    serviceId: appointment.serviceId ?? appointment.service,
    serviceName: appointment.serviceName ?? appointment.service_name,
  };
}

/**
 * Get all appointments with optional filtering
 * @param {Object} filters - Filter criteria
 * @param {string} filters.status - Filter by status
 * @returns {Promise<Array>} Array of appointments
 * @throws {ApiError} If the request fails
 */
export async function getAppointments(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = queryString ? `${APPOINTMENTS_ENDPOINT}?${queryString}` : APPOINTMENTS_ENDPOINT;
  const data = await get(endpoint);
  return Array.isArray(data) ? data.map(fromApiAppointment) : data;
}

/**
 * Get a single appointment by ID
 * @param {number} id - Appointment ID
 * @returns {Promise<Object>} Appointment object
 * @throws {ApiError} If the request fails
 */
export async function getAppointmentById(id) {
  return fromApiAppointment(await get(`${APPOINTMENTS_ENDPOINT}${id}/`));
}

/**
 * Create a new appointment
 * @param {Object} appointmentData 
 * @param {string} appointmentData.customerName 
 * @param {string} appointmentData.customerPhone 
 * @param {number} appointmentData.serviceId 
 * @param {string} appointmentData.date 
 * @param {string} appointmentData.time 
 * @param {string} appointmentData.notes 
 * @returns {Promise<Object>} 
 * @throws {ApiError} 
 */
export async function createAppointment(appointmentData) {
  return fromApiAppointment(
    await post(APPOINTMENTS_ENDPOINT, toApiPayload(appointmentData))
  );
}

/**
 * Update an appointment
 * @param {number} id 
 * @param {Object} appointmentData 
 * @returns {Promise<Object>} 
 * @throws {ApiError}
 */
export async function updateAppointment(id, appointmentData) {
  return fromApiAppointment(
    await put(`${APPOINTMENTS_ENDPOINT}${id}/`, toApiPayload(appointmentData))
  );
}

/**
 * Update appointment status
 * @param {number} id 
 * @param {string} status 
 * @returns {Promise<Object>} 
 * @throws {ApiError} 
 */
export async function updateAppointmentStatus(id, status) {
  return fromApiAppointment(
    await patch(`${APPOINTMENTS_ENDPOINT}${id}/status/`, { status })
  );
}

/**
 * Delete an appointment
 * @param {number} id 
 * @returns {Promise<void>}
 * @throws {ApiError} If the request fails
 */
export async function deleteAppointment(id) {
  return del(`${APPOINTMENTS_ENDPOINT}${id}/`);
}

export default {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
