import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events'); // Replace with your backend endpoint
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Available Events</h2>
      <div>
        {events.length > 0 ? (
          events.map(event => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
