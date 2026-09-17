import { services } from '../data/mockData';

/**
 * Service Service
 * Handles service-related data operations
 * This simulates API calls and can be easily replaced with real API calls later
 */

class ServiceService {
  constructor() {
    this.services = [...services];
    this.listeners = [];
  }

  /**
   * Subscribe to service changes
   * @param {Function} callback - Function to call when services change
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Notify all listeners of changes
   */
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.services));
  }

  /**
   * Get all services
   * @returns {Promise<Array>} Array of services
   */
  async getServices() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.services];
  }

  /**
   * Get a single service by ID
   * @param {number} id - Service ID
   * @returns {Promise<Object|null>} Service object or null
   */
  async getServiceById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.services.find(s => s.id === id) || null;
  }

  /**
   * Validate service data
   * @param {Object} serviceData - Service data to validate
   * @returns {Object} Validation errors object
   */
  validateServiceData(serviceData) {
    const errors = {};

    if (!serviceData.name || !serviceData.name.trim()) {
      errors.name = 'Service name is required';
    }

    if (!serviceData.price || parseFloat(serviceData.price) <= 0) {
      errors.price = 'Price is required and must be greater than 0';
    }

    if (!serviceData.duration || parseInt(serviceData.duration) <= 0) {
      errors.duration = 'Duration is required and must be greater than 0';
    }

    return errors;
  }

  /**
   * Create a new service
   * @param {Object} serviceData - Service data
   * @returns {Promise<Object>} Created service
   */
  async createService(serviceData) {
    // Validate data
    const errors = this.validateServiceData(serviceData);
    if (Object.keys(errors).length > 0) {
      throw new Error('Validation failed');
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const newService = {
      id: Date.now(),
      name: serviceData.name.trim(),
      price: parseFloat(serviceData.price),
      duration: parseInt(serviceData.duration)
    };

    this.services.push(newService);
    this.notifyListeners();
    return newService;
  }

  /**
   * Update a service
   * @param {number} id - Service ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>} Updated service or null
   */
  async updateService(id, updates) {
    // Validate data
    const errors = this.validateServiceData(updates);
    if (Object.keys(errors).length > 0) {
      throw new Error('Validation failed');
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;

    this.services[index] = {
      ...this.services[index],
      name: updates.name.trim(),
      price: parseFloat(updates.price),
      duration: parseInt(updates.duration)
    };

    this.notifyListeners();
    return this.services[index];
  }

  /**
   * Delete a service
   * @param {number} id - Service ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteService(id) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return false;

    this.services.splice(index, 1);
    this.notifyListeners();
    return true;
  }
}

// Export singleton instance
export const serviceService = new ServiceService();