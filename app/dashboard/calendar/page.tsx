'use client';

import React, { useState } from 'react';
import DayView from '@/components/calendar/DayView';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import { dummyFinancialData } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  category: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'month'>('day');
  const transactions = dummyFinancialData.calendar_visualization;
  const [events, setEvents] = useState<Event[]>(
    transactions.flatMap(t => 
      t.transactions.map(transaction => {
        const date = new Date(t.date);
        return {
          id: `${t.date}-${transaction.name}`,
          title: transaction.name,
          startDate: date,
          endDate: new Date(date.getTime() + 60 * 60 * 1000), // Default 1 hour duration
          amount: transaction.amount,
          category: transaction.category
        };
      })
    )
  );

  const addEvent = (newEvent: Event) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="flex h-screen">
      <CalendarSidebar 
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={events}
        addEvent={addEvent}
      />
      <div className="flex-grow flex flex-col">
        <div className="p-4 border-b">
          <Button 
            onClick={() => setView('day')} 
            variant={view === 'day' ? 'default' : 'outline'}
            className="mr-2"
          >
            Day View
          </Button>
          <Button 
            onClick={() => setView('month')} 
            variant={view === 'month' ? 'default' : 'outline'}
          >
            Month View
          </Button>
        </div>
        <div className="flex-grow overflow-hidden">
          {view === 'day' ? (
            <DayView 
              events={events}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              addEvent={addEvent}
            />
          ) : (
            <div>Month view placeholder</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;