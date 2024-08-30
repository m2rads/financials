'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import GoogleCalendar from '../../components/GoogleCalendar';
import { dummyFinancialData } from '../../utils/dummyData';
import EventTypesHorizontal from '../../components/EventTypesHorizontal';

const GoogleOAuthProvider = dynamic<any>(
  () => import('@react-oauth/google').then((mod) => mod.GoogleOAuthProvider),
  { ssr: false }
);

export default function Dashboard() {
  const transactions = dummyFinancialData.calendar_visualization.flatMap(
    day => day.transactions.map(t => ({ ...t, date: day.date }))
  );

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <div>Error: Google Client ID is not set</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>
        <EventTypesHorizontal />
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Transaction Calendar</h2>
          <GoogleCalendar transactions={transactions} />
        </div>
        {/* Add other dashboard components here */}
      </div>
    </GoogleOAuthProvider>
  );
}