// server.js - FIXED
const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ FIX: Use a function for CORS instead of app.options('*')
app.use((req, res, next) => {
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    return res.status(200).end();
  }
  next();
});

// Regular CORS for other requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/compile', compileRoute);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
  res.json({ 
    service: 'HMSCC Compiler Backend',
    status: 'running',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Temp directory: ${require('path').join(__dirname, 'temp')}`);
});