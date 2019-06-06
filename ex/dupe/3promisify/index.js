const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const accessAsync = promisify(fs.access);
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

accessAsync(dest)
  .catch(() => mkdirAsync(dest, { recursive: true }))
  .finally(() =>
    readdirAsync(source)
      .then(srcFiles => srcFiles.forEach(
        (filename) => {
          const srcFilePath = path.join(source, filename);
          const destFilePath = path.join(dest, filename);
          readFileAsync(srcFilePath, 'utf-8')
            .then(string => writeFileAsync(destFilePath, string + string))
            .then(() => console.log('done!'));
        }
      )));
