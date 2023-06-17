import fs from 'fs';
import path from 'path';

const copy = async () => {
  const pathOldFolder = 'files';
  const pathNewFolder = 'files_copy';

  const isOldFolderExists = await fs.promises.stat(pathOldFolder)
    .then(stats => stats.isDirectory())
    .catch(() => false);
  if (!isOldFolderExists) {
    throw new Error('FS operation failed');
  }

  const isNewFolderExists = await fs.promises.stat(pathNewFolder)
    .then(stats => stats.isDirectory())
    .catch(() => false);
  if (isNewFolderExists) {
    throw new Error('FS operation failed');
  }

  try {
    await fs.promises.mkdir(pathNewFolder);

    const files = await fs.promises.readdir(pathOldFolder);
    for (const file of files) {
        const oldFile = path.join(pathOldFolder, file);
        const newFile = path.join(pathNewFolder, file);
        await fs.promises.copyFile(oldFile, newFile);
    }
  } catch (error) {
    throw new Error('FS operation failed-2')
  }
};

await copy()
  .then(() => {
    console.log('Files copied successfully');
  })
  .catch((error) => {
    console.error('Error:', error.message);
  })