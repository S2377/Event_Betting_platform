import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Betting Platform</h1>
        <Routes>
          <Route path="/" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
