const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const accessAsync = promisify(fs.access);
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

accessAsync(destDir)
  .catch(() => mkdirAsync(destDir))
  .finally(() => readdirAsync(sourceDir)
    .then(srcFiles => srcFiles.forEach((filename) => {
      const ext = path.extname(filename);
      if (ext !== '.txt') {
        throw new Error(`file ${filename} is not a valid file`);
      }
      const srcFilePath = path.join(sourceDir, filename);
      const destFilePath = path.join(destDir, filename);
      readFileAsync(srcFilePath, 'utf-8')
        .then(string => writeFileAsync(destFilePath, string + string))
        .then(() => console.log('done!'));
    })));
