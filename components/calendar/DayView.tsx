import React, { useState } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';

interface Transaction {
  amount: number;
  name: string;
  category: string;
  // We don't need a date property here as it's in the parent object
}

interface DayViewProps {
  transactions: {
    date: string;
    transactions: Transaction[];
  }[];
  currentDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ transactions, currentDate }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const currentDateString = format(selectedDate, 'yyyy-MM-dd');
  const dayTransactions = transactions.find(t => t.date === currentDateString)?.transactions || [];

  const handlePrevDay = () => setSelectedDate(prevDate => subDays(prevDate, 1));
  const handleNextDay = () => setSelectedDate(prevDate => addDays(prevDate, 1));

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setShowNewEventModal(true);
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    format(new Date().setHours(i, 0, 0, 0), 'HH:mm')
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button onClick={handlePrevDay} className="p-2 rounded-full hover:bg-gray-100">
            <IconChevronLeft size={20} />
          </button>
          <button onClick={handleNextDay} className="p-2 rounded-full hover:bg-gray-100">
            <IconChevronRight size={20} />
          </button>
          <h2 className="text-xl font-semibold">{format(selectedDate, 'MMMM d, yyyy')}</h2>
        </div>
        <button className="flex items-center px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
          <IconPlus size={20} className="mr-2" />
          Add Event
        </button>
      </div>
      <div className="flex h-[calc(100vh-200px)] sm:h-[calc(100vh-150px)]">
        <div className="w-12 sm:w-16 border-r">
          {timeSlots.map((time) => (
            <div key={time} className="h-16 sm:h-20 border-b flex items-center justify-center text-xs sm:text-sm text-gray-500">
              {time}
            </div>
          ))}
        </div>
        <div className="flex-grow overflow-y-auto">
          {timeSlots.map((time) => (
            <div 
              key={time} 
              className="h-16 sm:h-20 border-b flex items-start p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => handleTimeSlotClick(time)}
            >
              {dayTransactions
                .filter(t => {
                  // Assuming transactions don't have a specific time, we'll just display them at the start of the day
                  return time === '00:00';
                })
                .map((transaction, index) => (
                  <div key={index} className="ml-2 p-2 bg-primary-100 rounded w-full">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            <p>Selected time: {selectedTime}</p>
            {/* Add form fields for new event here */}
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowNewEventModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle new event creation
                  setShowNewEventModal(false);
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayView;