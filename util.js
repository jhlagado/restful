
const containsText = (value1, value2) =>
  value1 == null ? false : value1.includes(value2);

const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

const pickProps = (keys, object) => keys.reduce(
  (acc, key) => {
    if (key in object) {
      acc[key] = object[key];
    }
    return acc;
  },
  {},
);

const omitProps = (keys, object) => Object.keys(object).reduce(
  (acc, key) => {
    if (!(keys.includes(key))) {
      acc[key] = object[key];
    }
    return acc;
  },
  {},
);

module.exports = {
  containsText,
  debounce,
  omitProps,
  pickProps,
};
