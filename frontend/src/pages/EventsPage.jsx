import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchEventById, placeBet, fetchWalletBalance } from '../api';
import Button from '../components/buttonComponent';
import './EventPage.css';

const EventDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [event, setEvent] = useState(state?.event || null);
  const [betAmount, setBetAmount] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const userId = '6753d089218165b97342d8af';

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

    const fetchBalance = async () => {
      try {
        const response = await fetchWalletBalance(userId);
        setWalletBalance(response.data.walletBalance);
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
      }
    };

    fetchBalance();
  }, [id, userId, event]);

  const handleBetSubmit = async (e) => {
    e.preventDefault();

    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      setError('Please enter a valid bet amount.');
      return;
    }

    if (Number(betAmount) > walletBalance) {
      setError('Insufficient balance in wallet.');
      return;
    }

    try {
      const bet = { eventId: id, amount: Number(betAmount), userId };
      const response = await placeBet(bet);

      if (response.status === 201) {
        setSuccess(true);
        setWalletBalance(response.data.newWalletBalance);
        setBetAmount('');
      } else {
        setError('Failed to place bet');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!event) return <div className="loading-message">Loading...</div>;

  return (
    <div className="event-detail">
      <div className="wallet-info">
        <span>Wallet Balance: ₹{walletBalance}</span>
      </div>
      <div className="banner" style={{ backgroundImage: `url(${event.photo_link})` }}>
        <h1 className="banner-title">{event.title}</h1>
      </div>
      <div className="event-info">
        <p className="event-description">{event.more_description}</p>
        <p className="event-odds"><strong>Odds:</strong> {event.odds}</p>
      </div>
      <div className="bet-section">
        <form onSubmit={handleBetSubmit} className="bet-form">
          <div className="bet-controls">
            <label htmlFor="betAmount" className="bet-label">Bet Amount (INR):</label>
            <input
              type="number"
              id="betAmount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              required
              className="bet-input"
            />
          </div>
          <Button name="Place Bet" onClick={handleBetSubmit} className="place-bet-button" />
        </form>
        {success && <div className="success-message">Your bet has been placed successfully!</div>}
      </div>
    </div>
  );
};

export default EventDetail;
