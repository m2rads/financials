import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface CalendarTopBarProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarTopBar: React.FC<CalendarTopBarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <IconChevronLeft size={20} />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <IconChevronRight size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{formatDate(currentDate)}</h2>
      </div>
      <div>
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default CalendarTopBar;