import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorMessage from '../UI/ErrorMessage';

const ServiceForm = ({ serviceToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        name: serviceToEdit.name,
        price: serviceToEdit.price.toString(),
        duration: serviceToEdit.duration.toString()
      });
    }
  }, [serviceToEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else if (parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
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

    try {
      const serviceData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      };

      if (serviceToEdit) {
        await onSave(serviceToEdit.id, serviceData);
      } else {
        await onSave(serviceData);
      }
    } catch (err) {
      setErrors({ submit: 'Failed to save service. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="section-header">
        <h2>{serviceToEdit ? 'Edit Service' : 'Add Service'}</h2>
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>

      {errors.submit && (
        <ErrorMessage 
          message={errors.submit} 
          onDismiss={() => setErrors(prev => ({ ...prev, submit: '' }))} 
        />
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Service Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter service name"
          required
          error={errors.name}
        />

        <Input
          label="Price (NPR)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
          error={errors.price}
        />

        <Input
          label="Duration (minutes)"
          name="duration"
          type="number"
          min="1"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter duration in minutes"
          required
          error={errors.duration}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Saving...' : (serviceToEdit ? 'Update Service' : 'Add Service')}
        </Button>
      </form>
    </Card>
  );
};

export default ServiceForm;