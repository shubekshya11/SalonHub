// Mock data for services
export const services = [
  {
    id: 1,
    name: 'Haircut',
    price: 500,
    duration: 30
  },
  {
    id: 2,
    name: 'Hair Coloring',
    price: 2500,
    duration: 120
  },
  {
    id: 3,
    name: 'Facial',
    price: 1500,
    duration: 60
  },
  {
    id: 4,
    name: 'Manicure',
    price: 800,
    duration: 45
  },
  {
    id: 5,
    name: 'Pedicure',
    price: 1000,
    duration: 60
  }
];

// Mock data for appointments
export const initialAppointments = [
  {
    id: 1,
    customerName: 'John Doe',
    customerPhone: '9876543210',
    serviceId: 1,
    date: '2026-09-20',
    time: '10:00',
    notes: 'Regular haircut',
    status: 'Pending'
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerPhone: '9876543211',
    serviceId: 3,
    date: '2026-09-21',
    time: '14:00',
    notes: 'First time customer',
    status: 'Confirmed'
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    customerPhone: '9876543212',
    serviceId: 2,
    date: '2026-09-18',
    time: '11:30',
    notes: '',
    status: 'Completed'
  }
];