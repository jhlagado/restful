const path = require('path');

const { db } = require('../db');
const { getRoutes: getRouter } = require('../routes');

const filename = path.join(__dirname, 'data.json');
const allowedKeys = [
  'company', 'email', 'domain', 'address',
  'city', 'country',
];
const database = db(filename, allowedKeys, 1000, 2500);

module.exports = getRouter(database, '/companies', '/companies/:id');
