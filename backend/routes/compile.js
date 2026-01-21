const express = require('express');
const { runCompiler } = require('../services/compilerService');
const router = express.Router();

// POST /compile
router.post('/', (req, res) => {
  const { code } = req.body;
  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code' });
  }
  runCompiler(code)
    .then(result => {
      res.json({
        stdout: result.output || result.stdout || '',
        stderr: result.errors || result.stderr || '',
        generatedC: result.generated_c || result.generatedC || ''
      });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
