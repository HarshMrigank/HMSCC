/**
 * HMSCC Backend Server
 * Orchestrates compilation workflow
 */

const express = require('express');
const cors = require('cors');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - allow frontend
app.use(cors({
  origin: [
    'http://localhost:5173',      // Local dev
    'http://localhost:5174',      // Alternative dev
    'https://hmscc.vercel.app',   // Production
    'http://localhost:3000',      // Testing
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/compile', compileRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'HMSCC Backend' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'running',
    service: 'HMSCC Compiler Backend',
    version: '1.0.0',
    endpoints: {
      compile: 'POST /compile',
      health: 'GET /health'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 HMSCC Backend running on port ${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}`);
  console.log(`✨ POST /compile - Compile HMSCC code`);
});
