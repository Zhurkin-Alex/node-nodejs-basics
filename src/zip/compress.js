import fs from  'fs';
import zlib from  'zlib';

const compress = async (inputFilePath, outputFilePath) => {

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gzipStream = zlib.createGzip();

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
      console.error('Error deleting input file:', error);
    } else {
      console.log('Input file deleted successfully');
    }
  });

};

await compress('./files/fileToCompress.txt', './files/archive.gz')
 .then(()=>{
    console.log('compress is successfully');
 })
 .catch((err)=>{
    console.error(err);
 });
