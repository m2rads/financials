import React from 'react';

interface EventTypeVerticalProps {
  icon: React.ReactNode;
  label: string;
  amount: number;
  color: string;
}

const EventTypeVertical: React.FC<EventTypeVerticalProps> = ({ icon, label, amount, color }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color} mb-3`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-900">${amount.toFixed(2)}</p>
    </div>
  );
};

export default EventTypeVertical;