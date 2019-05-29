const path = require('path');

const { db } = require('../db');

const filename = path.join(__dirname, 'data.json');
const allowedKeys = [
  'company', 'email', 'domain', 'address',
  'city', 'country',
];
const database = db(filename, allowedKeys, 2500);

module.exports = require('./router')(database);
