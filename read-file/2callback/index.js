const fs = require('fs');
const path = require('path');

const loadFile = (filename, callback) => {
  const srcFilePath = path.join(__dirname, '..', filename);
  fs.readFile(srcFilePath, 'utf-8', (err, text) => {
    if (err) return callback(err);
    const object = JSON.parse(text);
    if (!object.id) {
      throw new Error('Format error: expected item to contain "id"');
    }
    callback(null, object);
  });
};

const run = (filename) => {
  loadFile(filename, (err, object) => {
    if (err) {
      console.log(err.message);
    } else {
      const string = JSON.stringify(object, null, 2);
      console.log(`JSON data loaded: ${string}`);
    }
  });
};

run('0.json');
