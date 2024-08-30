import React from 'react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  // Add other event properties as needed
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      <ul className="space-y-2">
        {events.map(event => (
          <li key={event.id} className="bg-gray-100 p-2 rounded">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-gray-600">{format(event.date, 'MMM d, yyyy')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;