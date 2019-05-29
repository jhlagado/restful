const debug = require('debug')('app-db');
const fs = require('fs');
const { promisify } = require('util');

const {
  pickProps, debounce, containsText
} = require('./util');

const writeFileAsync = promisify(fs.writeFile);

/**
 * @param { any[] } data
 * @param {string[]} allowedKeys
 * @param { () => void } persist
 */
const getFuncs = (data, allowedKeys, persist) => ({

  /**
   * @param {any} object
   * @param {(err: any, value: any) => void} callback
   */
  create(object, callback) {
    const { id, _created, _modified, ...object1 } = object;
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
    return callback(null, object3);
  },

  /**
   * @param {{}} query
   * @param {(err: any, value: any) => void} callback
   */
  find(query, callback) {
    const query1 = pickProps(allowedKeys, query);
    const filtered = data.filter(item =>
      Object.keys(query).every(key => containsText(item[key], query1[key])));

    return callback(null, filtered);
  },

  /**
   * @param {string} id
   * @param {{ (err: any, value: any): void; }} callback
   */
  findById(id, callback) {
    const found = data.find(item =>
      (String(item.id) === id));

    if (found == null) {
      return callback(new Error('Item not found'), null);
    }
    return callback(null, found);
  },

  /**
   * @param {any} object
   * @param {{ (err: any, value: any): void; }} callback
   */
  update(object, callback) {
    const { id, _created, _modified, ...object1 } = object;
    const object2 = pickProps(allowedKeys, object1);
    const index = data.findIndex(item => (String(item.id) === String(object.id)));
    if (index == null) {
      return callback(new Error('Item not found'), null);
    }
    const now = Date.now();
    const object3 = {
      ...data[index],
      ...object2,
      _modified: now,
    };
    data[index] = object3;
    persist();
    return callback(null, object3);
  },

  /**
   * @param {{ id: any; }} object
   * @param {{ (err: any, value: any): void; }} callback
   */
  delete(object, callback) {
    const index = data.findIndex(item => (String(item.id) === String(object.id)));
    if (index == null) {
      return callback(new Error('Item not found'), null);
    }
    const object1 = data[index];
    data.splice(index, 1);
    persist();
    return callback(null, object1);
  },
});

/**
 * @param {String} filename
 * @param {any} allowedKeys
 */
const getDatabase = (filename, allowedKeys, accessDelay = 1000, persistDelay = 1000) => {

  const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

  const persist = debounce(() => {
    writeFileAsync(filename, JSON.stringify(data, null, 2))
      .catch(() => debug(`Could not persist data to file: ${filename}`))
      .then(() => debug('Persisting to file...'));
  }, persistDelay);

  const funcs = getFuncs(data, allowedKeys, persist);

  const delayPromise = millis => value =>
    new Promise(resolve => setTimeout(() => resolve(value), millis));

  const delay = (func, millis) =>
    (...args) => func(...args).then(delayPromise(millis));

  return Object.keys(funcs).reduce((acc, key) => {
    const f = promisify(funcs[key]);
    const s = delay(f, accessDelay);
    acc[key] = s;
    return acc;
  }, {});
};

module.exports = {
  db: getDatabase,
};
