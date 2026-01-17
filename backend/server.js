const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS (safe for now, tighten later)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/compile', compileRoute);

app.get('/', (req, res) => {
  res.send('HMSCC Backend Running');
});

app.listen(PORT, () => {
  console.log(`HMSCC backend listening on port ${PORT}`);
});
