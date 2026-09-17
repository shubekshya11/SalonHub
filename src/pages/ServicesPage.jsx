import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Loading from '../components/UI/Loading';
import ErrorMessage from '../components/UI/ErrorMessage';
import ServiceForm from '../components/Services/ServiceForm';
import { serviceService } from '../services/serviceService';

/**
 * ServicesPage Component
 * Page component for displaying and managing services
 * 
 * Why this component exists:
 * - Separates page-level logic from reusable components
 * - Handles data fetching and state management for the services page
 * - Provides a clear boundary between routing and business logic
 * - Makes the application more maintainable and testable
 */

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    loadServices();
    
    // Subscribe to service changes
    const unsubscribe = serviceService.subscribe((updatedServices) => {
      setServices(updatedServices);
    });

    return () => unsubscribe();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setServiceToEdit(null);
    setShowForm(true);
  };

  const handleEditService = (service) => {
    setServiceToEdit(service);
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceService.deleteService(serviceId);
      } catch (err) {
        setError('Failed to delete service');
      }
    }
  };

  const handleSaveService = async (idOrData, serviceData) => {
    try {
      if (serviceToEdit) {
        await serviceService.updateService(idOrData, serviceData);
      } else {
        await serviceService.createService(idOrData);
      }
      setShowForm(false);
      setServiceToEdit(null);
    } catch (err) {
      setError('Failed to save service');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setServiceToEdit(null);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <Loading message="Loading services..." />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <ServiceForm 
          serviceToEdit={serviceToEdit}
          onSave={handleSaveService}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <Card>
        <div className="section-header">
          <h2>Services</h2>
          <Button variant="primary" onClick={handleAddService}>
            Add Service
          </Button>
        </div>

        {services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No services yet. Click "Add Service" to create one.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '1rem' 
          }}>
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <h3>{service.name}</h3>
                <p><strong>Price:</strong> NPR {service.price}</p>
                <p><strong>Duration:</strong> {service.duration} minutes</p>
                <div className="actions">
                  <Button 
                    variant="secondary" 
                    onClick={() => handleEditService(service)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(service.id)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ServicesPage;