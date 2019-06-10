const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

const go = (err) => {
  if (err) throw err;
  fs.readdir(sourceDir, (err, srcFiles) => {
    if (err) throw err;
    const data = [];
    srcFiles.forEach((filename) => {
      const srcFilePath = path.join(sourceDir, filename);
      fs.readFile(srcFilePath, 'utf-8', (err, text) => {
        if (err) throw err;
        const item = JSON.parse(text);
        data.push(item);
        if (data.length === srcFiles.length) {
          data.sort((item1, item2) => item1.id - item2.id);
          const string = JSON.stringify(data, null, 2);
          fs.writeFile(destFilePath, string, (err) => {
            if (err) throw err;
            console.log('done!');
          });
        }
      });
    });
  });
};

fs.access(destDir, (err) => {
  if (err) {
    fs.mkdir(destDir, go);
  } else {
    go();
  }
});
