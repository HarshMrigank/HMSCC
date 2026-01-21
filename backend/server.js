const express = require('express');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Allow CORS for frontend dev and production
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://hmscc-frontend.onrender.com', // adjust if frontend is deployed elsewhere
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Routes
app.use('/compile', compileRoute);

app.get('/', (req, res) => {
  res.json({ status: 'HMSCC backend running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
