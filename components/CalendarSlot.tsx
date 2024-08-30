import React from 'react';
import { IconShoppingCart, IconCreditCard, IconCar, IconHome, Icon } from '@tabler/icons-react';

interface CalendarSlotProps {
  name: string;
  amount: number;
  category: string;
}

const getCategoryIcon = (category: string): Icon => {
  switch (category.toLowerCase()) {
    case 'shopping':
      return IconShoppingCart;
    case 'subscriptions':
      return IconCreditCard;
    case 'travel':
      return IconCar;
    case 'bills':
      return IconHome;
    default:
      return IconCreditCard;
  }
};

const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'shopping':
      return 'bg-primary-500';
    case 'subscriptions':
      return 'bg-secondary-500';
    case 'travel':
      return 'bg-success-500';
    case 'bills':
      return 'bg-warning-500';
    default:
      return 'bg-gray-500';
  }
};

const CalendarSlot: React.FC<CalendarSlotProps> = ({ name, amount, category }) => {
  const IconComponent = getCategoryIcon(category);
  const categoryColor = getCategoryColor(category);

  return (
    <div className="flex items-center p-2 bg-white rounded-md shadow-sm">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${categoryColor} mr-2`}>
        <IconComponent size={16} color="white" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-600">${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CalendarSlot;