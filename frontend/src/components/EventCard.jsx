// EventCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './buttonComponent';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleBetClick = () => {
    // Navigate to the EventsPage and pass event data through state
    navigate('/events', { state: { event } });
  };

  return (
    <div className="event-card">
      <img src={event.photo_link} alt={event.title} className="event-image" />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p className="event-odds">Odds: {event.odds}</p>
      <Button name="Make Bet" onClick={handleBetClick} />
    </div>
  );
};

export default EventCard;
