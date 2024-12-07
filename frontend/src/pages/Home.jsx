import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';  // Import the fetchEvents function
<<<<<<< HEAD
import './Home.css'; // Make sure to import the CSS file
=======
import './home.css'; // Make sure to import the CSS file
import EventCard from '../components/EventCard'
>>>>>>> b15b95b (modified events page)

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
        fetchAllEvents();
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
                    <EventCard key={event._id} event={event} /> // Use the EventCard component for each event
                ))}
            </div>
        </div>
    );
};

export default Home;
