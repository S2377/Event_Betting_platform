import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';  // Import the fetchEvents function
import './Home.css'; // Make sure to import the CSS file

const Home = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await fetchEvents();  // Use the fetchEvents function to get all events
                setEvents(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAllEvents();  // Fetch all events when the component mounts
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (events.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <h1>All The Events</h1>
            <div className="event-cards-container">
                {events.map((event) => (
                    <div className="event-card" key={event._id}>
                        <img
                            src={event.photo_link}
                            alt={event.title}
                            className="event-image"
                        />
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p className="event-odds">Odds: {event.odds}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
