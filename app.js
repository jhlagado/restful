// @ts-nocheck
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const { db } = require('./db');

const customerKeys = [
  'id', '_created', '_modified', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];
const Customer = db(require('./customer-data'), customerKeys);

const router = require('./router')(Customer);

app.use('/api', router);

app.server = app.listen(port, () => {
  debug(`Running ${nodeEnv} server on port ${chalk.yellow(port)}`);
});

module.exports = app;
