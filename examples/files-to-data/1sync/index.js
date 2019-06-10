const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');
const destFilePath = path.join(destDir, 'data.json');

try {
  fs.accessSync(destDir);
} catch (err) {
  fs.mkdirSync(destDir);
}

const data = [];
try {
  const srcFiles = fs.readdirSync(sourceDir);
  srcFiles.forEach((filename) => {
    const srcFilePath = path.join(sourceDir, filename);
    const text = fs.readFileSync(srcFilePath, 'utf-8');
    const item = JSON.parse(text);
    data.push(item);
  });
  data.sort((item1, item2) => item1.id - item2.id);
  const string = JSON.stringify(data, null, 2);
  fs.writeFileSync(destFilePath, string);
  console.log('done!');
} catch (err) {
  console.log(err.message);
}
