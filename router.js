const express = require('express');

const getRouter = (Customer) => {
  const router = express.Router();
  router.route('/customers')

    .post((req, res) => {
      Customer.create(req.body, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(customer);
      });
      return null;
    })

    .get((req, res) => {
      Customer.find(req.query, (err, customers) => {
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
    })

    .put((req, res) => {
      const { customerId } = req.params;
      Customer.update(customerId, req.body, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        return res.json(customer);
      });
    })

    .delete((req, res) => {
      const { customerId } = req.params;
      Customer.delete(customerId, (err) => {
        if (err) {
          return res.send(err);
        }
        return res.send('Item deleted');
      });
    });

  return router;
};

module.exports = getRouter;
