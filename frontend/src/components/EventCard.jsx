import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>Odds: {event.odds}</p>
    </div>
  );
};

export default EventCard;
