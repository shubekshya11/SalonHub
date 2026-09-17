import * as appointmentsApi from './appointmentsApi';
import { serviceService } from './serviceService';

/**
 * Appointment Service
 */

class AppointmentService {
  constructor() {
    this.listeners = [];
    this.cachedAppointments = null;
  }

  /**
   * Subscribe to appointment changes
   * @param {Function} callback - Function to call when appointments change
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
    if (this.cachedAppointments) {
      this.listeners.forEach(callback => callback(this.cachedAppointments));
    }
  }

  /**
   * Get all appointments with optional filtering
   * @param {Object} filters 
   * @param {string} filters.status 
   * @returns {Promise<Array>}
   */
  async getAppointments(filters = {}) {
    const appointments = await appointmentsApi.getAppointments(filters);
    this.cachedAppointments = appointments;
    return appointments;
  }

  /**
   * Get a single appointment by ID
   * @param {number} id 
   * @returns {Promise<Object|null>} 
   */
  async getAppointmentById(id) {
    return await appointmentsApi.getAppointmentById(id);
  }

  /**
   * Create a new appointment
   * @param {Object} appointmentData 
   * @returns {Promise<Object>} 
   */
  async createAppointment(appointmentData) {
    const newAppointment = await appointmentsApi.createAppointment(appointmentData);
    await this.getAppointments();
    this.notifyListeners();
    return newAppointment;
  }

  /**
   * Update an appointment
   * @param {number} id 
   * @param {Object} updates 
   * @returns {Promise<Object>} 
   */
  async updateAppointment(id, updates) {
    const updatedAppointment = await appointmentsApi.updateAppointment(id, updates);
    await this.getAppointments();
    this.notifyListeners();
    return updatedAppointment;
  }

  /**
   * Update appointment status
   * @param {number} id 
   * @param {string} status 
   * @returns {Promise<Object>} 
   */
  async updateAppointmentStatus(id, status) {
    const updatedAppointment = await appointmentsApi.updateAppointmentStatus(id, status);
    await this.getAppointments();
    this.notifyListeners();
    return updatedAppointment;
  }

  /**
   * Delete an appointment
   * @param {number} id 
   * @returns {Promise<void>}
   */
  async deleteAppointment(id) {
    await appointmentsApi.deleteAppointment(id);
    await this.getAppointments();
    this.notifyListeners();
  }

  /**
   * Get service name by ID
   * @param {number} serviceId 
   * @returns {Promise<string>} 
   */
  async getServiceName(serviceId) {
    try {
      const service = await serviceService.getServiceById(serviceId);
      return service ? service.name : 'Unknown Service';
    } catch (error) {
      return 'Unknown Service';
    }
  }

  /**
   * Validate appointment form data
   * @param {Object} formData 
   * @returns {Object} 
   */
  validateAppointmentForm(formData) {
    const errors = {};

    if (!formData.customerName?.trim()) {
      errors.customerName = 'Customer name is required';
    }

    if (!formData.customerPhone?.trim()) {
      errors.customerPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      errors.customerPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.serviceId) {
      errors.serviceId = 'Please select a service';
    }

    if (!formData.date) {
      errors.date = 'Appointment date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Appointment date cannot be in the past';
      }
    }

    if (!formData.time) {
      errors.time = 'Appointment time is required';
    }

    return errors;
  }
}

// Export singleton instance
export const appointmentService = new AppointmentService();