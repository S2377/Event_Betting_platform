// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import './App.css';
import EventDetail from './pages/EventsPage'; // Ensure correct import
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<EventsPage />} />  {/* EventsPage for listing or bet details */}
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
