import { get, post, put, del } from '../utils/apiClient';

const SERVICES_ENDPOINT = '/services/';

/**
 * Get all services
 * @returns {Promise<Array>} 
 * @throws {ApiError}
 */
export async function getServices() {
  return get(SERVICES_ENDPOINT);
}

/**
 * Get a single service by ID
 * @param {number} id 
 * @returns {Promise<Object>} 
 * @throws {ApiError} 
 */
export async function getServiceById(id) {
  return get(`${SERVICES_ENDPOINT}${id}/`);
}

/**
 * Create a new service
 * @param {Object} serviceData 
 * @param {string} serviceData.name 
 * @param {number} serviceData.price 
 * @param {number} serviceData.duration 
 * @returns {Promise<Object>} 
 * @throws {ApiError} 
 */
export async function createService(serviceData) {
  return post(SERVICES_ENDPOINT, serviceData);
}

/**
 * Update an existing service
 * @param {number} id
 * @param {Object} serviceData 
 * @returns {Promise<Object>} 
 * @throws {ApiError} 
 */
export async function updateService(id, serviceData) {
  return put(`${SERVICES_ENDPOINT}${id}/`, serviceData);
}

/**
 * Delete a service
 * @param {number} id 
 * @returns {Promise<void>}
 * @throws {ApiError} If the request fails
 */
export async function deleteService(id) {
  return del(`${SERVICES_ENDPOINT}${id}/`);
}

export default {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
