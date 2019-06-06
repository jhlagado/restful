const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

const go = (err) => {
  if (err) throw err;
  fs.readdir(source, (err, srcFiles) => {
    if (err) throw err;
    srcFiles.forEach((filename) => {
      const srcFilePath = path.join(source, filename);
      const destFilePath = path.join(dest, filename);
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

fs.access(dest, (err) => {
  if (err) {
    fs.mkdir(dest, go);
  } else {
    go();
  }
});
