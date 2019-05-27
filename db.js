const fs = require('fs');
const debug = require('debug')('app-db');

const {
  pickProps, omitProps, debounce, containsText
} = require('./util');

const db = (filename, allowedKeys, delay = 1000) => {
  const now0 = Date.now();

  const source = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const data = source.map(item => ({
    ...item,
    _created: now0,
    _modified: now0,
  }));

  const persist = debounce(() => {
    fs.writeFile(filename, JSON.stringify(data), (err) => {
      if (err) {
        return debug(`Could not persist data to file: ${filename}`);
      }
    });
  }, delay);

  return {

    create(object, callback) {
      const now = Date.now();
      const object1 = {
        ...object,
        id: Object.keys(data).length,
        _created: now,
        _modified: now,
      };
      data.unshift(object1);
      persist();
      return setTimeout(() => callback(null, object1), 1000);
    },

    find(query, callback) {
      const query1 = pickProps(allowedKeys, query);
      const filtered = data.filter(
        item => Object.keys(query).every(key => containsText(item[key], query1[key])),
      );
      return setTimeout(() => callback(null, filtered), 1000);
    },

    findById(id, callback) {
      const found = data.find(item => (String(item.id) === id));
      if (found == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      return setTimeout(() => callback(null, found), 1000);
    },

    update(object, callback) {
      const object1 = omitProps(['id', '_created', '_modified'], object);
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      const now = Date.now();
      const object2 = {
        ...data[index],
        ...object1,
        _modified: now,
      };
      data[index] = object2;
      persist();
      return setTimeout(() => callback(null, object2), 1000);
    },

    delete(object, callback) {
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      const object1 = data[index];
      data.splice(index, 1);
      persist();
      return setTimeout(() => callback(null, object1), 1000);
    },

  };
};

module.exports = {
  db,
};
