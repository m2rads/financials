import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import MiniCalendar from './MiniCalendar';
import EventsList from './EventsList';

interface Event {
  id: string;
  title: string;
  date: Date;
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
  const [newEventTime, setNewEventTime] = useState('12:00');

  const handleCreateEvent = () => {
    if (newEventTitle) {
      const [hours, minutes] = newEventTime.split(':');
      const newEventDate = new Date(currentDate);
      newEventDate.setHours(parseInt(hours), parseInt(minutes));

      addEvent({
        id: Date.now().toString(),
        title: newEventTitle,
        date: newEventDate,
        amount: 0,
        category: 'Uncategorized'
      });

      setNewEventTitle('');
      setNewEventTime('12:00');
      setShowNewEventModal(false);
    }
  };

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
            <select
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                  {`${hour.toString().padStart(2, '0')}:00`}
                </option>
              ))}
            </select>
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