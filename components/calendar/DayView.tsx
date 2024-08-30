import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  date: Date;
  amount: number;
  category: string;
}

interface DayViewProps {
  events: Event[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  addEvent: (event: Event) => void;
}

const DayView: React.FC<DayViewProps> = ({ events, currentDate, onDateChange, addEvent }) => {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const timeColumnRef = useRef<HTMLDivElement>(null);
  const eventsColumnRef = useRef<HTMLDivElement>(null);

  const currentDateString = format(currentDate, 'yyyy-MM-dd');
  const dayEvents = events.filter(event => format(event.date, 'yyyy-MM-dd') === currentDateString);

  const handlePrevDay = () => onDateChange(subDays(currentDate, 1));
  const handleNextDay = () => onDateChange(addDays(currentDate, 1));

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setShowNewEventModal(true);
  };

  const handleCreateEvent = () => {
    if (newEventTitle && selectedTime) {
      const newEventDate = new Date(currentDate);
      const [hours, minutes] = selectedTime.split(':');
      newEventDate.setHours(parseInt(hours), parseInt(minutes));

      addEvent({
        id: Date.now().toString(),
        title: newEventTitle,
        date: newEventDate,
        amount: 0,
        category: 'Uncategorized'
      });

      setNewEventTitle('');
      setShowNewEventModal(false);
    }
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
          {timeSlots.map((time) => {
            const [hours, minutes] = time.split(':');
            const slotEvents = dayEvents.filter(event => 
              event.date.getHours() === parseInt(hours) && 
              event.date.getMinutes() === parseInt(minutes)
            );

            return (
              <div 
                key={time} 
                className="h-20 border-b flex items-start p-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleTimeSlotClick(time)}
              >
                {slotEvents.map((event, index) => (
                  <div key={event.id} className="ml-2 p-2 bg-primary-100 rounded w-full sm:w-auto">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-600">${event.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event Title"
              className="w-full p-2 border rounded mb-4"
            />
            <p>Selected time: {selectedTime}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewEventModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>
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