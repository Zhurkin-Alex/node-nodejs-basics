import { Worker } from 'worker_threads';
import os from 'os';

const createWorker = (workerData) => {
  return new Promise((resolve) => {
    const worker = new Worker('./worker.js');
    worker.on('message', resolve);
    worker.postMessage(workerData);
  });
};

const performCalculations = async () => {
    const cpuCount = os.cpus().length;
    console.log('cpuCount-', cpuCount)
    const workers = [];
    const results = [];

  for (let i = 0; i < cpuCount; i++) {
    const workerData = 10 + i;
    const workerPromise = createWorker(workerData);
    workers.push(workerPromise);
  }

  const workerResults = await Promise.all(workers);

  for (const result of workerResults) {
    results.push(result);
  }

  console.log('Results:', results);
};

await performCalculations();
