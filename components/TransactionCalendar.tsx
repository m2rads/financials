import React from 'react';
import dynamic from 'next/dynamic';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DynamicCalendar = dynamic(
  () => import('./DynamicCalendar'),
  { ssr: false }
);

interface Transaction {
  amount: number;
  name: string;
  category: string;
}

interface TransactionCalendarProps {
  transactions: {
    date: string;
    transactions: Transaction[];
  }[];
}

const TransactionCalendar: React.FC<TransactionCalendarProps> = ({ transactions }) => {
  return (
    <div style={{ height: '500px' }}>
      <DynamicCalendar transactions={transactions} />
    </div>
  );
};

export default TransactionCalendar;