const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

const run = async () => {
  try {
    await fs.access(destDir);
  } catch (err) {
    await fs.mkdir(destDir);
  }
  const srcFiles = await fs.readdir(sourceDir);
  const promises = srcFiles.map(async (filename) => {
    const ext = path.extname(filename);
    if (ext !== '.txt') {
      throw new Error(`file ${filename} is not a valid file`);
    }
    const srcFilePath = path.join(sourceDir, filename);
    const destFilePath = path.join(destDir, filename);
    const string = await fs.readFile(srcFilePath, 'utf-8');
    return fs.writeFile(destFilePath, string + string);
  });
  try {
    await Promise.all(promises);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
