const fs = require('fs');
const path = require('path');

const srcFilePath = path.join(__dirname, '..', 'data.json');
const destDir = path.join(__dirname, 'dest');

const go = (err) => {
  if (err) throw err;
  fs.readFile(srcFilePath, 'utf-8', (err, text) => {
    if (err) throw err;
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('Format error: expected array');
    data.forEach((item) => {
      if (!item.id) throw new Error('Format error: expected item to contain "id"');
      const destFilePath = path.join(destDir, `${item.id}.json`);
      try {
        const string = JSON.stringify(item, null, 2);
        fs.writeFile(destFilePath, string, (err) => {
          if (err) throw err;
          console.log('done!');
        });
      } catch (err) {
        console.log(err.message);
      }
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
