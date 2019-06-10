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
  data.forEach(async (item) => {
    if (!item.id) throw new Error('Format error: expected item to contain "id"');
    const destFilePath = path.join(destDir, `${item.id}.json`);
    try {
      const string = JSON.stringify(item, null, 2);
      await fs.writeFile(destFilePath, string);
      console.log('done!');
    } catch (err) {
      console.log(err.message);
    }
  });
};

run();
