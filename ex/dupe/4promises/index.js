const fs = require('fs').promises;
const path = require('path');

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

fs.access(dest)
  .catch(() => fs.mkdir(dest, { recursive: true }))
  .finally(() =>
    fs.readdir(source)
      .then(srcFiles => srcFiles.forEach(
        (filename) => {
          const srcFilePath = path.join(source, filename);
          const destFilePath = path.join(dest, filename);
          fs.readFile(srcFilePath, 'utf-8')
            .then(string => fs.writeFile(destFilePath, string + string))
            .then(() => console.log('done!'));
        }
      )));
