const express = require('express');
const router = express.Router();
const { runCompiler } = require('../services/compilerService');

router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const result = await runCompiler(code);
    res.json({
      stdout: result.output,
      stderr: result.errors,
      generatedC: result.generated_c
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
