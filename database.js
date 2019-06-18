const debug = require('debug')('app-db');
const fs = require('fs').promises;

/**
 * Checks if string value1 contains the text of value2
 *
 * @param { string } value1
 * @param { string } value2
 * @returns { boolean }
 */
const containsText = (value1, value2) =>
  value1 == null ? false : value1.includes(value2);

/**
 * Creates a debounced function that delays 
 * invoking func until after wait milliseconds
 *
 * @param {(...args: any) => void} func
 * @param {number} wait
 */
const debounce = (func, wait) => {
  let timeout = null;
  /**
   * @param {any[]} args
   */
  return (...args) => {
    const next = () => func(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

/**
 * Creates an object composed of the picked object properties.
 *
 * @param { string[] } keys
 * @param {{}} object
 * @returns {{}}
 */
const pickProps = (keys, object) => keys.reduce(
  (acc, key) => {
    if (key in object) {
      acc[key] = object[key];
    }
    return acc;
  },
  {},
);

/**
 * Creates a simplistic database object which can be queried for database
 * 
 * @param {String} filename
 * @param {any} allowedKeys
 * @param {number} persistDelay
 */
const getDatabase = async (filename, allowedKeys, persistDelay) => {

  const text = await fs.readFile(filename, 'utf8');
  const data = JSON.parse(text);

  const persist = debounce(async () => {
    try {
      fs.writeFile(filename, JSON.stringify(data, null, 2));
      debug('Persisting to file...');
    } catch (e) {
      debug(`Could not persist data to file: ${filename}`);
    }
  }, persistDelay);

  return {

    /**
     * Creates an object in database
     *
     * @param {any} object
     */
    async create(object) {
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
      return object3;
    },

    /**
     * Finds object in database that match query
     *
     * @param {{}} query
     */
    async find(query) {
      const query1 = pickProps(allowedKeys, query);
      const filtered = data.filter(item =>
        Object.keys(query).every(key =>
          containsText(item[key], query1[key])));

      return filtered;
    },

    /**
     * Finds object in database that has id
     *
     * @param {string} id
     */
    async findById(id) {
      const found = data.find(item =>
        (String(item.id) === id));

      if (found == null) {
        throw new Error('Item not found');
      }
      return found;
    },

    /**
     * Updates properies in an object with a given id
     * 
     * @param {any} object
     */
    async update(object) {
      const { id, _created, _modified, ...object1 } = object;
      const object2 = pickProps(allowedKeys, object1);
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        throw new Error('Item not found');
      }
      const now = Date.now();
      const object3 = {
        ...data[index],
        ...object2,
        _modified: now,
      };
      data[index] = object3;
      persist();
      return object3;
    },

    /**
     * Deletes an object with a given id
     * 
     * @param {{ id: any; }} object
     */
    async delete(object) {
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        throw new Error('Item not found');
      }
      const object1 = data[index];
      data.splice(index, 1);
      persist();
      return object1;
    },
  };
};

module.exports = {
  getDatabase,
};
