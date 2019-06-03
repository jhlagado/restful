const express = require('express');
const path = require('path');

const { promisifyAPI } = require('../util');
const { getDatabase } = require('../db');
const { getListRoutes, getItemRoutes } = require('../route-util');

const filename = path.join(__dirname, 'data.json');
const allowedKeys = [
  'company', 'email', 'domain', 'address',
  'city', 'country',
];

module.exports = getDatabase(filename, allowedKeys, 2500)
  .then(database => promisifyAPI(database, 1000))
  .then((database) => {
    const router = express.Router();
    getListRoutes(router.route('/companies'), database);
    getItemRoutes(router.route('/companies/:id'), database);
    return router;
  });
