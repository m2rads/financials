import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarSlot from './CalendarSlot';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Transaction {
  amount: number;
  name: string;
  category: string;
}

interface CalendarEvent extends Transaction {
  start: Date;
  end: Date;
}

interface DynamicCalendarProps {
  transactions: {
    date: string;
    transactions: Transaction[];
  }[];
}

const DynamicCalendar: React.FC<DynamicCalendarProps> = ({ transactions }) => {
  const events: CalendarEvent[] = transactions.flatMap(({ date, transactions }) =>
    transactions.map((transaction) => ({
      ...transaction,
      start: new Date(date),
      end: new Date(date),
    }))
  );

  const eventPropGetter = (event: CalendarEvent) => {
    return {
      className: 'bg-transparent border-none',
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
      eventPropGetter={eventPropGetter}
      components={{
        event: ({ event }: { event: CalendarEvent }) => (
          <CalendarSlot name={event.name} amount={event.amount} category={event.category} />
        ),
      }}
    />
  );
};

export default DynamicCalendar;