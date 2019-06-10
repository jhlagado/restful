const fs = require('fs').promises;
const path = require('path');

const srcFilePath = path.join(__dirname, '..', 'data.json');
const destDir = path.join(__dirname, 'dest');

fs.access(destDir)
  .catch(() => fs.mkdir(destDir))
  .then(() => fs.readFile(srcFilePath, 'utf-8'))
  .then((text) => {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('Format error: expected array');
    data.forEach((item) => {
      if (!item.id) throw new Error('Format error: expected item to contain "id"');
      const destFilePath = path.join(destDir, `${item.id}.json`);
      const string = JSON.stringify(item, null, 2);
      fs.writeFile(destFilePath, string)
        .then(() => {
          console.log('done!');
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
