import fs from 'fs';

const read = async () => {
  const filePath = './files/fileToRead.txt';

  try {
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
  } catch (error) {
    console.error('Error opening file:', error);
  }
};

await read();
