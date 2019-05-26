
const containsText = (value1, value2) =>
  value1 == null ? false : value1.includes(value2);

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
  containsText,
  pickProps,
};
