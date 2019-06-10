const fs = require('fs').promises;
const path = require('path');

const srcFilePath = path.join(__dirname, '..', 'data.json');
const destDir = path.join(__dirname, 'dest');

const run = async () => {
  try {
    await fs.access(destDir);
  } catch (err) {
    await fs.mkdir(destDir);
  }
  const text = await fs.readFile(srcFilePath, 'utf8');
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('Format error: expected array');
  const promises = data.map((item) => {
    if (!item.id) throw new Error('Format error: expected item to contain "id"');
    const destFilePath = path.join(destDir, `${item.id}.json`);
    const string = JSON.stringify(item, null, 2);
    return fs.writeFile(destFilePath, string);
  });
  try {
    await Promise.all(promises);
    console.log('done!');
  } catch (err) {
    console.log(err.message);
  }
};

run();
