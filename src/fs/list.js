import fs from 'fs';
import path from 'path'

const list = async (folder) => {
    const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), folder);

    const isFolderExists = await fs.promises.stat(filePath)
        .then(stats => stats.isDirectory())
        .catch(() => false);
    if (!isFolderExists) {
        throw new Error('FS operation failed-0');
    }

    try {
        const files = await fs.promises.readdir(filePath);
        files.forEach((file) => console.log(file));
    } catch (error) {
        throw new Error('FS operation failed-1');
    }
};

await list('files')
    .then(() => {
        console.log('Files reeded successfully');
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });