import fs from  'fs';
import zlib from  'zlib';

const decompress = async (inputFilePath, outputFilePath) => {

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gzipStream = zlib.createGunzip();

  try {
    readStream.pipe(gzipStream).pipe(writeStream);
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  } catch (error) {
    throw new Error('Error with compress');
  }

  fs.unlink(inputFilePath, (error) => {
    if (error) {
      throw new Error('Error deleting input file:', error);
    } else {
      console.log('Input file deleted successfully');
    }
  });

};

await decompress('./files/archive.gz', './files/fileToCompress.txt')
 .then(()=>{
    console.log('decompress is successfully');
 })
 .catch((err)=>{
    console.error(err);
 });
