const { spawn } = require('child_process');
const path = require('path');

const child = spawn('npm', ['start', '--', '-p', '3004'], {
  cwd: path.join(__dirname),
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

child.stdout.on('data', (data) => {
  console.log(`STDOUT: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`STDERR: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

console.log('Server started, waiting for output...');