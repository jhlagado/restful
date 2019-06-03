const fs = require('fs');
const { promisify } = require('util');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const delayPromise = millis => value =>
  new Promise(resolve => setTimeout(() => resolve(value), millis));

const delayValue = (func, millis) =>
  (...args) => func(...args).then(delayPromise(millis));

/**
 * @param {{ [x: string]: any; }} api
 * @param {number} accessDelay
 */
const promisifyAPI = (api, accessDelay) =>
  Object.keys(api).reduce((acc, key) => {
    const f = promisify(api[key]);
    const s = delayValue(f, accessDelay);
    acc[key] = s;
    return acc;
  }, {});


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
 * @param { string[] } keys
 * @param {{}} object
 * @return {{}}
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

module.exports = {
  readFilePromise,
  writeFilePromise,
  promisifyAPI,
  containsText,
  debounce,
  pickProps,
};
