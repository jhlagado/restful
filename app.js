// @ts-nocheck
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const customers = require('./customers');
const companies = require('./companies');

const path = require("path");

const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', customers);
app.use('/api', companies);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.get('/', (_req, res) => {
  res.redirect('/api/customers');
});

app.server = app.listen(port, () => {
  debug(`Running ${nodeEnv} server at port ${chalk.yellow(port)}`);
});

module.exports = app;
