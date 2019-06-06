const fs = require('fs').promises;
const path = require('path');

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

fs.access(dest)
  .catch(() => fs.mkdir(dest, { recursive: true }))
  .finally(() => {
    fs.readdir(source)
      .then(srcFiles => srcFiles.map((filename) => {
        const srcFilePath = path.join(source, filename);
        const destFilePath = path.join(dest, filename);
        return fs.readFile(srcFilePath, 'utf-8')
          .then(string => fs.writeFile(destFilePath, string + string));
      })).then(promises =>
        Promise.all(promises).then(() => console.log('done!')));
  });
