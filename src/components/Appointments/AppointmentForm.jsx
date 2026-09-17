import React, { useState } from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { services } from '../../data/mockData';
import { useAppointmentContext } from '../../context/AppointmentContext';

const AppointmentForm = () => {
  const { addAppointment } = useAppointmentContext();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Appointment date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Appointment date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Appointment time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add appointment using the hook
    addAppointment(formData);

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        customerName: '',
        customerPhone: '',
        serviceId: '',
        date: '',
        time: '',
        notes: ''
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <Card title="Book Appointment">
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Appointment booked successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          required
          error={errors.customerName}
        />

        <Input
          label="Phone Number"
          name="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Enter 10-digit phone number"
          required
          error={errors.customerPhone}
        />

        <Select
          label="Service"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          options={services}
          required
          error={errors.serviceId}
          placeholder="Select a service"
        />

        <Input
          label="Appointment Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          error={errors.date}
        />

        <Input
          label="Appointment Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
          error={errors.time}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional notes (optional)"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default AppointmentForm;