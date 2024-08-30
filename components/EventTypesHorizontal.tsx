import React from 'react';
import EventTypeHorizontal from './EventTypeHorizontal';
import { IconShoppingCart, IconCreditCard, IconCar, IconHome } from '@tabler/icons-react';

const eventTypes = [
  { icon: <IconShoppingCart size={20} color="white" />, label: 'Shopping', amount: 450.00, color: 'bg-primary-500' },
  { icon: <IconCreditCard size={20} color="white" />, label: 'Subscriptions', amount: 80.00, color: 'bg-secondary-500' },
  { icon: <IconCar size={20} color="white" />, label: 'Travel', amount: 200.00, color: 'bg-success-500' },
  { icon: <IconHome size={20} color="white" />, label: 'Bills', amount: 1200.00, color: 'bg-warning-500' },
];

const EventTypesHorizontal: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {eventTypes.map((eventType, index) => (
        <EventTypeHorizontal key={index} {...eventType} />
      ))}
    </div>
  );
};

export default EventTypesHorizontal;