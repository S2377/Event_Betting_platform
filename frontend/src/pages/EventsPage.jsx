import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchEventById, placeBet } from '../api';
import Button from '../components/buttonComponent';
import './EventPage.css';
const EventDetail = () => {
  const { state } = useLocation(); // Access the state passed from EventCard
  const { id } = useParams();
  const [event, setEvent] = useState(state?.event || null); // Use event from state if available
  const [betAmount, setBetAmount] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!event) {
      const fetchEvent = async () => {
        try {
          const response = await fetchEventById(id);
          setEvent(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchEvent();
    }
  }, [id, event]);

  const handleBetSubmit = async (e) => {
    e.preventDefault();
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      setError('Please enter a valid bet amount.');
      return;
    }
    try {
      const bet = {
        eventId: id,
        amount: betAmount,
      };
      await placeBet(bet);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <img src={event.photo_link} alt={event.title} className="event-image" />
      <p>{event.more_description}</p>
      <p className="event-odds">Odds: {event.odds}</p>

      <form onSubmit={handleBetSubmit}>
        <label htmlFor="betAmount">Bet Amount (in INR):</label>
        <input
          type="number"
          id="betAmount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          required
        />
        {/* Use the custom Button component here */}
        <Button name="Place Bet" onClick={handleBetSubmit} />
      </form>

      {success && <div>Your bet has been placed successfully!</div>}
    </div>
  );
};

export default EventDetail;
  