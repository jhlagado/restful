const path = require('path');

const { db } = require('../db');
const { getRoutes } = require('../routes');

const filename = path.join(__dirname, 'data.json');
const allowedKeys = [
  'id', '_created', '_modified', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];
const database = db(filename, allowedKeys, 1000, 2500);

module.exports = getRoutes(database, '/customers', '/customers/:id');
