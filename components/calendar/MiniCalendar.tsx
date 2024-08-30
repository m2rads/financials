import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns';

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ currentDate, onDateChange }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const today = new Date();

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{format(currentDate, 'MMMM yyyy')}</h3>
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">{day}</div>
        ))}
        {monthDays.map(day => (
          <button
            key={day.toISOString()}
            onClick={() => onDateChange(day)}
            className={`
              text-center text-sm w-8 h-8 flex items-center justify-center rounded-full
              ${isSameDay(day, currentDate)
                ? 'bg-blue-500 text-white font-bold hover:bg-blue-600'
                : isToday(day)
                  ? 'bg-blue-100 text-blue-600 font-bold hover:bg-blue-200'
                  : isSameMonth(day, currentDate)
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-400 hover:bg-gray-100'}
            `}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;