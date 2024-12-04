import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (event) => axios.post(`${API_URL}/events`, event);
export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
export const loginUser = (user) => axios.post(`${API_URL}/login`, user);
export const placeBet = (bet) => axios.post(`${API_URL}/bets`, bet);
export const fetchBets = () => axios.get(`${API_URL}/bets`);