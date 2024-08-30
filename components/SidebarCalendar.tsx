import React, { useState } from 'react';
import CalendarSlot from './CalendarSlot';

interface SidebarCalendarProps {
  transactions: {
    date: string;
    transactions: {
      name: string;
      amount: number;
      category: string;
    }[];
  }[];
}

const SidebarCalendar: React.FC<SidebarCalendarProps> = ({ transactions }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-primary-500 text-white">
        <h2 className="text-lg font-semibold">Transaction Calendar</h2>
      </div>
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {transactions.map((dayData) => (
          <div key={dayData.date}>
            <div className="text-sm font-semibold mb-1">{dayData.date}</div>
            {dayData.transactions.map((transaction, index) => (
              <CalendarSlot
                key={index}
                name={transaction.name}
                amount={transaction.amount}
                category={transaction.category}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarCalendar;