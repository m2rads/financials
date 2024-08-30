import React from 'react';
import { format } from 'date-fns';

interface EventBlockProps {
  event: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    category: string;
  };
  top: number;
  height: number;
}

const EventBlock: React.FC<EventBlockProps> = ({ event, top, height }) => {
  return (
    <div
      className="absolute left-0 right-0 bg-blue-200 rounded p-1 overflow-hidden text-xs"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        minHeight: '25px',
        maxHeight: `${100 - top}%`, // Ensure it doesn't overflow the container
      }}
    >
      <div className="font-semibold">{event.title}</div>
      <div>{format(event.startDate, 'HH:mm')} - {format(event.endDate, 'HH:mm')}</div>
    </div>
  );
};

export default EventBlock;