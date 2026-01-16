const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = 3000;

// ✅ CORS MUST COME FIRST
app.use(cors({
  origin: 'http://localhost:5173',
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
