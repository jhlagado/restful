// @ts-nocheck
const express = require('express');

const { pickProps } = require('./util');

const { db } = require('./db');
const Customer = db(require('./customer-data'));

const customerKeys = [
  'id', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];

const router = express.Router();
router.route('/customers')

  .post((req, res) => {
    console.log('BODY ===> ', req.body);
    Customer.create(req.body, (err, customer) => {
      res.json(customer);
    });
  })

  .get((req, res) => {
    const query = pickProps(customerKeys, req.query);
    Customer.find(query, (err, customers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(customers);
    });
  });

router.route('/customers/:customerId')
  .get((req, res) => {
    const { customerId } = req.params;
    Customer.findById(customerId, (err, customer) => {
      if (err) {
        return res.send(err);
      }
      return res.json(customer);
    });
  });

module.exports = {
  router,
};
