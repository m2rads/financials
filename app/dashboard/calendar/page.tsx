'use client';

import React, { useState } from 'react';
import DayView from '@/components/calendar/DayView';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import { dummyFinancialData } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  date: Date;
  amount: number;
  category: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'month'>('day');
  const transactions = dummyFinancialData.calendar_visualization;

  // Convert transactions to events for the sidebar
  const events: Event[] = transactions.flatMap(t => 
    t.transactions.map(transaction => ({
      id: `${t.date}-${transaction.name}`,
      title: transaction.name,
      date: new Date(t.date),
      amount: transaction.amount,
      category: transaction.category
    }))
  );

  return (
    <div className="flex h-screen">
      <CalendarSidebar 
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={events}
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
            <DayView transactions={transactions} currentDate={currentDate} />
          ) : (
            <div>Month view placeholder</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;