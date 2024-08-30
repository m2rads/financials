import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface Transaction {
  amount: number;
  name: string;
  category: string;
}

interface DayViewProps {
  transactions: {
    date: string;
    transactions: Transaction[];
  }[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const DayView: React.FC<DayViewProps> = ({ transactions, currentDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeColumnRef = useRef<HTMLDivElement>(null);
  const eventsColumnRef = useRef<HTMLDivElement>(null);

  const currentDateString = format(currentDate, 'yyyy-MM-dd');
  const dayTransactions = transactions.find(t => t.date === currentDateString)?.transactions || [];

  const handlePrevDay = () => onDateChange(subDays(currentDate, 1));
  const handleNextDay = () => onDateChange(addDays(currentDate, 1));

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setShowNewEventModal(true);
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    format(new Date().setHours(i, 0, 0, 0), 'HH:mm')
  );

  useEffect(() => {
    const timeColumn = timeColumnRef.current;
    const eventsColumn = eventsColumnRef.current;

    if (timeColumn && eventsColumn) {
      const handleScroll = () => {
        timeColumn.scrollTop = eventsColumn.scrollTop;
      };

      eventsColumn.addEventListener('scroll', handleScroll);
      return () => eventsColumn.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full m-2"> {/* Added m-2 for margin */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Button variant="outline" size="icon" onClick={handlePrevDay}>
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h2>
        </div>
        <Button onClick={() => setShowNewEventModal(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div ref={timeColumnRef} className="w-16 border-r overflow-hidden">
          {timeSlots.map((time) => (
            <div key={time} className="h-20 border-b flex items-center justify-center text-sm text-gray-500">
              {time}
            </div>
          ))}
        </div>
        <div ref={eventsColumnRef} className="flex-grow overflow-y-auto">
          {timeSlots.map((time) => (
            <div 
              key={time} 
              className="h-20 border-b flex items-start p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => handleTimeSlotClick(time)}
            >
              {dayTransactions
                .filter(t => {
                  // Assuming transactions don't have a specific time, we'll just display them at the start of the day
                  return time === '00:00';
                })
                .map((transaction, index) => (
                  <div key={index} className="ml-2 p-2 bg-primary-100 rounded w-full sm:w-auto">
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-gray-600">${transaction.amount.toFixed(2)}</p>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            <p>Selected time: {selectedTime}</p>
            {/* Add form fields for new event here */}
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewEventModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // Handle new event creation
                setShowNewEventModal(false);
              }}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayView;