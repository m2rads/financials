import React, { useEffect, useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface Transaction {
  amount: number;
  name: string;
  category: string;
  date: string;
}

interface GoogleCalendarProps {
  transactions: Transaction[];
}

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({ transactions }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Not started");
  const [addedEvents, setAddedEvents] = useState<string[]>([]);

  const loadCalendarApi = useCallback(async (accessToken: string) => {
    setStatus("Loading Calendar API");
    if (!(window as any).gapi) {
      setError("Google API not loaded");
      return;
    }

    const gapi = (window as any).gapi;
    await new Promise((resolve) => gapi.load('client', resolve));
    try {
      await gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });
      gapi.client.setToken({ access_token: accessToken });
      setIsLoggedIn(true);
      setStatus("Calendar API loaded");
      addTransactionEvents();
    } catch (error) {
      setError("Failed to initialize Google API client: " + JSON.stringify(error));
      console.error(error);
    }
  }, []);

  const addTransactionEvents = useCallback(async () => {
    if (!isLoggedIn) return;
    setStatus("Adding transaction events");
    setAddedEvents([]);

    const gapi = (window as any).gapi;
    for (const transaction of transactions) {
      const event = {
        summary: `${transaction.name} - $${transaction.amount}`,
        description: `Category: ${transaction.category}`,
        start: { date: transaction.date },
        end: { date: transaction.date },
      };
      
      try {
        const response = await gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });
        setAddedEvents(prev => [...prev, `Added: ${event.summary} on ${transaction.date}`]);
      } catch (error) {
        console.error('Failed to add event:', error);
        setAddedEvents(prev => [...prev, `Failed to add: ${event.summary} on ${transaction.date}`]);
      }
    }
    setStatus("Transaction events added");
  }, [transactions, isLoggedIn]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setStatus("Login successful");
      loadCalendarApi(tokenResponse.access_token);
    },
    onError: (error) => setError("Login Failed: " + JSON.stringify(error)),
    scope: 'https://www.googleapis.com/auth/calendar',
    flow: 'implicit',
  });

  useEffect(() => {
    setStatus("Loading Google API script");
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      setStatus("Google API script loaded");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h3>Status: {status}</h3>
      {error && <div style={{color: 'red'}}>Error: {error}</div>}
      {!isLoggedIn && <button onClick={() => login()}>Sign in with Google</button>}
      {isLoggedIn && (
        <>
          <button onClick={addTransactionEvents}>Add Transactions to Calendar</button>
          <div>
            <h4>Added Events:</h4>
            {addedEvents.length === 0 ? (
              <p>No events added yet</p>
            ) : (
              addedEvents.map((event, index) => (
                <div key={index}>{event}</div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleCalendar;