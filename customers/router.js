const express = require('express');

const getRouter = (database) => {
  const router = express.Router();
  router.route('/customers')

    .post((req, res) => {
      database.create(req.body, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(customer);
      });
      return null;
    })

    .get((req, res) => {
      database.find(req.query, (err, customers) => {
        if (err) {
          return res.send(err);
        }
        return res.json(customers);
      });
    });

  router.route('/customers/:id')

    .get((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        return res.json(customer);
      });
    })

    .put((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        const { id, ...body } = req.body;
        const object = {
          ...customer,
          ...body,
        };
        database.update(object, (err, customer) => {
          if (err) {
            return res.send(err);
          }
          return res.json(customer);
        });
      });
    })
    .delete((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, customer) => {
        if (err) {
          return res.send(err);
        }
        database.delete(customer, (err) => {
          if (err) {
            return res.send(err);
          }
          return res.send('Item deleted');
        });
      });
    });

  return router;
};

module.exports = getRouter;
