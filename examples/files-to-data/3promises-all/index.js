const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

fs.access(destDir)
  .catch(() => fs.mkdir(destDir))
  .then(() => fs.readdir(sourceDir))
  .then(srcFiles => srcFiles.map((filename) => {
    const srcFilePath = path.join(sourceDir, filename);
    return fs.readFile(srcFilePath, 'utf-8')
      .then(text => JSON.parse(text));
  }))
  .then(promises => Promise.all(promises))
  .then((data) => {
    data.sort((item1, item2) => item1.id - item2.id);
    const string = JSON.stringify(data, null, 2);
    return fs.writeFile(destFilePath, string);
  })
  .then(() => console.log('done!'))
  .catch(err => console.log(err.message));