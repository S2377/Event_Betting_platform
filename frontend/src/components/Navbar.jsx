// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional, for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>LetsBet</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
