import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
    <div>
      <h1>Betting Platform</h1>
      <nav>
        <a href="/">Events</a> | <a href="/register">Register</a> | <a href="/login">Login</a>
      </nav>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<EventsPage/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
