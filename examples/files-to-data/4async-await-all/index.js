const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const run = async () => {
  try {
    await fs.access(destDir);
  } catch (err) {
    await fs.mkdir(destDir);
  }
  const srcFiles = await fs.readdir(sourceDir);

  const promises = srcFiles.map(async (filename) => {
    const srcFilePath = path.join(sourceDir, filename);
    return fs.readFile(srcFilePath, 'utf-8')
      .then(text => JSON.parse(text));
  });

  try {
    const data = await Promise.all(promises);
    data.sort((item1, item2) => item1.id - item2.id);
    const string = JSON.stringify(data, null, 2);
    fs.writeFile(destFilePath, string);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
