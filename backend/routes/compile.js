// routes/compile.js
const express = require('express');
const router = express.Router();
const { runCompiler } = require('../services/compilerService');

// Handle OPTIONS preflight for this specific route
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

// Main compile endpoint
router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'No code provided'
    });
  }

  try {
    console.log('Compiling code...');
    const result = await runCompiler(code);

    // ✅ Add CORS headers to response
    res.header('Access-Control-Allow-Origin', '*');
    
    res.json({
      success: true,
      stdout: result.output || '',
      stderr: result.errors || '',
      generatedC: result.generated_c || ''
    });

  } catch (err) {
    console.error('Compile error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Compilation failed'
    });
  }
});

module.exports = router;