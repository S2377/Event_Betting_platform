import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import './App.css'
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<EventsPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<EventsPage/>} />
        <Route path="/events/:id" element={<EventsPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
