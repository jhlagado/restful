const fs = require('fs').promises;
const path = require('path');

const saveFile = async (filename, object) => {
  const destFilePath = path.join(__dirname, '..', filename);
  const text = JSON.stringify(object, null, 2);
  return fs.writeFile(destFilePath, text);
};

const run = async (filename, object) => {
  try {
    await saveFile(filename, object);
    console.log('file has been saved');
  } catch (err) {
    console.log(err.message);
  }
};

run('0.json', {
  id: 1,
  _created: 1558960265061,
  _modified: 1558960265061,
  first_name: 'Beaufort',
  last_name: 'Gloster',
  email: 'bgloster0@shinystat.com',
  gender: 'Male',
  ip_address: '200.237.250.103'
});
