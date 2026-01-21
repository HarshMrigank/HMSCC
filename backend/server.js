// server.js
const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 10000; // Render uses 10000

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (required by Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/compile', compileRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'HMSCC Backend',
    status: 'running',
    endpoints: {
      compile: 'POST /compile',
      health: 'GET /health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// Start server - IMPORTANT: Listen on all interfaces for Docker
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 HMSCC backend running on port ${PORT}`);
  console.log(`📁 Temp directory: ${require('path').join(__dirname, 'temp')}`);
  console.log(`🔧 HMSCC path: ${process.env.HMSCC_PATH || 'default'}`);
});