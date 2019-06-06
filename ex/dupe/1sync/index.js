const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'source');
const dest = path.join(__dirname, 'dest');

try {
  fs.accessSync(dest);
} catch (err) {
  fs.mkdirSync(dest);
}

const srcFiles = fs.readdirSync(source);
srcFiles.forEach((filename) => {
  const srcFilePath = path.join(source, filename);
  const destFilePath = path.join(dest, filename);
  const string = fs.readFileSync(srcFilePath, 'utf-8');
  fs.writeFileSync(destFilePath, string + string);
  console.log('done!');
});
