const debug = require('debug')('app-db');
const {
  readFilePromise, writeFilePromise,
  pickProps, debounce, containsText
} = require('./util');

/**
 * @param {String} filename
 * @param {any} allowedKeys
 * @param {number} persistDelay
 */
const getDatabase = (filename, allowedKeys, persistDelay) =>

  readFilePromise(filename, 'utf8')
    .then(text => JSON.parse(text))
    .then((data) => {

      const persist = debounce(() => {
        writeFilePromise(filename, JSON.stringify(data, null, 2))
          .catch(() => debug(`Could not persist data to file: ${filename}`))
          .then(() => debug('Persisting to file...'));
      }, persistDelay);

      return {

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
            Object.keys(query).every(key =>
              containsText(item[key], query1[key])));

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
      };
    });

module.exports = {
  getDatabase,
};
