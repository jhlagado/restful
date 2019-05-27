// @ts-nocheck
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

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
const filename = path.join(__dirname, 'customer-data.json');
const Customer = db(filename, customerKeys, 2500);

const router = require('./router')(Customer);

app.use('/api', router);

app.get('/', (_req, res) => {
  res.redirect('/api/customers');
});

app.server = app.listen(port, () => {
  debug(`Running ${nodeEnv} server at port ${chalk.yellow(port)}`);
});

module.exports = app;
