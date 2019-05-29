const fs = require('fs');
const debug = require('debug')('app-db');

const {
  pickProps, omitProps, debounce, containsText
} = require('./util');

/**
 * @param {String} filename
 * @param {any} allowedKeys
 */
const db = (filename, allowedKeys, delay = 1000) => {
  const now0 = Date.now();

  const source = JSON.parse(fs.readFileSync(filename, 'utf8'));
  /**
    * @param {any} item
    */
  const data = source.map((item, index) => ({
    id: index,
    _created: now0,
    _modified: now0,
    ...item,
  }));

  const persist = debounce(() => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return debug(`Could not persist data to file: ${filename}`);
      }
      debug('Persisting to file...');
    });
  }, delay);

  return {

    /**
     * @param {any} object
     * @param {(err: any, value: any) => void} callback
     */
    create(object, callback) {
      const object1 = omitProps(['id', '_created', '_modified'], object);
      const object2 = pickProps(allowedKeys, object1);
      const now = Date.now();
      const object3 = {
        ...object2,
        id: Object.keys(data).length,
        _created: now,
        _modified: now,
      };

      data.unshift(object3);
      persist();
      return setTimeout(() => callback(null, object3), 1000);
    },

    /**
     * @param {{}} query
     * @param {(err: any, value: any) => void} callback
     */
    find(query, callback) {
      const query1 = pickProps(allowedKeys, query);
      const filtered = data.filter(
        item => Object.keys(query).every(key => containsText(item[key], query1[key])),
      );
      return setTimeout(() => callback(null, filtered), 1000);
    },

    /**
     * @param {string} id
     * @param {{ (err: any, value: any): void; }} callback
     */
    findById(id, callback) {
      const found = data.find(item => (String(item.id) === id));
      if (found == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      return setTimeout(() => callback(null, found), 1000);
    },

    /**
     * @param {{ id: any; }} object
     * @param {{ (err: any, value: any): void; }} callback
     */
    update(object, callback) {
      const object1 = omitProps(['id', '_created', '_modified'], object);
      const object2 = pickProps(allowedKeys, object1);
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      const now = Date.now();
      const object3 = {
        ...data[index],
        ...object2,
        _modified: now,
      };
      data[index] = object3;
      persist();
      return setTimeout(() => callback(null, object3), 1000);
    },

    /**
     * @param {{ id: any; }} object
     * @param {{ (err: any, value: any): void; }} callback
     */
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
