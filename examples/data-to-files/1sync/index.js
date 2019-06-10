const fs = require('fs');
const path = require('path');

const srcFilePath = path.join(__dirname, '..', 'data.json');
const destDir = path.join(__dirname, 'dest');
try {
  fs.accessSync(destDir);
} catch (err) {
  fs.mkdirSync(destDir);
}

const text = fs.readFileSync(srcFilePath, 'utf8');
const data = JSON.parse(text);
if (!Array.isArray(data)) throw new Error('Format error: expected array');
data.forEach((item) => {
  if (!item.id) throw new Error('Format error: expected item to contain "id"');
  const destFilePath = path.join(destDir, `${item.id}.json`);
  try {
    const string = JSON.stringify(item, null, 2);
    fs.writeFileSync(destFilePath, string);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
});
