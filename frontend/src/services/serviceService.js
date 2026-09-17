import * as servicesApi from './servicesApi';

class ServiceService {
  constructor() {
    this.listeners = [];
    this.cachedServices = null;
  }

  /*
   * @param {Function} callback
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners() {
    if (this.cachedServices) {
      this.listeners.forEach(callback => callback(this.cachedServices));
    }
  }

  /**
   * Get all services
   * @returns {Promise<Array>} 
   */
  async getServices() {
    const services = await servicesApi.getServices();
    this.cachedServices = services;
    return services;
  }

  /**
   * Get a single service by ID
   * @param {number} id - Service ID
   * @returns {Promise<Object|null>} Service object or null
   */
  async getServiceById(id) {
    return await servicesApi.getServiceById(id);
  }

  /**
   * Create a new service
   * @param {Object} serviceData - Service data
   * @returns {Promise<Object>} Created service
   */
  async createService(serviceData) {
    const newService = await servicesApi.createService(serviceData);
    await this.getServices();
    this.notifyListeners();
    return newService;
  }

  /**
   * Update a service
   * @param {number} id - Service ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated service
   */
  async updateService(id, updates) {
    const updatedService = await servicesApi.updateService(id, updates);
    await this.getServices();
    this.notifyListeners();
    return updatedService;
  }

  /**
   * Delete a service
   * @param {number} id - Service ID
   * @returns {Promise<void>}
   */
  async deleteService(id) {
    await servicesApi.deleteService(id);
    await this.getServices();
    this.notifyListeners();
  }
}

// Export singleton instance
export const serviceService = new ServiceService();