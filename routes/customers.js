const express = require('express');
const path = require('path');

const { getDatabase } = require('../db');
const { getListRoutes, getItemRoutes } = require('../route-util');

const filename = path.join(__dirname, '../data/customers.json');
const allowedKeys = [
  'id', '_created', '_modified', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];

module.exports = getDatabase(filename, allowedKeys, 2500)
  .then((database) => {
    const router = express.Router();
    getListRoutes(router.route('/customers'), database);
    getItemRoutes(router.route('/customers/:id'), database);
    return router;
  });
