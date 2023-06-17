import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const child = spawn('node', ['files/script.js', ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    console.log(`Received from child process: ${data.toString()}`);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['argument1', 'argument2']);
