const { pickProps, containsText } = require('./util');

const db = (source, allowedKeys) => {
  const now0 = Date.now();
  const data = source.map(item => ({
    ...item,
    _created: now0,
    _modified: now0,
  }));

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
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      const now = Date.now();
      const object1 = {
        ...data[index],
        ...object,
        _modified: now,
      };
      data[index] = object1;
      return setTimeout(() => callback(null, object1), 1000);
    },

    delete(object, callback) {
      const index = data.findIndex(item => (String(item.id) === String(object.id)));
      if (index == null) {
        return setTimeout(() => callback('Item not found', null), 1000);
      }
      const object1 = data[index];
      data.splice(index, 1);
      return setTimeout(() => callback(null, object1), 1000);
    },

  };
};

module.exports = {
  db,
};
