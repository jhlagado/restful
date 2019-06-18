const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/customers')
  .then(customers => app.use('/api', customers));

app.get('/', (_req, res) => {
  res.redirect('/api/customers');
});

module.exports = app;
