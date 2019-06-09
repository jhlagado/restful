const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

fs.access(destDir)
  .catch(() => fs.mkdir(destDir))
  .finally(() => fs.readdir(sourceDir)
    .then(srcFiles => srcFiles.forEach((filename) => {
      const ext = path.extname(filename);
      if (ext !== '.txt') {
        throw new Error(`file ${filename} is not a valid file`);
      }
      const srcFilePath = path.join(sourceDir, filename);
      const destFilePath = path.join(destDir, filename);
      fs.readFile(srcFilePath, 'utf-8')
        .then(string => fs.writeFile(destFilePath, string + string))
        .then(() => console.log('done!'));
    })));
