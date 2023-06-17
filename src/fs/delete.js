import fs from 'fs';
import path from 'path';

const remove = async (folder, fileName) => {
    const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), folder, fileName);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      throw new Error('FS operation failed');
    }
  };
  
await remove('files', 'fileToRemove.txt')
    .then(() => {
        console.log('File remove successfully');
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });