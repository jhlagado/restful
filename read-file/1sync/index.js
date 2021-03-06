const fs = require('fs');
const path = require('path');

const loadFile = (filename) => {
  const srcFilePath = path.join(__dirname, '..', filename);
  const text = fs.readFileSync(srcFilePath, 'utf-8');
  const object = JSON.parse(text);
  if (!object.id) {
    throw new Error('Format error: expected item to contain "id"');
  }
  return object;
};

const run = (filename) => {
  try {
    const object = loadFile(filename);
    const string = JSON.stringify(object, null, 2);
    console.log(`JSON data loaded: ${string}`);
  } catch (err) {
    console.log(err.message);
  }
};

run('0.json');
