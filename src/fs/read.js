import fs from 'fs';
import path from 'path';

const read = async (folder, fileName) => {
    try {
        const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), folder, fileName);
        const text = await fs.promises.readFile(filePath, 'utf-8');
        console.log(text)
    } catch (error) {
        throw new Error('FS operation failed')
    }
};

await read('files', 'fileToRead.txt')
    .then(() => {
        console.log('Prints content successfully');
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });