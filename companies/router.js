const express = require('express');

const getRouter = (database) => {
  const router = express.Router();
  router.route('/companies')

    .post((req, res) => {
      database.create(req.body, (err, company) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(company);
      });
      return null;
    })

    .get((req, res) => {
      database.find(req.query, (err, companies) => {
        if (err) {
          return res.send(err);
        }
        return res.json(companies);
      });
    });

  router.route('/companies/:id')

    .get((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, company) => {
        if (err) {
          return res.send(err);
        }
        return res.json(company);
      });
    })

    .put((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, company) => {
        if (err) {
          return res.send(err);
        }
        const { id, ...body } = req.body;
        const object = {
          ...company,
          ...body,
        };
        database.update(object, (err, company) => {
          if (err) {
            return res.send(err);
          }
          return res.json(company);
        });
      });
    })
    .delete((req, res) => {
      const { id } = req.params;
      database.findById(id, (err, company) => {
        if (err) {
          return res.send(err);
        }
        database.delete(company, (err) => {
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
