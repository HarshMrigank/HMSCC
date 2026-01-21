// routes/compile.js
const express = require('express');
const router = express.Router();
const { runCompiler } = require('../services/compilerService');

router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      errors: 'No code provided'
    });
  }

  try {
    const result = await runCompiler(code);

    res.json({
      success: true,
      stdout: result.output ?? '',
      stderr: result.errors ?? '',
      generatedC: result.generated_c ?? ''
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      errors: err.message
    });
  }
});

module.exports = router;