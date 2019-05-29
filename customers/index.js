const path = require('path');

const { db } = require('../db');

const filename = path.join(__dirname, 'data.json');
const allowedKeys = [
  'id', '_created', '_modified', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];
const database = db(filename, allowedKeys, 2500);

module.exports = require('./router')(database);
