const fs = require('fs').promises;
const path = require('path');

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

const run = async () => {
  try {
    await fs.access(dest);
  } catch (err) {
    await fs.mkdir(dest);
  }
  const srcFiles = await fs.readdir(source);
  srcFiles.forEach(async (filename) => {
    const srcFilePath = path.join(source, filename);
    const destFilePath = path.join(dest, filename);
    const string = await fs.readFile(srcFilePath, 'utf-8');
    await fs.writeFile(destFilePath, string + string);
    console.log('done!');
  });
};

run();
