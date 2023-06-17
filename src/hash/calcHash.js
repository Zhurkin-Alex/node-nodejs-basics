import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
  const filePath = './files/fileToCalculateHashFor.txt';

  try {
    const fileData = await fs.promises.readFile(filePath);

    const hash = crypto.createHash('sha256');

    hash.update(fileData);

    const generatedHash = hash.digest('hex');

    console.log('Generated hash:', generatedHash);
  } catch (error) {
    console.error('Error', error);
  }
};

await calculateHash();
