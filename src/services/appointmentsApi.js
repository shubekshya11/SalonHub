/**
 * Appointments API
 * API functions for appointment-related operations
 */

import { get, post, patch, del, ApiError } from '../utils/apiClient';

const APPOINTMENTS_ENDPOINT = '/appointments';

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
  return get(endpoint);
}

/**
 * Get a single appointment by ID
 * @param {number} id - Appointment ID
 * @returns {Promise<Object>} Appointment object
 * @throws {ApiError} If the request fails
 */
export async function getAppointmentById(id) {
  return get(`${APPOINTMENTS_ENDPOINT}/${id}`);
}

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment data
 * @param {string} appointmentData.customerName - Customer name
 * @param {string} appointmentData.customerPhone - Customer phone
 * @param {number} appointmentData.serviceId - Service ID
 * @param {string} appointmentData.date - Appointment date (YYYY-MM-DD)
 * @param {string} appointmentData.time - Appointment time (HH:MM)
 * @param {string} appointmentData.notes - Optional notes
 * @returns {Promise<Object>} Created appointment
 * @throws {ApiError} If the request fails
 */
export async function createAppointment(appointmentData) {
  return post(APPOINTMENTS_ENDPOINT, appointmentData);
}

/**
 * Update an appointment
 * @param {number} id - Appointment ID
 * @param {Object} appointmentData - Appointment data to update
 * @returns {Promise<Object>} Updated appointment
 * @throws {ApiError} If the request fails
 */
export async function updateAppointment(id, appointmentData) {
  return put(`${APPOINTMENTS_ENDPOINT}/${id}`, appointmentData);
}

/**
 * Update appointment status
 * @param {number} id - Appointment ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated appointment
 * @throws {ApiError} If the request fails
 */
export async function updateAppointmentStatus(id, status) {
  return patch(`${APPOINTMENTS_ENDPOINT}/${id}/status`, { status });
}

/**
 * Delete an appointment
 * @param {number} id - Appointment ID
 * @returns {Promise<void>}
 * @throws {ApiError} If the request fails
 */
export async function deleteAppointment(id) {
  return del(`${APPOINTMENTS_ENDPOINT}/${id}`);
}

export default {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
