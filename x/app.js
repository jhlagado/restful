// const { x } = require('./m1');
// setImmediate(() => console.log('apppppp', x, { c: __dirname }));

Promise.resolve('Hello')
  .then((value) => {
    console.log(value);
    throw ('Hello error');
  })
  .catch(() => Promise.resolve('Hello recovery!'))
  .then(value => console.log(value));
