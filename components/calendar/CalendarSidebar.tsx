import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import MiniCalendar from './MiniCalendar';
import EventsList from './EventsList';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  category: string;
}

interface CalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: Event[];
  addEvent: (event: Event) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ currentDate, onDateChange, events, addEvent }) => {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('09:00');
  const [newEventEndTime, setNewEventEndTime] = useState('10:00');

  const handleCreateEvent = () => {
    if (newEventTitle) {
      const [startHours, startMinutes] = newEventStartTime.split(':');
      const [endHours, endMinutes] = newEventEndTime.split(':');
      
      const newEventStartDate = new Date(currentDate);
      newEventStartDate.setHours(parseInt(startHours), parseInt(startMinutes));
      
      const newEventEndDate = new Date(currentDate);
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
      setNewEventStartTime('09:00');
      setNewEventEndTime('10:00');
      setShowNewEventModal(false);
    }
  };

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  return (
    <div className="w-64 bg-white shadow-lg p-4 flex flex-col h-full">
      <Button className="mb-4" onClick={() => setShowNewEventModal(true)}>
        <IconPlus className="mr-2 h-4 w-4" />
        Create Event
      </Button>
      <MiniCalendar currentDate={currentDate} onDateChange={onDateChange} />
      <EventsList events={events} />

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
                <select
                  value={newEventStartTime}
                  onChange={(e) => setNewEventStartTime(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {timeOptions.map((time) => (
                    <option key={`start-${time}`} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <select
                  value={newEventEndTime}
                  onChange={(e) => setNewEventEndTime(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {timeOptions.map((time) => (
                    <option key={`end-${time}`} value={time}>{time}</option>
                  ))}
                </select>
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

export default CalendarSidebar;