import React from 'react';
import Card from '../UI/Card';
import { services } from '../../data/mockData';

const ServicesList = () => {
  return (
    <Card title="Services Management">
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Price (NPR)</th>
              <th>Duration (minutes)</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td style={{ fontWeight: 500 }}>{service.name}</td>
                <td>NPR {service.price}</td>
                <td>{service.duration} minutes</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ServicesList;