import React from 'react';
import { format, isToday, isTomorrow, isAfter, startOfDay } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  amount: number;
  category: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const today = new Date();
  const todayEvents = events.filter(event => isToday(event.date));
  const tomorrowEvents = events.filter(event => isTomorrow(event.date));
  const futureEvents = events.filter(event => isAfter(startOfDay(event.date), startOfDay(today)));

  const renderEventList = (eventList: Event[], title: string) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {eventList.length > 0 ? (
        <ul className="space-y-2">
          {eventList.map(event => (
            <li key={event.id} className="bg-gray-100 p-2 rounded">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-600">${event.amount.toFixed(2)} - {event.category}</p>
              <p className="text-xs text-gray-500">{format(event.date, 'h:mm a')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No events</p>
      )}
    </div>
  );

  return (
    <div className="overflow-y-auto">
      {renderEventList(todayEvents, 'Today')}
      {renderEventList(tomorrowEvents, 'Tomorrow')}
      {futureEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
          <ul className="space-y-2">
            {futureEvents.map(event => (
              <li key={event.id} className="bg-gray-100 p-2 rounded">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">${event.amount.toFixed(2)} - {event.category}</p>
                <p className="text-xs text-gray-500">{format(event.date, 'MMM d, yyyy')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventsList;