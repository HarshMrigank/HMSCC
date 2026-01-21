const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

// 🔑 Linux compiler binary (Render)
const HMSCC_PATH = path.join(
  __dirname,
  '..',
  '..',
  'compiler',
  'build',
  'hmscc'
);

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
  const outputBinPath = path.join(TEMP_DIR, 'output');

  // Ensure temp dir exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }

  // Clean temp
  if (fs.existsSync(outputCPath)) fs.unlinkSync(outputCPath);
  if (fs.existsSync(outputBinPath)) fs.unlinkSync(outputBinPath);

  // Write input
  fs.writeFileSync(inputPath, code);

  // Run HMSCC (generates output.c)
  await runCommand(`"${HMSCC_PATH}" "${inputPath}"`, {
    cwd: TEMP_DIR
  });

  // Compile generated C (Linux)
  await runCommand(`gcc output.c -o output`, {
    cwd: TEMP_DIR
  });

  // Execute program
  const { stdout } = await runCommand(`./output`, {
    cwd: TEMP_DIR
  });

  const generatedC = fs.readFileSync(outputCPath, 'utf-8');

  res.json({
    success: true,
    stdout: result.output ?? '',
    stderr: result.errors ?? '',
    generatedC: result.generated_c ?? ''
  });
}

module.exports = { runCompiler };
