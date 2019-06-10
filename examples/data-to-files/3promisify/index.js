const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const accessAsync = promisify(fs.access);
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

const srcFilePath = path.join(__dirname, '..', 'data.json');
const destDir = path.join(__dirname, 'dest');

accessAsync(destDir)
  .catch(() => mkdirAsync(destDir))
  .then(() => readFileAsync(srcFilePath, 'utf-8'))
  .then((text) => {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('Format error: expected array');
    data.forEach((item) => {
      if (!item.id) throw new Error('Format error: expected item to contain "id"');
      const destFilePath = path.join(destDir, `${item.id}.json`);
      const string = JSON.stringify(item, null, 2);
      writeFileAsync(destFilePath, string)
        .then(() => {
          console.log('done!');
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
