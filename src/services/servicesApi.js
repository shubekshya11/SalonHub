/**
 * Services API
 * API functions for service-related operations
 */

import { get, post, put, del, ApiError } from '../utils/apiClient';

const SERVICES_ENDPOINT = '/services';

/**
 * Get all services
 * @returns {Promise<Array>} Array of services
 * @throws {ApiError} If the request fails
 */
export async function getServices() {
  return get(SERVICES_ENDPOINT);
}

/**
 * Get a single service by ID
 * @param {number} id - Service ID
 * @returns {Promise<Object>} Service object
 * @throws {ApiError} If the request fails
 */
export async function getServiceById(id) {
  return get(`${SERVICES_ENDPOINT}/${id}`);
}

/**
 * Create a new service
 * @param {Object} serviceData - Service data
 * @param {string} serviceData.name - Service name
 * @param {number} serviceData.price - Service price
 * @param {number} serviceData.duration - Service duration in minutes
 * @returns {Promise<Object>} Created service
 * @throws {ApiError} If the request fails
 */
export async function createService(serviceData) {
  return post(SERVICES_ENDPOINT, serviceData);
}

/**
 * Update an existing service
 * @param {number} id - Service ID
 * @param {Object} serviceData - Service data to update
 * @returns {Promise<Object>} Updated service
 * @throws {ApiError} If the request fails
 */
export async function updateService(id, serviceData) {
  return put(`${SERVICES_ENDPOINT}/${id}`, serviceData);
}

/**
 * Delete a service
 * @param {number} id - Service ID
 * @returns {Promise<void>}
 * @throws {ApiError} If the request fails
 */
export async function deleteService(id) {
  return del(`${SERVICES_ENDPOINT}/${id}`);
}

export default {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
