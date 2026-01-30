/**
 * HMSCC Compiler Service
 * Handles compilation workflow: HMSCC -> C -> Binary -> Execution
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

// Compiler path - Docker or local
const HMSCC_PATH = fs.existsSync('/app/hmscc') 
  ? '/app/hmscc'  // Docker path
  : path.join(__dirname, '..', '..', 'compiler', 'build', 'hmscc');  // Local path

console.log('Using compiler at:', HMSCC_PATH);

/**
 * Execute a shell command
 * Returns { stdout, stderr, success }
 */
function runCommand(cmd, options = {}) {
  return new Promise((resolve) => {
    exec(cmd, { 
      timeout: 10000,
      ...options 
    }, (error, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: stderr || (error ? error.message : ''),
        success: !error
      });
    });
  });
}

/**
 * Format compiler errors to: line:col: error message
 * Handles various error formats
 */
function formatErrors(errorText) {
  if (!errorText) return '';
  
  const lines = errorText.split('\n').filter(line => line.trim());
  const formatted = lines.map(line => {
    // Already in correct format
    if (/^\d+:\d+:/.test(line)) {
      return line;
    }
    // Try to extract line:col from various formats
    const match = line.match(/(?:error|warning|note).*?(?:line|:)\s*(\d+).*?(?:col|:)\s*(\d+)[:\s]*(.+)/i);
    if (match) {
      return `${match[1]}:${match[2]}: ${match[3].trim()}`;
    }
    // Default: return as-is if we can't parse
    return line;
  });
  
  return formatted.join('\n');
}

/**
 * Main compilation workflow
 */
async function runCompiler(code) {
  const inputPath = path.join(TEMP_DIR, 'input.hc');
  const outputCPath = path.join(TEMP_DIR, 'output.c');
  const outputBinPath = process.platform === 'win32' 
    ? path.join(TEMP_DIR, 'output.exe')
    : path.join(TEMP_DIR, 'output');

  try {
    // Ensure temp dir exists
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    // Clean previous files
    [inputPath, outputCPath, outputBinPath].forEach(file => {
      if (fs.existsSync(file)) {
        try { fs.unlinkSync(file); } catch (e) {}
      }
    });

    // Write input code
    fs.writeFileSync(inputPath, code);

    // PHASE 1: Run HMSCC compiler
    const compileCmd = `"${HMSCC_PATH}" "${inputPath}" -o "${outputCPath}"`;
    const compileResult = await runCommand(compileCmd, { cwd: TEMP_DIR });

    // Check for HMSCC compilation errors
    if (compileResult.stderr) {
      return {
        success: false,
        output: '',
        errors: formatErrors(compileResult.stderr),
        generatedC: ''
      };
    }

    // Check if C file was generated
    if (!fs.existsSync(outputCPath)) {
      return {
        success: false,
        output: '',
        errors: '1:1: error Compiler failed to generate C code',
        generatedC: ''
      };
    }

    // Read generated C code
    const generatedC = fs.readFileSync(outputCPath, 'utf-8');

    // PHASE 2: Compile C code with GCC
    const gccCmd = process.platform === 'win32'
      ? `gcc "${outputCPath}" -o "${outputBinPath}" -lm`
      : `gcc "${outputCPath}" -o "${outputBinPath}" -lm`;
    
    const gccResult = await runCommand(gccCmd, { cwd: TEMP_DIR });

    // Check for GCC compilation errors
    if (gccResult.stderr) {
      return {
        success: false,
        output: '',
        errors: formatErrors(gccResult.stderr),
        generatedC: generatedC
      };
    }

    // PHASE 3: Execute the binary
    let execOutput = '';
    if (fs.existsSync(outputBinPath)) {
      const execCmd = process.platform === 'win32'
        ? `"${outputBinPath}"`
        : `"${outputBinPath}"`;
      
      const execResult = await runCommand(execCmd, { cwd: TEMP_DIR });
      execOutput = execResult.stdout;
    }

    return {
      success: true,
      output: execOutput,
      errors: '',
      generatedC: generatedC
    };

  } catch (error) {
    console.error('Compiler service error:', error);
    return {
      success: false,
      output: '',
      errors: `1:1: error ${error.message}`,
      generatedC: ''
    };
  }
}

module.exports = { runCompiler, formatErrors };