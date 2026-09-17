import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import ErrorMessage from '../components/UI/ErrorMessage';
import { serviceService } from '../services/serviceService';
import { appointmentService } from '../services/appointmentService';

const BookAppointmentPage = ({ onComplete }) => {
  const [services, setServices] = useState([]);
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
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getServices();
      setServices(data);
    } catch (err) {
      setSubmitError('Failed to load services');
    }
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
    
    // Validate form
    const validationErrors = appointmentService.validateAppointmentForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      await appointmentService.createAppointment(formData);
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
        if (onComplete) onComplete();
      }, 1500);
    } catch (err) {
      setSubmitError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <Card>
        <div className="section-header">
          <h2>New Appointment</h2>
          <Button onClick={onComplete} variant="secondary">
            Back to Dashboard
          </Button>
        </div>

        {submitSuccess && (
          <div className="success-message">
            Appointment booked successfully!
          </div>
        )}

        {submitError && (
          <ErrorMessage 
            message={submitError} 
            onDismiss={() => setSubmitError(null)} 
          />
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes (optional)"
              rows="3"
              className="input"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px', fontSize: '0.875rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BookAppointmentPage;