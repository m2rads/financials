import React from 'react';
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
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ currentDate, onDateChange, events }) => {
  return (
    <div className="w-64 bg-white shadow-lg p-4 flex flex-col h-full">
      <Button className="mb-4">
        <IconPlus className="mr-2 h-4 w-4" />
        Create Event
      </Button>
      <MiniCalendar currentDate={currentDate} onDateChange={onDateChange} />
      <EventsList events={events} />
    </div>
  );
};

export default CalendarSidebar;