import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ButtonComponent';

const EventsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulate fetching event data (you can fetch from an API here)
    const eventData = {
      1: { name: 'Cricket Match', image: 'https://example.com/cricket.jpg', description: 'An exciting cricket match.' },
      2: { name: 'Football Match', image: 'https://example.com/football.jpg', description: 'A thrilling football match.' },
    };

    setEvent(eventData[id]);
  }, [id]);

  const handleBetClick = () => {
    // Handle the bet placement logic here
    console.log(`Placing bet on ${event.name}`);
  };

  return event ? (
    <div className="event-details">
      <img src={event.image} alt={event.name} className="event-image" />
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <Button name="Place Your Bet" onClick={handleBetClick} /> {/* Use the custom Button component */}
    </div>
  ) : (
    <p>Loading event details...</p>
  );
};

export default EventsPage;
