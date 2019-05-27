
/**
 * @param { string } value1
 * @param { string } value2
 */
const containsText = (value1, value2) =>
  value1 == null ? false : value1.includes(value2);

/**
 * @param {(...args: any) => void} callback
 * @param {number} wait
 */
const debounce = (callback, wait) => {
  let timeout = null;
  /**
   * @param {any[]} args
   */
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

/**
 * @param {{ reduce: (arg0: (acc: any, key: any) => any, arg1: {}) => void; }} keys
 * @param {{}} object
 */
const pickProps = (keys, object) => keys.reduce(
  /**
   * @param {{ [x: string]: any; }} acc
   * @param {string} key
   */
  (acc, key) => {
    if (key in object) {
      acc[key] = object[key];
    }
    return acc;
  },
  {},
);

/**
 * @param { string[] } keys
 * @param {{ [x: string]: any; }} object
 */
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
