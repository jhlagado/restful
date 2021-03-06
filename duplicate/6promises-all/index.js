const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

fs.access(destDir)
  .catch(() => fs.mkdir(destDir))
  .then(() => fs.readdir(sourceDir))
  .then(srcFiles => srcFiles.map((filename) => {
    const ext = path.extname(filename);
    if (ext !== '.txt') {
      throw new Error(`file ${filename} is not a valid file`);
    }
    const srcFilePath = path.join(sourceDir, filename);
    const destFilePath = path.join(destDir, filename);
    return fs.readFile(srcFilePath, 'utf-8')
      .then(string => fs.writeFile(destFilePath, string + string));
  }))
  .then(promises => Promise.all(promises))
  .then(() => console.log('done!'))
  .catch(err => console.log(err.message));
