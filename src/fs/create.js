import fs from 'fs';
import path from 'path'

const create = async (folder, fileName, content) => {
    const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), folder, fileName);

    try {
        await fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
        throw new Error('FS operation failed')
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.promises.writeFile(filePath, content)
        } else {
            console.error(error)
        }
    }
};
await create('files', 'fresh.txt', 'I am fresh and young');