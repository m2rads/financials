import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ currentDate, onDateChange }) => {
  const [displayedMonth, setDisplayedMonth] = React.useState(startOfMonth(currentDate));
  const monthStart = startOfMonth(displayedMonth);
  const monthEnd = endOfMonth(displayedMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const today = new Date();

  const handlePrevMonth = () => {
    setDisplayedMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setDisplayedMonth(prevMonth => addMonths(prevMonth, 1));
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
          <IconChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">{format(displayedMonth, 'MMMM yyyy')}</h3>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <IconChevronRight className="h-4 w-4" />
        </Button>
      </div>
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
                  : isSameMonth(day, displayedMonth)
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