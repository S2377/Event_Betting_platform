import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchEventById, placeBet, fetchWalletBalance, addBalance } from '../api';
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
  const [showAddBalanceForm, setShowAddBalanceForm] = useState(false);
  const [addAmount, setAddAmount] = useState('');
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

  const handleAddBalance = async () => {
    if (!addAmount || isNaN(addAmount) || Number(addAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const response = await addBalance({ userId, amount: Number(addAmount) });
      setWalletBalance(response.data.newWalletBalance);
      setAddAmount('');
      setShowAddBalanceForm(false);
    } catch (err) {
      console.error('Error adding balance:', err);
      alert('Could not add balance');
    }
  };

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!event) return <div className="loading-message">Loading...</div>;

  return (
    <div className="event-detail">
      <div className="wallet-info">
        <span>Wallet Balance: ₹{walletBalance}</span>
        <button 
          className="add-balance-btn" 
          onClick={() => setShowAddBalanceForm(true)}
        >
          Add Balance
        </button>
      </div>
      
      {/* Conditional Add Balance Form */}
      {showAddBalanceForm && (
        <div className="add-balance-form">
          <label>Amount to Add:</label>
          <input 
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
          />
          <button onClick={handleAddBalance}>Submit</button>
          <button onClick={() => setShowAddBalanceForm(false)}>Cancel</button>
        </div>
      )}

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
      </div>
    </div>
  );
};

export default EventDetail;
