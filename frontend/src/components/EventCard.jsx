import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './buttonComponent';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleBetClick = () => {
    // Redirect to the events page with the event details
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} className="event-image" />
      <h3>{event.name}</h3>
      <Button name="Make Bet" onClick={handleBetClick} />
    </div>
  );
};

export default EventCard;
