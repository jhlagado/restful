const fs = require('fs');
const path = require('path');

const saveFile = (filename, object, callback) => {
  const destFilePath = path.join(__dirname, '..', filename);
  const text = JSON.stringify(object, null, 2);
  fs.writeFile(destFilePath, text, callback);
};

const run = (filename, object) => {
  saveFile(filename, object, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('file has been saved');
    }
  });
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
