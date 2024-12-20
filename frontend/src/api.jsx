import axios from 'axios';

const API_URL = 'https://event-betting-platform.onrender.com';

export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (event) => axios.post(`${API_URL}/events`, event);
export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
export const loginUser = (user) => axios.post(`${API_URL}/login`, user);
export const placeBet = (bets) => axios.post(`${API_URL}/bets`, bets);
export const fetchBets = () => axios.get(`${API_URL}/bets`);
export const fetchEventById = (id) => axios.get(`${API_URL}/events/${id}`);
export const fetchWalletBalance = (userId) => axios.get(`${API_URL}/wallet/${userId}`);
export const addBalance = (data) => axios.post(`${API_URL}/add-balance`, data);
export const fetchLeaderboard = () => axios.get(`${API_URL}/leaderboard`);
