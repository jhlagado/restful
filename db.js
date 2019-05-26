const { containsText } = require('./util');

const db = (source) => {
  const data = [...source];

  return {

    // create(object, callback) {
    //   const item = {
    //     ...object,
    //     id: Object.keys(data).length,
    //     _created: Date.now(),
    //   };
    //   data.unshift(data);
    //   callback(null, item);
    // },

    find(query, callback) {
      const filtered = data.filter(
        item => Object.keys(query).every(key => containsText(item[key], query[key])),
      );
      return setTimeout(() => callback(null, filtered), 1000);
    },

    findById(id, callback) {
      const found = data.find(item => (String(item.id) === id));
      if (found == null) {
        callback('Item not found', null);
      } else {
        callback(null, found);
      }
    },
  };
};

module.exports = {
  db,
};
