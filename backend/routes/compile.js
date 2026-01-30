/**
 * Compile Route
 * POST /compile - Compiles HMSCC code
 */

const express = require('express');
const { runCompiler } = require('../services/compilerService');
const router = express.Router();

/**
 * POST /compile
 * 
 * Request body:
 * {
 *   code: "power arena() { speak('Hello'); sendback 0; }"
 * }
 * 
 * Response:
 * {
 *   success: true|false,
 *   output: "Hello",
 *   errors: "5:10: error Undefined variable 'x'",
 *   generatedC: "int main() { printf('Hello'); return 0; }"
 * }
 */
router.post('/', async (req, res) => {
  try {
    const { code } = req.body;

    // Validate input
    if (typeof code !== 'string' || code.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Missing or empty code',
        output: '',
        errors: '',
        generatedC: ''
      });
    }

    // Run compiler
    const result = await runCompiler(code);

    // Return result in expected format
    res.json({
      success: result.success,
      output: result.output || '',
      errors: result.errors || '',
      generatedC: result.generatedC || ''
    });

  } catch (err) {
    console.error('Route error:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      output: '',
      errors: `1:1: error ${err.message}`,
      generatedC: ''
    });
  }
});

module.exports = router;
