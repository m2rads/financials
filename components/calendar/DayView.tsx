import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, subDays, parseISO, isSameDay, addHours, parse, differenceInMinutes } from 'date-fns';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import EventBlock from './EventBlock';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
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
  const [newEventStartTime, setNewEventStartTime] = useState('09:00');
  const [newEventEndTime, setNewEventEndTime] = useState('10:00');
  const timeColumnRef = useRef<HTMLDivElement>(null);
  const eventsColumnRef = useRef<HTMLDivElement>(null);

  const dayEvents = events.filter(event => isSameDay(event.startDate, currentDate));

  const handlePrevDay = () => onDateChange(subDays(currentDate, 1));
  const handleNextDay = () => onDateChange(addDays(currentDate, 1));

  const parseTime = (time: string): Date => {
    return parse(time, 'HH:mm', new Date());
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setNewEventStartTime(time);
    const endTime = addHours(parseTime(time), 1);
    setNewEventEndTime(format(endTime, 'HH:mm'));
    setShowNewEventModal(true);
  };

  const handleCreateEvent = () => {
    if (newEventTitle && selectedTime) {
      const newEventStartDate = new Date(currentDate);
      const [startHours, startMinutes] = newEventStartTime.split(':');
      newEventStartDate.setHours(parseInt(startHours), parseInt(startMinutes));

      const newEventEndDate = new Date(currentDate);
      const [endHours, endMinutes] = newEventEndTime.split(':');
      newEventEndDate.setHours(parseInt(endHours), parseInt(endMinutes));

      addEvent({
        id: Date.now().toString(),
        title: newEventTitle,
        startDate: newEventStartDate,
        endDate: newEventEndDate,
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

  const renderEvents = () => {
    const dayEvents = events.filter(event => isSameDay(event.startDate, currentDate));
    return dayEvents.map(event => {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const startMinutes = differenceInMinutes(event.startDate, startOfDay);
      const endMinutes = differenceInMinutes(event.endDate, startOfDay);
      const duration = endMinutes - startMinutes;
      
      const top = (startMinutes / 1440) * 100; // 1440 minutes in a day
      const height = (duration / 1440) * 100;

      console.log(`Event: ${event.title}, Start: ${event.startDate}, Top: ${top}%, Height: ${height}%`);

      return (
        <EventBlock
          key={event.id}
          event={event}
          top={top}
          height={height}
        />
      );
    });
  };

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
    <div className="bg-white rounded-lg shadow flex flex-col h-full m-2">
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
        <div ref={eventsColumnRef} className="flex-grow overflow-y-auto relative">
          {timeSlots.map((time) => (
            <div 
              key={time} 
              className="h-20 border-b flex items-start p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => handleTimeSlotClick(time)}
            />
          ))}
          {renderEvents()}
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
            <div className="flex justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={newEventStartTime}
                  onChange={(e) => setNewEventStartTime(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={newEventEndTime}
                  onChange={(e) => setNewEventEndTime(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
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