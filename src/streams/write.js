import fs from 'fs';

const write = async () => {
  const writableStream = fs.createWriteStream('./files/fileToWrite.txt');

  process.stdin.pipe(writableStream);

  await new Promise((resolve, reject) => {
    writableStream.on('finish', resolve);
    writableStream.on('error', reject);
  });

  console.log('Data has been written to fileToWrite.txt');
};

await write();