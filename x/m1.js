setImmediate(() => console.log('m1', { p: module.parent }));
module.exports = { x: 1 };
