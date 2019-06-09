const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

const go = (err) => {
  if (err) throw err;
  fs.readdir(sourceDir, (err, srcFiles) => {
    if (err) throw err;
    srcFiles.forEach((filename) => {
      const ext = path.extname(filename);
      if (ext !== '.txt') {
        throw new Error(`file ${filename} is not a valid file`);
      }
      const srcFilePath = path.join(sourceDir, filename);
      const destFilePath = path.join(destDir, filename);
      fs.readFile(srcFilePath, 'utf-8', (err, string) => {
        if (err) throw err;
        fs.writeFile(destFilePath, string + string, (err) => {
          if (err) throw err;
          console.log('done!');
        });
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
