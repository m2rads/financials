import React from 'react';

interface EventTypeHorizontalProps {
  icon: React.ReactNode;
  label: string;
  amount: number;
  color: string;
}

const EventTypeHorizontal: React.FC<EventTypeHorizontalProps> = ({ icon, label, amount, color }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="ml-4 flex-grow">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900">${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default EventTypeHorizontal;