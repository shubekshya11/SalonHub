import { initialAppointments, services } from '../data/mockData';
import { APPOINTMENT_STATUS } from '../types';

/**
 * Appointment Service
 * Handles all appointment-related business logic and data operations
 * This simulates API calls and can be easily replaced with real API calls later
 */

class AppointmentService {
  constructor() {
    this.appointments = [...initialAppointments];
    this.listeners = [];
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
    this.listeners.forEach(callback => callback(this.appointments));
  }

  /**
   * Get all appointments with optional filtering
   * @param {Object} filters - Filter criteria
   * @param {string} filters.status - Filter by status
   * @returns {Promise<Array>} Array of appointments
   */
  async getAppointments(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let result = [...this.appointments];

    if (filters.status) {
      result = result.filter(apt => apt.status === filters.status);
    }

    return result;
  }

  /**
   * Get a single appointment by ID
   * @param {number} id - Appointment ID
   * @returns {Promise<Object|null>} Appointment object or null
   */
  async getAppointmentById(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.appointments.find(apt => apt.id === id) || null;
  }

  /**
   * Create a new appointment
   * @param {Object} appointmentData - Appointment data
   * @returns {Promise<Object>} Created appointment
   */
  async createAppointment(appointmentData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: APPOINTMENT_STATUS.PENDING,
      createdAt: new Date().toISOString()
    };

    this.appointments.push(newAppointment);
    this.notifyListeners();
    
    return newAppointment;
  }

  /**
   * Update an appointment
   * @param {number} id - Appointment ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>} Updated appointment or null
   */
  async updateAppointment(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index === -1) return null;

    this.appointments[index] = {
      ...this.appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.notifyListeners();
    return this.appointments[index];
  }

  /**
   * Update appointment status
   * @param {number} id - Appointment ID
   * @param {string} status - New status
   * @returns {Promise<Object|null>} Updated appointment or null
   */
  async updateAppointmentStatus(id, status) {
    return this.updateAppointment(id, { status });
  }

  /**
   * Delete an appointment
   * @param {number} id - Appointment ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteAppointment(id) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index === -1) return false;

    this.appointments.splice(index, 1);
    this.notifyListeners();
    
    return true;
  }

  /**
   * Get service name by ID
   * @param {number} serviceId - Service ID
   * @returns {string} Service name
   */
  getServiceName(serviceId) {
    const service = services.find(s => s.id === parseInt(serviceId));
    return service ? service.name : 'Unknown Service';
  }

  /**
   * Validate appointment form data
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation errors object
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