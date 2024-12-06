// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional, for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Betting Platform</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">EventDetails</Link></li>
        <li><Link to="/login">Leaderboard</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
