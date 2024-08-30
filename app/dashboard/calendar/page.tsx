'use client';

import React, { useState } from 'react';
import DayView from '@/components/calendar/DayView';
import { dummyFinancialData } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'month'>('day');
  const transactions = dummyFinancialData.calendar_visualization;

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
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
  );
};

export default CalendarPage;