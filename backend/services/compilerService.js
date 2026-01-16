const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');
const HMSCC_PATH = path.join(__dirname, '..', '..', 'build', 'hmscc.exe');

function runCommand(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout: 2000, ...options }, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      resolve({ stdout, stderr });
    });
  });
}

async function runCompiler(code) {
  const inputPath = path.join(TEMP_DIR, 'input.hc');
  const outputCPath = path.join(TEMP_DIR, 'output.c');
  const exePath = path.join(TEMP_DIR, 'a.exe');

  // Clean temp
  if (fs.existsSync(outputCPath)) fs.unlinkSync(outputCPath);
  if (fs.existsSync(exePath)) fs.unlinkSync(exePath);

  // Write input
  fs.writeFileSync(inputPath, code);

  // Run HMSCC
  await runCommand(`"${HMSCC_PATH}" "${inputPath}"`, {
    cwd: TEMP_DIR
  });

  // Compile generated C
  await runCommand(`gcc output.c -o a.exe`, {
    cwd: TEMP_DIR
  });

  // Execute program
  const { stdout } = await runCommand(`a.exe`, {
    cwd: TEMP_DIR
  });

  const generatedC = fs.readFileSync(outputCPath, 'utf-8');

  return {
    success: true,
    output: stdout,
    errors: '',
    generated_c: generatedC
  };
}

module.exports = { runCompiler };
