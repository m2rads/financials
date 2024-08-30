'use client';

import React, { useState } from 'react';
import DayView from '@/components/calendar/DayView';
import { dummyFinancialData } from '@/utils/dummyData';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const transactions = dummyFinancialData.calendar_visualization;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Calendar</h1>
      <DayView transactions={transactions} currentDate={currentDate} />
    </div>
  );
};

export default CalendarPage;