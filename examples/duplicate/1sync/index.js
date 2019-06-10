const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'source');
const destDir = path.join(__dirname, 'dest');

try {
  fs.accessSync(destDir);
} catch (err) {
  fs.mkdirSync(destDir);
}

const srcFiles = fs.readdirSync(sourceDir);
srcFiles.forEach((filename) => {
  try {
    const ext = path.extname(filename);
    if (ext !== '.txt') {
      throw new Error(`file ${filename} is not a valid file`);
    }
    const srcFilePath = path.join(sourceDir, filename);
    const destFilePath = path.join(destDir, filename);
    const string = fs.readFileSync(srcFilePath, 'utf-8');
    fs.writeFileSync(destFilePath, string + string);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
});
