// services/compilerServices.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

// In Docker, the binary is at /app/hmscc
// In local development, it's at ../../compiler/build/hmscc
const HMSCC_PATH = fs.existsSync('/app/hmscc') 
  ? '/app/hmscc'  // Docker path
  : path.join(__dirname, '..', '..', 'compiler', 'build', 'hmscc');  // Local path

console.log('Using compiler at:', HMSCC_PATH);

function runCommand(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, { 
      timeout: 10000,  // Increased timeout for Render
      ...options 
    }, (error, stdout, stderr) => {
      if (error) {
        // Don't reject on non-zero exit codes, just return stderr
        return resolve({ 
          stdout: stdout || '', 
          stderr: stderr || error.message 
        });
      }
      resolve({ stdout, stderr });
    });
  });
}

async function runCompiler(code) {
  const inputPath = path.join(TEMP_DIR, 'input.hc');
  const outputCPath = path.join(TEMP_DIR, 'output.c');
  const outputBinPath = path.join(TEMP_DIR, 'output');

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

    // 1. Run HMSCC compiler
    const compileResult = await runCommand(`"${HMSCC_PATH}" "${inputPath}"`, {
      cwd: TEMP_DIR
    });

    // Check if C file was generated
    if (!fs.existsSync(outputCPath)) {
      return {
        output: '',
        errors: 'Compiler failed to generate C code: ' + (compileResult.stderr || 'No output.c created'),
        generated_c: ''
      };
    }

    // Read generated C code
    const generatedC = fs.readFileSync(outputCPath, 'utf-8');

    // 2. Compile C code with gcc
    const gccResult = await runCommand(`gcc "${outputCPath}" -o "${outputBinPath}" -lm`, {
      cwd: TEMP_DIR
    });

    // 3. Execute the binary if compilation succeeded
    let execOutput = '';
    if (fs.existsSync(outputBinPath)) {
      const execResult = await runCommand(`"${outputBinPath}"`, {
        cwd: TEMP_DIR
      });
      execOutput = execResult.stdout;
    }

    return {
      output: execOutput,
      errors: (compileResult.stderr || '') + (gccResult.stderr || ''),
      generated_c: generatedC
    };

  } catch (error) {
    console.error('Compiler service error:', error);
    return {
      output: '',
      errors: error.toString(),
      generated_c: ''
    };
  }
}

module.exports = { runCompiler };