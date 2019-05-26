module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-confusing-arrow": 0,
    "implicit-arrow-linebreak": 0,
    "no-shadow": 0,
    "consistent-return": 0,
  },
};
