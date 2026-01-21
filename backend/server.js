const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SINGLE CORS CONFIG — nothing else
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
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
