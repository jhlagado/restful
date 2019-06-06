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
  const promises = srcFiles.map((filename) => {
    const srcFilePath = path.join(source, filename);
    const destFilePath = path.join(dest, filename);
    return fs.readFile(srcFilePath, 'utf-8')
      .then(string => fs.writeFile(destFilePath, string + string));
  });
  await Promise.all(promises);
  console.log('done!');
};

run();
