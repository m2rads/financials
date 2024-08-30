import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
  title: string;
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
      title: `${transaction.name} - $${transaction.amount}`,
    }))
  );

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3174ad';
    if (event.amount < 0) {
      backgroundColor = '#e74c3c'; // Red for negative amounts (expenses)
    } else if (event.amount > 1000) {
      backgroundColor = '#2ecc71'; // Green for large positive amounts (income)
    }
    return { style: { backgroundColor } };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
      eventPropGetter={eventStyleGetter}
    />
  );
};

export default DynamicCalendar;