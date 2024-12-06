
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' })); // Allow React app origin

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
MONGO_URI = "mongodb+srv://su22022:8qY1mmuRl1Vm8MTL@cluster0.wszee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Models
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

const Event = mongoose.model('Event', new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    more_description: { type: String },
    odds: { type: Number, required: true },
    photo_link : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}));

const Bet = mongoose.model('Bet', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
}));

// User Routes
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        console.log(user)
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.send(user);
        console.log("vallidation successful")
    } else {
        res.status(400).send({ error: 'Invalid credentials' });
    }
});

// Event Routes
app.post('/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});


// Fetch Event by ID
app.get('/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Event ID format' });
      }
  
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Bet Routes
app.post('/bets', async (req, res) => {
    try {
        const bet = new Bet(req.body);
        await bet.save();
        res.status(201).send(bet);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/bets', async (req, res) => {
    const bets = await Bet.find().populate('userId').populate('eventId');
    res.send(bets);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
