import fs from 'fs';
import path from 'path';

const rename = async () => {
    const folder = 'files';
    const wrongFileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';

    const srcWrongFile = path.join(path.dirname(new URL(import.meta.url).pathname), folder, wrongFileName);
    const srcNewFile = path.join(path.dirname(new URL(import.meta.url).pathname), folder, newFileName);

    const isFileOrFolderExist = (path) => {
        return fs.existsSync(path);
    }

    try {
        await fs.promises.access(srcWrongFile, fs.constants.F_OK);

        await fs.promises.access(srcNewFile, fs.constants.F_OK)
            .then(()=>{
                throw new Error('FS operation failed');
            })
            .catch((err)=>{
                if (err.code !== 'ENOENT') {
                  throw err;
                }
            });

        await fs.promises.rename(srcWrongFile, srcNewFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
          throw new Error('FS operation failed');
        }
      
        throw err;
    }
};

await rename()
    .then(()=>{
        console.log('file rename')
    })
    .catch((err)=> {
        console.log('Error:', err)
    });